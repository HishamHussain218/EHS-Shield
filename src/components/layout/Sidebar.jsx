import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  FileText, 
  Settings, 
  LogOut,
  Scale,
  ClipboardCheck,
  Flame,
  BarChart3,
  UserCog
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { defaultUser, rolePermissions, roleLabels } from '../../data/currentUser'

const allMenuItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard', permission: 'canViewDashboard' },
  { icon: Users, label: 'كفاءة العاملين', path: '/workforce', permission: 'canViewWorkforce' },
  { icon: Scale, label: 'السجلات القانونية', path: '/legal', permission: 'canViewLegalRecords' },
  { icon: ShieldAlert, label: 'الحوادث والتحقيقات', path: '/incidents', permission: 'canViewIncidents' },
  { icon: ClipboardCheck, label: 'تصاريح العمل', path: '/permits', permission: 'canViewPermits' },
  { icon: Flame, label: 'التفتيش والمراجعات', path: '/audits', permission: 'canViewAudits' },
  { icon: BarChart3, label: 'التقارير والتحليلات', path: '/analytics', permission: 'canViewAnalytics' },
  { icon: UserCog, label: 'إدارة الفريق', path: '/team', permission: 'canViewTeam' },
]

export default function Sidebar() {
  const location = useLocation()
  const permissions = rolePermissions[defaultUser.role]
  const menuItems = allMenuItems.filter(item => permissions[item.permission])

  return (
    <aside className="w-[272px] h-screen bg-white border-l border-border flex flex-col sticky top-0 shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-border">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
          <ShieldAlert size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg font-black text-primary leading-tight">EHS Shield</h1>
          <p className="text-[10px] text-muted-foreground font-medium tracking-wider">درع الحماية والامتثال</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">القائمة الرئيسية</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group text-[13px] font-semibold",
              isActive 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-[#F4F7F9] hover:text-primary"
            )}
          >
            <item.icon 
              className="shrink-0 transition-colors" 
              size={20} 
              strokeWidth={2} 
            />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="size-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-xs font-bold shrink-0">
            {defaultUser.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground truncate">{defaultUser.name}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{roleLabels[defaultUser.role]}</p>
          </div>
        </div>
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors text-[13px] font-semibold"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>تسجيل الخروج</span>
        </NavLink>
      </div>
    </aside>
  )
}
