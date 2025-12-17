"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

interface Complaint {
  id: string
  content: string
  categoryId: string
  usageCount: number
}

interface ComplaintListProps {
  categoryId: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ComplaintList({ categoryId }: ComplaintListProps) {
  const { data, error, isLoading } = useSWR(`/api/complaints?categoryId=${categoryId}`, fetcher)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (complaint: Complaint) => {
    try {
      await navigator.clipboard.writeText(complaint.content)
      setCopiedId(complaint.id)

      // Track usage
      await fetch("/api/complaints/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId: complaint.id }),
      })

      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error || !data?.complaints) {
    return <div className="text-center py-12 text-slate-500">加载失败，请重试</div>
  }

  const complaints = data.complaints as Complaint[]

  if (complaints.length === 0) {
    return <div className="text-center py-12 text-slate-500">该类别暂无投诉词</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        投诉词内容
      </h3>

      <div className="space-y-2 sm:space-y-3">
        {complaints.map((complaint, index) => (
          <div
            key={complaint.id}
            className={`bg-white border-2 rounded-lg p-3 sm:p-5 transition-all cursor-pointer hover:shadow-md active:scale-[0.98] ${
              copiedId === complaint.id ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-blue-300"
            }`}
            onClick={() => handleCopy(complaint)}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  投诉词 {index + 1}
                </span>
                {complaint.usageCount > 0 && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    {complaint.usageCount}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-shrink-0 text-xs sm:text-sm ${copiedId === complaint.id ? "text-green-600" : "text-slate-400"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(complaint)
                }}
              >
                {copiedId === complaint.id ? (
                  <>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">已复制</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="hidden sm:inline">复制</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{complaint.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
