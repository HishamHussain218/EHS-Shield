import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Clock, AlertTriangle, CheckCircle2, Search as SearchIcon, MapPin, X, Camera, Timer } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { incidents } from '../data/mockData'

const statusConfig = {
  investigating: { label: 'جاري التحقيق', variant: 'warning', icon: SearchIcon },
  resolved: { label: 'تم الحل', variant: 'success', icon: CheckCircle2 },
}
const severityConfig = {
  critical: { label: 'حرجة', variant: 'danger' },
  high: { label: 'عالية', variant: 'danger' },
  medium: { label: 'متوسطة', variant: 'warning' },
  low: { label: 'منخفضة', variant: 'neutral' },
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }

export default function IncidentsPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="الحوادث والتحقيقات" description="تتبع الحوادث وإجراء التحقيقات الرقمية وإنشاء إخطارات الـ 24 ساعة.">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D32F2F] text-white rounded-xl text-sm font-bold hover:bg-[#D32F2F]/90 transition-all shadow-lg shadow-[#D32F2F]/20"
        >
          <Plus size={16} />
          الإبلاغ عن حادثة
        </button>
      </PageHeader>

      {/* 24h notification banner */}
      {incidents.some(inc => inc.status === 'investigating' && inc.notified24h) && (
        <motion.div variants={item} className="bg-[#D32F2F]/5 border border-[#D32F2F]/20 rounded-[12px] p-4 flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center shrink-0">
            <Timer size={18} className="text-[#D32F2F]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#D32F2F]">تنبيه: إخطار 24 ساعة قانوني</p>
            <p className="text-xs text-muted-foreground">حادثة INC-001 تتطلب إرسال إخطار لمكتب العمل خلال 24 ساعة من وقوعها.</p>
          </div>
          <button className="px-4 py-2 bg-[#D32F2F] text-white rounded-xl text-xs font-bold hover:bg-[#D32F2F]/90 transition-colors shrink-0">
            إنشاء الإخطار
          </button>
        </motion.div>
      )}

      {/* Timeline */}
      <motion.div variants={item} className="relative">
        {/* Timeline line */}
        <div className="absolute right-[23px] top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-6">
          {incidents.map((inc) => {
            const status = statusConfig[inc.status] || statusConfig.investigating
            const severity = severityConfig[inc.severity] || severityConfig.medium
            const StatusIcon = status.icon

            return (
              <motion.div key={inc.id} variants={item} className="flex gap-5 relative">
                {/* Dot */}
                <div className={`size-[14px] rounded-full border-[3px] border-white z-10 mt-5 shrink-0 ${
                  inc.status === 'resolved' ? 'bg-[#388E3C]' : 'bg-[#F57C00]'
                }`} style={{boxShadow: '0 0 0 2px ' + (inc.status === 'resolved' ? '#388E3C30' : '#F57C0030')}} />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex-1 bg-white border border-border rounded-[12px] p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold text-secondary">{inc.id}</span>
                        <StatusBadge variant={severity.variant}>{severity.label}</StatusBadge>
                        <StatusBadge variant={status.variant}>{status.label}</StatusBadge>
                      </div>
                      <h3 className="text-sm font-bold text-foreground">{inc.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium shrink-0">{inc.date} · {inc.time}</p>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{inc.description}</p>

                  <div className="flex flex-wrap gap-4 text-[11px]">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={12} /> {inc.location}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <AlertTriangle size={12} /> {inc.department}
                    </span>
                  </div>

                  {inc.rootCause && (
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <p className="text-[11px] font-bold text-foreground mb-1">السبب الجذري:</p>
                      <p className="text-xs text-muted-foreground">{inc.rootCause}</p>
                      {inc.correctiveAction && (
                        <>
                          <p className="text-[11px] font-bold text-foreground mb-1 mt-2">الإجراء التصحيحي:</p>
                          <p className="text-xs text-muted-foreground">{inc.correctiveAction}</p>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* New Incident Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-black text-foreground">الإبلاغ عن حادثة جديدة</h3>
                <button onClick={() => setShowModal(false)} className="size-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground mb-1.5 block">عنوان الحادثة</label>
                  <input className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10" placeholder="وصف مختصر للحادثة" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground mb-1.5 block">الموقع</label>
                    <input className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10" placeholder="مثال: خط الإنتاج 3" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground mb-1.5 block">درجة الخطورة</label>
                    <select className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-white focus:outline-none focus:border-secondary">
                      <option>منخفضة</option>
                      <option>متوسطة</option>
                      <option>عالية</option>
                      <option>حرجة</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground mb-1.5 block">التفاصيل</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm resize-none focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10" placeholder="وصف تفصيلي لما حدث..." />
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-secondary/40 transition-colors cursor-pointer">
                  <Camera size={24} className="text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-xs font-bold text-muted-foreground">اضغط لرفع صور الحادثة</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG حتى 10MB</p>
                </div>
              </div>
              <div className="p-6 border-t border-border flex items-center gap-3 justify-end">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-border rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">إلغاء</button>
                <button className="px-5 py-2.5 bg-[#D32F2F] text-white rounded-xl text-sm font-bold hover:bg-[#D32F2F]/90 transition-all shadow-lg shadow-[#D32F2F]/20">إرسال البلاغ</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
