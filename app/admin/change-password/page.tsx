import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth"
import { AdminHeader } from "@/components/admin-header"
import { ChangePasswordForm } from "@/components/change-password-form"

export default async function ChangePasswordPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">修改密码</h2>
            <p className="text-sm text-slate-600">为了账户安全，请定期更换密码</p>
          </div>

          <ChangePasswordForm />
        </div>
      </main>
    </div>
  )
}
