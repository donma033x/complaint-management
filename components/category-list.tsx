"use client"

import { useState, useRef, useEffect } from "react"
import { ComplaintList } from "./complaint-list"

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface CategoryListProps {
  categories: Category[]
}

const iconMap: Record<string, string> = {
  虚假新闻: "📰",
  侮辱诽谤: "👤",
  色情低俗: "⚠️",
  暴力血腥: "💀",
  违法犯罪: "⚖️",
  侵犯版权: "©️",
  未成年保护: "👶",
  煽动仇恨: "🔥",
  网络诈骗: "💰",
  危害国家安全: "🛡️",
}

export function CategoryList({ categories }: CategoryListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const complaintContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCategory && complaintContentRef.current) {
      setTimeout(() => {
        complaintContentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [selectedCategory])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-3 sm:p-6 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 text-left ${
              selectedCategory === category.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-slate-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl">{iconMap[category.name] || "📁"}</span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {category.count}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{category.name}</h3>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-6 sm:mt-8" ref={complaintContentRef}>
          <ComplaintList categoryId={selectedCategory} />
        </div>
      )}
    </>
  )
}
