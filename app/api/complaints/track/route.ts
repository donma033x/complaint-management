import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { trackComplaintUsage } from "@/lib/file-storage"

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { complaintId } = await request.json()
    await trackComplaintUsage(complaintId)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to track usage" }, { status: 500 })
  }
}
