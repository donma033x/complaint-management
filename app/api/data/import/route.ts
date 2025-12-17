import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { importData } from "@/lib/file-storage"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const result = await importData(data)

    return NextResponse.json({
      success: true,
      message: `成功导入 ${result.categoriesCount} 个分类和 ${result.complaintsCount} 条投诉词`,
      ...result,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to import data",
      },
      { status: 500 },
    )
  }
}
