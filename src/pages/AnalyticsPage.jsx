import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileDown, TrendingUp } from 'lucide-react'
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import PageHeader from '../components/ui/PageHeader'
import { monthlyComplianceData, incidentsByDepartment, violationTypes } from '../data/mockData'

const COLORS = ['#003366', '#1565C0', '#F57C00', '#D32F2F', '#388E3C']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border shadow-lg rounded-[12px]">
        <p className="text-xs font-bold text-primary mb-1">{label || payload[0]?.name}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-secondary font-medium">{p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }

export default function AnalyticsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      <PageHeader title="التقارير والتحليلات" description="تحليل شامل لأداء السلامة والصحة المهنية عبر جميع الأقسام.">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl">
          <Calendar size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">يناير 2026 — يونيو 2026</span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <FileDown size={16} />
          إنشاء إحصائية نصف سنوية
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-5 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground mb-1">إجمالي الحوادث (6 أشهر)</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-foreground">12</p>
            <span className="text-xs font-bold text-[#388E3C] flex items-center gap-1 mb-1"><TrendingUp size={12} />↓ 25% عن الفترة السابقة</span>
          </div>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-5 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground mb-1">متوسط الامتثال</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-foreground">91.5%</p>
            <span className="text-xs font-bold text-[#388E3C] flex items-center gap-1 mb-1"><TrendingUp size={12} />↑ 3.2%</span>
          </div>
        </div>
        <div className="bg-white border border-border rounded-[12px] p-5 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground mb-1">إجمالي المخالفات</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-foreground">32</p>
            <span className="text-xs font-bold text-[#D32F2F] flex items-center gap-1 mb-1">↑ 5% عن الفترة السابقة</span>
          </div>
        </div>
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accident Trends — Line/Area */}
        <div className="lg:col-span-2 bg-white border border-border rounded-[12px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-foreground mb-6">اتجاه الحوادث والامتثال</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyComplianceData}>
                <defs>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1565C0" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#1565C0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D32F2F" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#D32F2F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={8} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="compliance" stroke="#1565C0" strokeWidth={2.5} fill="url(#compGrad)" name="الامتثال" />
                <Area type="monotone" dataKey="incidents" stroke="#D32F2F" strokeWidth={2} fill="url(#incGrad)" name="الحوادث" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Violation Types — Pie */}
        <div className="bg-white border border-border rounded-[12px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-foreground mb-6">أنواع المخالفات</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={violationTypes} cx="50%" cy="45%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="count" nameKey="type">
                  {violationTypes.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-col gap-1.5 mt-2">
            {violationTypes.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-muted-foreground truncate">{v.type}</span>
                <span className="font-bold text-foreground mr-auto">{v.count}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Incidents by Department — Bar */}
      <motion.div variants={item} className="bg-white border border-border rounded-[12px] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-foreground mb-6">توزيع الحوادث حسب القسم (مناطق الخطر)</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidentsByDepartment}>
              <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={8} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#003366" radius={[8, 8, 0, 0]} barSize={40} name="الحوادث" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  )
}
