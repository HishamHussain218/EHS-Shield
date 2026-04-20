import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, RefreshCw, UserPlus, X, GraduationCap, AlertTriangle, FileText } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { employees, trainings, violations as allViolations } from '../data/mockData'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function WorkforcePage() {
  const [search, setSearch] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [profileTab, setProfileTab] = useState('trainings')

  const filtered = employees.filter(e =>
    e.name.includes(search) || e.id.includes(search) || e.department.includes(search)
  )

  const empTrainings = selectedEmployee ? trainings.filter(t => t.employeeId === selectedEmployee.id) : []
  const empViolations = selectedEmployee ? allViolations.filter(v => v.employeeId === selectedEmployee.id) : []

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="مركز كفاءة العاملين" description="قاعدة بيانات الموظفين المتزامنة مع نظام SAP.">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
          <RefreshCw size={16} />
          مزامنة من SAP
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <UserPlus size={16} />
          إضافة موظف
        </button>
      </PageHeader>

      {/* Search */}
      <motion.div variants={item} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-border w-full max-w-md">
        <Search size={16} className="text-muted-foreground shrink-0" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم أو الرقم أو القسم..."
          className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-muted-foreground/50"
        />
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="bg-white border border-border rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-[#F4F7F9]">
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الرقم</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الاسم</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">القسم</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">المنصب</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الكفاءة</th>
                <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">حالة SAP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr 
                  key={emp.id} 
                  onClick={() => { setSelectedEmployee(emp); setProfileTab('trainings') }}
                  className="border-b border-border/50 hover:bg-[#F4F7F9]/60 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-xs font-mono font-bold text-secondary">{emp.id}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-foreground">{emp.name}</td>
                  <td className="px-5 py-3.5 text-xs font-medium text-muted-foreground">{emp.department}</td>
                  <td className="px-5 py-3.5 text-xs font-medium text-muted-foreground">{emp.position}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${emp.efficiency}%`,
                            backgroundColor: emp.efficiency >= 90 ? '#388E3C' : emp.efficiency >= 75 ? '#F57C00' : '#D32F2F'
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground">{emp.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge variant={emp.sapStatus === 'verified' ? 'success' : 'warning'}>
                      {emp.sapStatus === 'verified' ? 'مُتحقق' : 'قيد المراجعة'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Employee Profile Panel */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-black">
                    {selectedEmployee.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-foreground">{selectedEmployee.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{selectedEmployee.position} · {selectedEmployee.department}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEmployee(null)} className="size-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border px-6">
                {[
                  { id: 'trainings', label: 'التدريبات', icon: GraduationCap, count: empTrainings.length },
                  { id: 'violations', label: 'المخالفات', icon: AlertTriangle, count: empViolations.length },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setProfileTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                      profileTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {profileTab === 'trainings' && (
                  <div className="flex flex-col gap-3">
                    {empTrainings.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">لا يوجد تدريبات مسجلة.</p>
                    ) : empTrainings.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-3 bg-[#F4F7F9] rounded-xl">
                        <div>
                          <p className="text-sm font-bold text-foreground">{t.title}</p>
                          <p className="text-[11px] text-muted-foreground">{t.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {t.score && <span className="text-xs font-bold text-[#388E3C]">{t.score}%</span>}
                          <StatusBadge variant={t.status === 'completed' ? 'success' : 'warning'}>
                            {t.status === 'completed' ? 'مكتمل' : 'معلق'}
                          </StatusBadge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {profileTab === 'violations' && (
                  <div className="flex flex-col gap-3">
                    {empViolations.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">لا يوجد مخالفات. سجل نظيف! ✅</p>
                    ) : empViolations.map(v => (
                      <div key={v.id} className="flex items-center justify-between p-3 bg-[#F4F7F9] rounded-xl">
                        <div>
                          <p className="text-sm font-bold text-foreground">{v.type}</p>
                          <p className="text-[11px] text-muted-foreground">{v.date} · {v.penalty}</p>
                        </div>
                        <StatusBadge variant={v.severity === 'high' ? 'danger' : v.severity === 'medium' ? 'warning' : 'neutral'}>
                          {v.severity === 'high' ? 'عالية' : v.severity === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </StatusBadge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
