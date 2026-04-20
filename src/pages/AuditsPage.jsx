import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, Wrench, Camera, Eye } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { audits, auditViolations } from '../data/mockData'

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }

export default function AuditsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="التفتيش والمراجعات" description="قوائم الفحص الميدانية ورصد المخالفات من تطبيق الموبايل.">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Eye size={16} />
          عرض جميع التقارير
        </button>
      </PageHeader>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Checklists Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground">قوائم الفحص النشطة</h3>
          {audits.map(audit => (
            <motion.div
              key={audit.id}
              whileHover={{ y: -2 }}
              className="bg-white border border-border rounded-[12px] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] font-mono font-bold text-secondary">{audit.id}</p>
                  <h4 className="text-sm font-bold text-foreground mt-0.5">{audit.title}</h4>
                </div>
                <StatusBadge variant={audit.status === 'completed' ? 'success' : 'warning'}>
                  {audit.status === 'completed' ? 'مكتمل' : 'جاري'}
                </StatusBadge>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
                <span>المنطقة: {audit.area}</span>
                <span>{audit.date}</span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${audit.completion}%`,
                      backgroundColor: audit.completion === 100 ? '#388E3C' : '#1565C0'
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold text-muted-foreground">{audit.completion}%</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-[11px]">
                <span className="flex items-center gap-1 text-[#388E3C] font-bold">
                  <CheckCircle2 size={12} /> {audit.passedItems} نجح
                </span>
                <span className="flex items-center gap-1 text-[#D32F2F] font-bold">
                  <XCircle size={12} /> {audit.failedItems} فشل
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  الإجمالي: {audit.totalItems}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Violations Gallery */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Camera size={14} className="text-[#D32F2F]" />
            المخالفات المرصودة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditViolations.map(v => (
              <motion.div
                key={v.id}
                whileHover={{ y: -2 }}
                className="bg-white border border-border rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Photo placeholder */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <Camera size={32} className="text-muted-foreground/20" strokeWidth={1.5} />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-bold text-foreground leading-relaxed">{v.description}</p>
                    <StatusBadge variant={v.severity === 'critical' ? 'danger' : v.severity === 'high' ? 'danger' : 'warning'} className="shrink-0 mr-2">
                      {v.severity === 'critical' ? 'حرجة' : v.severity === 'high' ? 'عالية' : 'متوسطة'}
                    </StatusBadge>
                  </div>

                  <p className="text-[11px] text-muted-foreground mb-3">{v.location}</p>

                  <div className="flex items-center justify-between">
                    <StatusBadge variant={v.status === 'resolved' ? 'success' : v.status === 'assigned' ? 'info' : 'neutral'}>
                      {v.status === 'resolved' ? 'تم الحل' : v.status === 'assigned' ? `مُحوّل: ${v.assignedTo}` : 'مفتوح'}
                    </StatusBadge>

                    {v.status === 'open' && (
                      <button className="flex items-center gap-1.5 text-[11px] font-bold text-secondary hover:text-secondary/80 transition-colors">
                        <Wrench size={12} />
                        تحويل للصيانة
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
