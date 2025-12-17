"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AddCategoryDialog } from "./add-category-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"
import { AddComplaintDialog } from "./add-complaint-dialog"
import { EditComplaintDialog } from "./edit-complaint-dialog"
import useSWR, { mutate } from "swr"

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface AdminCategoryListProps {
  categories: Category[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminCategoryList({ categories: initialCategories }: AdminCategoryListProps) {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [addingComplaintTo, setAddingComplaintTo] = useState<string | null>(null)
  const [editingComplaint, setEditingComplaint] = useState<{
    categoryId: string
    complaintId: string
    content: string
  } | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [newlyAddedCategoryId, setNewlyAddedCategoryId] = useState<string | null>(null)

  const { data: categoriesData } = useSWR("/api/categories", fetcher)
  const categories = categoriesData?.categories || initialCategories

  const { data: complaintsData } = useSWR(
    expandedCategory ? `/api/complaints?categoryId=${expandedCategory}` : null,
    fetcher,
  )

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`确定要删除类别"${categoryName}"及其所有投诉词吗？此操作不可恢复！`)) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate("/api/categories")
      }
    } catch (err) {
      console.error("Failed to delete category:", err)
    }
  }

  const handleDeleteComplaint = async (complaintId: string) => {
    if (!confirm("确定要删除这条投诉词吗？")) {
      return
    }

    try {
      const response = await fetch(`/api/complaints/${complaintId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate(`/api/complaints?categoryId=${expandedCategory}`)
        mutate("/api/categories")
      }
    } catch (err) {
      console.error("Failed to delete complaint:", err)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/data/export")
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `complaints-export-${Date.now()}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("导出失败，请重试")
      }
    } catch (err) {
      console.error("Export failed:", err)
      alert("导出失败，请重试")
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      const text = await file.text()
      const data = JSON.parse(text)

      const response = await fetch("/api/data/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.message || "导入成功")
        // Refresh all data
        mutate("/api/categories")
        window.location.reload()
      } else {
        alert(result.error || "导入失败，请检查文件格式")
      }
    } catch (err) {
      console.error("Import failed:", err)
      alert("导入失败，请检查文件格式")
    } finally {
      setIsImporting(false)
      // Reset file input
      event.target.value = ""
    }
  }

  const handleCategoryAdded = (categoryId: string) => {
    setNewlyAddedCategoryId(categoryId)
  }

  useEffect(() => {
    if (newlyAddedCategoryId) {
      // Wait for the DOM to update with the new category
      setTimeout(() => {
        const element = document.getElementById(`category-${newlyAddedCategoryId}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          // Clear the newly added category ID after scrolling
          setNewlyAddedCategoryId(null)
        }
      }, 300)
    }
  }, [newlyAddedCategoryId, categories])

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">类别管理</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleExport} disabled={isExporting} className="text-sm bg-transparent">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {isExporting ? "导出中..." : "导出数据"}
          </Button>

          <Button
            variant="outline"
            onClick={() => document.getElementById("import-file")?.click()}
            disabled={isImporting}
            className="text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0L8 8m4-4v12"
              />
            </svg>
            {isImporting ? "导入中..." : "导入数据"}
          </Button>
          <input id="import-file" type="file" accept=".json" onChange={handleImport} className="hidden" />

          <Button onClick={() => setShowAddCategory(true)} className="text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            添加新类别
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            id={`category-${category.id}`}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">{category.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg truncate">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} 条投诉词</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setExpandedCategory(expandedCategory === category.id ? null : category.id)
                    }}
                    className="w-full sm:w-auto justify-center"
                  >
                    {expandedCategory === category.id ? "收起" : "展开"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAddingComplaintTo(category.id)}
                    className="w-full sm:w-auto justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    添加投诉词
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCategory(category)}
                    className="w-full sm:w-auto justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    重命名
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    删除
                  </Button>
                </div>
              </div>
            </div>

            {expandedCategory === category.id && (
              <div className="border-t border-slate-200 bg-slate-50 p-6">
                {!complaintsData && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                  </div>
                )}

                {complaintsData && complaintsData.complaints && complaintsData.complaints.length === 0 && (
                  <p className="text-center text-slate-500 py-8">该类别暂无投诉词</p>
                )}

                {complaintsData && complaintsData.complaints && complaintsData.complaints.length > 0 && (
                  <div className="space-y-3">
                    {complaintsData.complaints.map((complaint: any, index: number) => (
                      <div key={complaint.id} className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                              投诉词 {index + 1}
                            </span>
                            {complaint.usageCount > 0 && (
                              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                  />
                                </svg>
                                已复制 {complaint.usageCount} 次
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditingComplaint({
                                  categoryId: category.id,
                                  complaintId: complaint.id,
                                  content: complaint.content,
                                })
                              }
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              编辑
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComplaint(complaint.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              删除
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{complaint.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddCategory && (
        <AddCategoryDialog
          open={showAddCategory}
          onClose={() => setShowAddCategory(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {addingComplaintTo && (
        <AddComplaintDialog
          categoryId={addingComplaintTo}
          open={!!addingComplaintTo}
          onClose={() => setAddingComplaintTo(null)}
        />
      )}

      {editingComplaint && (
        <EditComplaintDialog
          complaint={editingComplaint}
          open={!!editingComplaint}
          onClose={() => setEditingComplaint(null)}
        />
      )}
    </>
  )
}
