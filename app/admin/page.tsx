import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth"
import { AdminHeader } from "@/components/admin-header"
import { AdminCategoryList } from "@/components/admin-category-list"
import { getCategories } from "@/lib/file-storage"

export default async function AdminPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <AdminCategoryList categories={categories} />
      </main>
    </div>
  )
}
