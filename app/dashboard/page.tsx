import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { CategoryList } from "@/components/category-list"
import { ComplaintSearch } from "@/components/complaint-search"
import { getCategories } from "@/lib/file-storage"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-xs sm:text-sm text-blue-900 font-medium">使用提示</p>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">选择投诉类型，点击投诉词即可自动复制到剪贴板</p>
            </div>
          </div>
        </div>

        <ComplaintSearch />

        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            投诉类型
          </h2>
          <CategoryList categories={categories} />
        </div>
      </main>
    </div>
  )
}
