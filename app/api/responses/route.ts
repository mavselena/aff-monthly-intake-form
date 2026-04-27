import { NextResponse } from 'next/server'
import { getAllResponses } from '../../../lib/db'
import { getSession } from '../../../lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await getAllResponses()
  return NextResponse.json(rows)
}
