import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert, Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex font-sans" dir="rtl">
      {/* Left Panel — Industrial visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#003366] overflow-hidden items-center justify-center">
        {/* Decorative gradient circles */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#1565C0]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-[#1565C0]/15 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="size-24 bg-white/10 backdrop-blur-sm rounded-3xl mx-auto mb-8 flex items-center justify-center border border-white/20">
            <ShieldAlert size={48} className="text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            درع الحماية<br />والامتثال الصناعي
          </h2>
          <p className="text-white/60 text-base font-medium leading-relaxed max-w-md mx-auto">
            نظام متكامل لإدارة السلامة والصحة المهنية والبيئة في المصانع المصرية. مرتبط مباشرة بنظام SAP.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-black text-white">1,482</p>
              <p className="text-white/50 text-xs font-medium mt-1">موظف مسجل</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black text-[#388E3C]">94%</p>
              <p className="text-white/50 text-xs font-medium mt-1">معدل الامتثال</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">10</p>
              <p className="text-white/50 text-xs font-medium mt-1">سجل قانوني</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel — Login form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <ShieldAlert size={22} strokeWidth={2} />
            </div>
            <h1 className="text-xl font-black text-primary">EHS Shield</h1>
          </div>

          <h2 className="text-2xl font-black text-foreground mb-1">مرحباً بك 👋</h2>
          <p className="text-muted-foreground text-sm font-medium mb-8">سجّل دخولك لمتابعة حالة المصنع وسلامة العاملين.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-xs font-bold text-foreground mb-1.5 block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-4 pr-10 py-3 border border-border rounded-xl text-sm font-medium bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all placeholder:text-muted-foreground/40"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-foreground mb-1.5 block">كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-10 py-3 border border-border rounded-xl text-sm font-medium bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all placeholder:text-muted-foreground/40"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-border text-secondary focus:ring-secondary/20"
                />
                <span className="text-xs font-medium text-muted-foreground">تذكرني</span>
              </label>
              <button type="button" className="text-xs font-bold text-secondary hover:underline">
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={16} strokeWidth={2} />
                  <span>دخول آمن</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-muted-foreground/60 mt-10">
            محمي بتشفير SSL 256-bit · متوافق مع قانون العمل المصري
          </p>
        </motion.div>
      </div>
    </div>
  )
}
