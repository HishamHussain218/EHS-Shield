import React from 'react'
import { motion } from 'framer-motion'
import { Flame, HardHat, Box, Clock, ArrowRight, User, MapPin } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { workPermits } from '../data/mockData'

const typeIcons = { 'hot-work': Flame, 'heights': HardHat, 'confined': Box }
const typeColors = { 'hot-work': '#D32F2F', 'heights': '#F57C00', 'confined': '#1565C0' }

const columns = [
  { id: 'new', title: 'طلب جديد', color: '#1565C0' },
  { id: 'review', title: 'قيد المراجعة', color: '#F57C00' },
  { id: 'approved', title: 'معتمد', color: '#388E3C' },
  { id: 'expired', title: 'منتهي', color: '#D32F2F' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }

function getTimeRemaining(expiresAt) {
  if (!expiresAt) return null
  const now = new Date()
  const exp = new Date(expiresAt)
  const diff = exp - now
  if (diff <= 0) return 'منتهي'
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days} يوم ${hours % 24} ساعة`
  return `${hours} ساعة`
}

export default function WorkPermitsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="تصاريح العمل" description="إدارة تصاريح الأعمال الخطرة (اللحام، الارتفاعات، الأماكن المحصورة).">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Flame size={16} />
          طلب تصريح جديد
        </button>
      </PageHeader>

      {/* Kanban Board */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {columns.map(col => {
          const colPermits = workPermits.filter(p => p.status === col.id)
          return (
            <div key={col.id} className="flex flex-col gap-3">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                  <h3 className="text-xs font-bold text-foreground">{col.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{colPermits.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3 min-h-[200px]">
                {colPermits.map(permit => {
                  const TypeIcon = typeIcons[permit.type] || Flame
                  const typeColor = typeColors[permit.type] || '#1565C0'
                  const timeLeft = getTimeRemaining(permit.expiresAt)

                  return (
                    <motion.div
                      key={permit.id}
                      whileHover={{ y: -2 }}
                      className="bg-white border border-border rounded-[12px] p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${typeColor}10`, color: typeColor }}>
                            <TypeIcon size={16} />
                          </div>
                          <div>
                            <p className="text-[11px] font-mono font-bold text-secondary">{permit.id}</p>
                            <p className="text-xs font-bold text-foreground">{permit.typeLabel}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-3">
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <User size={11} /> {permit.requester}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <MapPin size={11} /> {permit.location}
                        </p>
                      </div>

                      {timeLeft && (
                        <div className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full w-fit ${
                          col.id === 'expired' ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-[#388E3C]/10 text-[#388E3C]'
                        }`}>
                          <Clock size={11} />
                          {timeLeft}
                        </div>
                      )}

                      {col.id === 'review' && (
                        <button className="w-full mt-3 py-2 bg-[#388E3C]/10 text-[#388E3C] rounded-lg text-[11px] font-bold hover:bg-[#388E3C]/20 transition-colors">
                          موافقة على التصريح
                        </button>
                      )}
                    </motion.div>
                  )
                })}

                {colPermits.length === 0 && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/60 rounded-[12px] py-8">
                    <p className="text-xs text-muted-foreground/50 font-medium">لا يوجد تصاريح</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
