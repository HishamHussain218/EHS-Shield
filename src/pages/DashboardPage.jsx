import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ShieldCheck, AlertTriangle, Calendar, Users, 
  ClipboardCheck, ArrowUpRight, TrendingUp, TrendingDown,
  AlertCircle, Clock
} from 'lucide-react'
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, 
  Tooltip, ResponsiveContainer 
} from 'recharts'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'
import { dashboardKPIs, alerts, incidentsByDepartment, monthlyComplianceData } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border shadow-lg rounded-[12px]">
        <p className="text-xs font-bold text-primary mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-secondary font-medium">
            {p.name === 'compliance' ? 'الامتثال' : 'الحوادث'}: {p.value}{p.name === 'compliance' ? '%' : ''}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const kpiCards = [
  { title: 'أيام بدون إصابات', value: dashboardKPIs.daysWithoutInjury, icon: Calendar, color: '#003366', suffix: ' يوم', trend: 'up' },
  { title: 'التصاريح النشطة', value: dashboardKPIs.activePermits, icon: ClipboardCheck, color: '#1565C0', suffix: '', trend: 'neutral' },
  { title: 'معدل الامتثال', value: dashboardKPIs.complianceRate, icon: ShieldCheck, color: '#388E3C', suffix: '%', trend: 'up' },
  { title: 'عمليات تفتيش معلقة', value: dashboardKPIs.pendingAudits, icon: AlertTriangle, color: '#F57C00', suffix: '', trend: 'down' },
]

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
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
      <PageHeader 
        title="لوحة التحكم" 
        description="نظرة عامة على حالة الامتثال والسلامة المهنية."
      />

      {/* KPI Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="bg-white border border-border rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-3xl font-black text-foreground">{kpi.value}{kpi.suffix}</p>
              </div>
              <div 
                className="size-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}10`, color: kpi.color }}
              >
                <kpi.icon size={22} strokeWidth={2} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {kpi.trend === 'up' && <TrendingUp size={14} className="text-[#388E3C]" />}
              {kpi.trend === 'down' && <TrendingDown size={14} className="text-[#D32F2F]" />}
              <span className={`text-[11px] font-bold ${kpi.trend === 'up' ? 'text-[#388E3C]' : kpi.trend === 'down' ? 'text-[#D32F2F]' : 'text-muted-foreground'}`}>
                {kpi.trend === 'up' ? 'تحسن' : kpi.trend === 'down' ? 'يحتاج متابعة' : 'مستقر'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Alerts Section */}
      <motion.div variants={item}>
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle size={16} className="text-[#D32F2F]" />
          مركز التنبيهات
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              whileHover={{ y: -2 }}
              onClick={() => navigate(alert.section)}
              className={`p-4 rounded-[12px] border cursor-pointer transition-all hover:shadow-md flex items-start gap-3 ${
                alert.type === 'danger' 
                  ? 'bg-[#D32F2F]/5 border-[#D32F2F]/20' 
                  : 'bg-[#F57C00]/5 border-[#F57C00]/20'
              }`}
            >
              <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                alert.type === 'danger' ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-[#F57C00]/10 text-[#F57C00]'
              }`}>
                {alert.type === 'danger' ? <AlertTriangle size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-foreground truncate">{alert.title}</h4>
                  <StatusBadge variant={alert.type === 'danger' ? 'danger' : 'warning'}>
                    {alert.type === 'danger' ? 'عاجل' : 'تنبيه'}
                  </StatusBadge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
              </div>
              <ArrowUpRight size={14} className="text-muted-foreground shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Compliance Trend */}
        <div className="lg:col-span-3 bg-white border border-border rounded-[12px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-foreground mb-6">اتجاه الامتثال الشهري</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyComplianceData}>
                <defs>
                  <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1565C0" stopOpacity={0.12}/>
                    <stop offset="100%" stopColor="#1565C0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={8} />
                <YAxis hide domain={[80, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="compliance" stroke="#1565C0" strokeWidth={2.5} fill="url(#complianceGrad)" name="compliance" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Department */}
        <div className="lg:col-span-2 bg-white border border-border rounded-[12px] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-foreground mb-6">الحوادث حسب القسم</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByDepartment} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#003366" radius={[0, 6, 6, 0]} barSize={20} name="incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
