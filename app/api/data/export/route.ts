import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import { exportData } from "@/lib/file-storage"

export const runtime = "nodejs"

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await exportData()

    // Return as downloadable JSON file
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="complaints-export-${Date.now()}.json"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
