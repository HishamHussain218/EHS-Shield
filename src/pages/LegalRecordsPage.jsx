import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileDown, FileWarning, Stethoscope, GraduationCap, AlertOctagon, FlaskConical, HardHat, ClipboardCheck, SearchCheck, Flame, Shield } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { legalRecordTypes, legalRecords } from '../data/mockData'

const iconMap = { FileWarning, Stethoscope, GraduationCap, AlertOctagon, FlaskConical, HardHat, ClipboardCheck, SearchCheck, Flame, Shield }
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function LegalRecordsPage() {
  const [selectedType, setSelectedType] = useState(1)
  const records = legalRecords.filter(r => r.recordTypeId === selectedType)
  const currentType = legalRecordTypes.find(t => t.id === selectedType)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="السجلات القانونية" description="السجلات العشرة الإلزامية وفقاً لقانون العمل المصري.">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <FileDown size={16} />
          تصدير كملف PDF رسمي
        </button>
      </PageHeader>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Record Types Sidebar */}
        <div className="lg:col-span-1 bg-white border border-border rounded-[12px] p-3 shadow-sm h-fit">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 py-2">السجلات (10)</p>
          <div className="flex flex-col gap-1">
            {legalRecordTypes.map((type) => {
              const IconComp = iconMap[type.icon]
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-all text-[12px] font-semibold w-full ${
                    selectedType === type.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:bg-[#F4F7F9] hover:text-primary'
                  }`}
                >
                  {IconComp && <IconComp size={16} className="shrink-0" />}
                  <span className="truncate">{type.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Records Table */}
        <div className="lg:col-span-3 bg-white border border-border rounded-[12px] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">{currentType?.name}</h3>
            <span className="text-xs font-medium text-muted-foreground">{records.length} سجل</span>
          </div>

          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="size-14 rounded-2xl bg-[#F4F7F9] flex items-center justify-center mb-3">
                <Shield size={28} className="text-muted-foreground/40" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">لا يوجد سجلات</p>
              <p className="text-xs text-muted-foreground">لم يتم إضافة أي بيانات لهذا السجل بعد.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F4F7F9]">
                    <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">التاريخ</th>
                    <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الوصف</th>
                    <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الموظف</th>
                    <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">الحالة</th>
                    <th className="text-right text-[11px] font-bold text-muted-foreground px-5 py-3">ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(rec => (
                    <tr key={rec.id} className="border-b border-border/50 hover:bg-[#F4F7F9]/50 transition-colors">
                      <td className="px-5 py-3.5 text-xs font-bold text-secondary">{rec.date}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-foreground">{rec.description}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{rec.employee}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge variant={rec.status === 'completed' || rec.status === 'documented' ? 'success' : rec.status === 'needs-action' ? 'danger' : 'neutral'}>
                          {rec.status === 'completed' ? 'مكتمل' : rec.status === 'documented' ? 'موثق' : rec.status === 'needs-action' ? 'يحتاج إجراء' : rec.status}
                        </StatusBadge>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[200px] truncate">{rec.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
