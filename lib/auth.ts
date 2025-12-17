import { cookies } from "next/headers"
import { verifyPassword as verifyPasswordUtil, hashPassword as hashPasswordUtil } from "./auth-utils"

const SESSION_COOKIE = "session"
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function hashPassword(password: string): Promise<string> {
  console.log("[v0] Hashing password...")
  const hashed = await hashPasswordUtil(password)
  console.log("[v0] Password hashed successfully")
  return hashed
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  console.log("[v0] Verifying password...")
  console.log("[v0] Input password:", password)
  console.log("[v0] Hash prefix:", hashedPassword?.substring(0, 29))

  const result = await verifyPasswordUtil(password, hashedPassword)

  console.log("[v0] Comparison result:", result)
  return result
}

export async function createSession(rememberMe = true) {
  const sessionData = {
    authenticated: true,
    createdAt: Date.now(),
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: rememberMe ? SESSION_DURATION / 1000 : undefined,
    path: "/",
  })
}

export async function getServerSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired (7 days)
    if (Date.now() - session.createdAt > SESSION_DURATION) {
      await destroySession()
      return null
    }

    return session
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
