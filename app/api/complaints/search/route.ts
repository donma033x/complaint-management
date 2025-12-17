import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { searchComplaints } from "@/lib/file-storage"

export async function GET(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const results = await searchComplaints(query)
  return NextResponse.json({ results })
}
