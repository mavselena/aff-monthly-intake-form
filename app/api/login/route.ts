import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '../../../lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const result = await signIn(username, password)
  if (!result) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const res = NextResponse.json({ success: true, user: result.user })
  res.cookies.set('aff-session', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })
  return res
}
