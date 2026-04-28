import { NextRequest, NextResponse } from 'next/server'
import { updateResponse } from '../../../lib/db'
import { getSession } from '../../../lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    if (!data.id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await updateResponse(data.id, data)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
