import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { updateComplaint, deleteComplaint } from "@/lib/file-storage"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const { content } = await request.json()
    const complaint = await updateComplaint(id, content)
    return NextResponse.json({ complaint })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteComplaint(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 })
  }
}
