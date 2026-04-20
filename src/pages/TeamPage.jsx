import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, RefreshCw, Shield, MoreHorizontal, Wifi, WifiOff, Clock, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { systemUsers, sapSyncStatus } from '../data/mockData'
import { roleLabels } from '../data/currentUser'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function TeamPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="إدارة الفريق والإعدادات" description="إدارة المستخدمين وإعدادات تكامل SAP — خاص بالمدير فقط.">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <UserPlus size={16} />
          إضافة مستخدم
        </button>
      </PageHeader>

      {/* SAP Integration Status */}
      <motion.div variants={item} className="bg-white border border-border rounded-[12px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            تكامل SAP
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all">
            <RefreshCw size={14} />
            مزامنة الآن
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-3">
            <div className={`size-10 rounded-xl flex items-center justify-center ${
              sapSyncStatus.connected ? 'bg-[#388E3C]/10 text-[#388E3C]' : 'bg-[#D32F2F]/10 text-[#D32F2F]'
            }`}>
              {sapSyncStatus.connected ? <Wifi size={20} /> : <WifiOff size={20} />}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">حالة الاتصال</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`size-2 rounded-full ${sapSyncStatus.connected ? 'bg-[#388E3C] animate-pulse' : 'bg-[#D32F2F]'}`} />
                <span className={`text-[11px] font-bold ${sapSyncStatus.connected ? 'text-[#388E3C]' : 'text-[#D32F2F]'}`}>
                  {sapSyncStatus.connected ? 'متصل' : 'غير متصل'}
                </span>
              </div>
            </div>
          </div>

          {/* Last Sync */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">آخر مزامنة</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{formatDate(sapSyncStatus.lastSync)}</p>
            </div>
          </div>

          {/* Employees Synced */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">موظفين متزامنين</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{sapSyncStatus.employeesSynced.toLocaleString()} موظف</p>
            </div>
          </div>

          {/* Next Scheduled */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#F57C00]/10 text-[#F57C00] flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">المزامنة القادمة</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{formatDate(sapSyncStatus.nextScheduledSync)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={item} className="bg-white border border-border rounded-[12px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">مستخدمو النظام</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F4F7F9]">
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الاسم</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">البريد</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الدور</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">القسم</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الحالة</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">آخر دخول</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {systemUsers.map(user => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-[#F4F7F9]/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground font-mono" dir="ltr">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge variant={user.role === 'admin' ? 'info' : user.role === 'head' ? 'success' : 'neutral'}>
                      {roleLabels[user.role]}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{user.department}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge variant={user.status === 'active' ? 'success' : 'neutral'}>
                      {user.status === 'active' ? 'نشط' : 'غير نشط'}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatDate(user.lastLogin)}</td>
                  <td className="px-5 py-3.5">
                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal size={16} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
