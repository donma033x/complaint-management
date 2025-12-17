import { type NextRequest, NextResponse } from "next/server"
import { createSession, verifyPassword } from "@/lib/auth"
import { getAdminPasswordHash } from "@/lib/auth-utils"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { password, rememberMe } = await request.json()

    const passwordHash = await getAdminPasswordHash()

    const isValid = await verifyPassword(password, passwordHash)

    if (!isValid) {
      return NextResponse.json({ error: "密码错误，请重试" }, { status: 401 })
    }

    await createSession(rememberMe)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "登录失败，请重试" }, { status: 500 })
  }
}
