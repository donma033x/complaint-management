import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { getComplaintsByCategory, createComplaint } from "@/lib/file-storage"

export async function GET(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get("categoryId")

  if (!categoryId) {
    return NextResponse.json({ error: "Category ID required" }, { status: 400 })
  }

  const complaints = await getComplaintsByCategory(categoryId)
  return NextResponse.json({ complaints })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { categoryId, content } = await request.json()
    const complaint = await createComplaint(categoryId, content)
    return NextResponse.json({ complaint })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 })
  }
}
