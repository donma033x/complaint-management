import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { getAdminPasswordHash, setAdminPasswordHash, verifyPassword, hashPassword } from "@/lib/auth-utils"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "请填写所有字段" }, { status: 400 })
    }

    const adminPasswordHash = await getAdminPasswordHash()

    // Verify current password
    const isValid = await verifyPassword(currentPassword, adminPasswordHash)

    if (!isValid) {
      return NextResponse.json({ error: "当前密码错误" }, { status: 400 })
    }

    // Hash and save new password
    const newHash = await hashPassword(newPassword)
    await setAdminPasswordHash(newHash)

    return NextResponse.json({ success: true, message: "密码修改成功" })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "服务器错误" }, { status: 500 })
  }
}
