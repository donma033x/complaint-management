"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ComplaintSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { data, error } = useSWR(
    query.length >= 2 ? `/api/complaints/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
  )

  const handleSearch = (value: string) => {
    setQuery(value)
    setIsSearching(value.length >= 2)
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          type="text"
          placeholder="搜索投诉词关键词..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {isSearching && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          {!data && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
            </div>
          )}

          {data && data.results && data.results.length === 0 && (
            <p className="text-center text-slate-500 py-8">未找到相关投诉词</p>
          )}

          {data && data.results && data.results.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 font-medium">找到 {data.results.length} 条结果</p>
              {data.results.map((result: any) => (
                <div
                  key={result.id}
                  className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                  onClick={() => handleCopy(result.content)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {result.categoryName}
                    </span>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{result.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
