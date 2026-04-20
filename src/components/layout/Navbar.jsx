import React from 'react'
import { Bell, Search } from 'lucide-react'
import { defaultUser, roleLabels } from '../../data/currentUser'
import { alerts } from '../../data/mockData'

export default function Navbar() {
  const activeAlerts = alerts.filter(a => a.type === 'danger').length

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#F4F7F9] px-4 py-2 rounded-xl border border-transparent focus-within:border-secondary/30 transition-colors w-80">
        <Search size={16} className="text-muted-foreground shrink-0" strokeWidth={2} />
        <input 
          type="text" 
          placeholder="البحث عن موظف، تقرير، أو حادثة..." 
          className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative size-9 flex items-center justify-center rounded-xl hover:bg-[#F4F7F9] transition-colors">
          <Bell size={18} strokeWidth={2} className="text-muted-foreground" />
          {activeAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 size-4 bg-[#D32F2F] rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white">
              {activeAlerts}
            </span>
          )}
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-border"></div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-left">
            <p className="text-xs font-bold text-foreground">{defaultUser.name}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{roleLabels[defaultUser.role]}</p>
          </div>
          <div className="size-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary text-xs font-bold group-hover:bg-secondary/20 transition-all shrink-0">
            {defaultUser.initials}
          </div>
        </div>
      </div>
    </header>
  )
}
