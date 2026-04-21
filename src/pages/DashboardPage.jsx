import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck, AlertTriangle, Calendar,
  ClipboardCheck, ArrowUpRight, TrendingUp, TrendingDown,
  AlertCircle, Clock
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from 'recharts'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import InteractiveAreaChart from '../components/charts/InteractiveAreaChart'
import SectionCards from '../components/dashboard/SectionCards'
import { alerts, incidentsByDepartment } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border shadow-lg rounded-[12px]">
        <p className="text-xs font-bold text-primary mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-secondary font-medium">
            الحوادث: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8 px-1">
      <PageHeader
        title="لوحة التحكم"
        description="نظرة عامة على حالة الامتثال والسلامة المهنية."
      />

      {/* KPI Grid — SectionCards (Full Width) */}
      <motion.div variants={item}>
        <SectionCards />
      </motion.div>

      {/* Charts Row — Full Width Area Chart */}
      <motion.div variants={item}>
        <InteractiveAreaChart />
      </motion.div>

      {/* Bottom Row — Alerts + Improved Bar Chart */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        {/* Alerts Section (7 columns) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <AlertCircle size={16} className="text-[#D32F2F]" />
              مركز التنبيهات
            </h3>
            <button className="text-[11px] font-bold text-primary hover:underline">عرض الكل</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                whileHover={{ y: -2 }}
                onClick={() => navigate(alert.section)}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md flex items-start gap-3 ${alert.type === 'danger'
                    ? 'bg-[#D32F2F]/5 border-[#D32F2F]/20'
                    : 'bg-[#F57C00]/5 border-[#F57C00]/20'
                  }`}
              >
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${alert.type === 'danger' ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-[#F57C00]/10 text-[#F57C00]'
                  }`}>
                  {alert.type === 'danger' ? <AlertTriangle size={20} /> : <Clock size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-foreground truncate">{alert.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant={alert.type === 'danger' ? 'danger' : 'warning'}>
                      {alert.type === 'danger' ? 'عاجل' : 'تنبيه'}
                    </StatusBadge>
                    <span className="text-[10px] text-muted-foreground">{alert.date}</span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-muted-foreground shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Improved Incidents by Department (5 columns) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              الحوادث حسب القسم
            </h3>
          </div>
          <div className="flex-1 bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col justify-center">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentsByDepartment} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="department"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Tajawal', fontWeight: 500 }}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--chart-1)"
                    radius={[0, 4, 4, 0]}
                    barSize={18}
                    name="incidents"
                    background={{ fill: 'var(--muted)', radius: [0, 4, 4, 0] }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span>إجمالي الحوادث المكتشفة</span>
              <span className="font-bold text-foreground">17 حادثة</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
