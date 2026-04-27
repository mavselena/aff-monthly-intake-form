import { NextRequest, NextResponse } from 'next/server'
import { insertResponse } from '../../../lib/db'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!data.month) {
      return NextResponse.json({ error: 'Month is required' }, { status: 400 })
    }
    const result = await insertResponse(data)
    return NextResponse.json({ success: true, id: result.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
  }
}
