import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { getCategories, createCategory } from "@/lib/file-storage"

export const runtime = "nodejs"

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const categories = await getCategories()
  return NextResponse.json({ categories })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, icon } = await request.json()
    const category = await createCategory(name, icon)
    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
