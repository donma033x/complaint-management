import { LoginForm } from "@/components/login-form"
import { getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function LoginPage() {
  const session = await getServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 rounded-full mb-4 overflow-hidden">
              <Image
                src="/fidrua-logo-128.png"
                alt="舆鹰@词盾"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 drop-shadow">舆鹰@词盾</h1>
            <p className="text-blue-100 text-sm drop-shadow">网络内容管理平台</p>
          </div>

          <div className="p-8">
            <LoginForm />
          </div>

          <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 text-center">安全加密存储 | 专业内容管理工具</p>
          </div>
        </div>
      </div>
    </div>
  )
}
