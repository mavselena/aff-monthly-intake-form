import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'aff-secret-change-this-in-vercel'
)

const USERS: Record<string, { password: string; name: string; role: string }> = {
  elena: {
    password: process.env.ELENA_PASSWORD || 'elena2026',
    name: 'Elena',
    role: 'admin'
  },
  zina: {
    password: process.env.ZINA_PASSWORD || 'zina2026',
    name: 'Zina',
    role: 'admin'
  }
}

export async function signIn(username: string, password: string) {
  const user = USERS[username.toLowerCase()]
  if (!user || user.password !== password) return null

  const token = await new SignJWT({ username, name: user.name, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return { token, user: { username, name: user.name, role: user.role } }
}

export async function getSession() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('aff-session')?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { username: string; name: string; role: string }
  } catch {
    return null
  }
}
