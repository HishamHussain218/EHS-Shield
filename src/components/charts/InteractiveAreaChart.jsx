import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'
import { dailyEHSData } from '../../data/mockData'

const CHART_COLORS = {
  compliance: {
    stroke: 'var(--chart-1)',
    fill: 'complianceGrad',
    label: 'معدل الامتثال',
  },
  incidents: {
    stroke: 'var(--chart-5)',
    fill: 'incidentsGrad',
    label: 'الحوادث',
  },
}

const TIME_RANGES = [
  { value: '90d', label: 'آخر 3 شهور' },
  { value: '30d', label: 'آخر 30 يوم' },
  { value: '7d', label: 'آخر 7 أيام' },
]

// Custom Tooltip
const ChartTooltipContent = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  const formattedDate = new Date(label).toLocaleDateString('ar-EG', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="bg-white border border-border shadow-xl rounded-xl p-3 min-w-[160px]">
      <p className="text-xs font-bold text-primary mb-2 pb-1.5 border-b border-border">
        {formattedDate}
      </p>
      <div className="flex flex-col gap-1.5">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">
                {entry.dataKey === 'compliance' ? 'الامتثال' : 'الحوادث'}
              </span>
            </div>
            <span className="text-xs font-bold text-foreground tabular-nums">
              {entry.value}{entry.dataKey === 'compliance' ? '%' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Custom Legend
const ChartLegendContent = ({ payload }) => {
  if (!payload?.length) return null
  return (
    <div className="flex items-center justify-end gap-6 pt-2 pb-1">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5 leading-none">
          <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11px] font-bold text-muted-foreground">
            {entry.dataKey === 'compliance' ? 'معدل الامتثال' : 'الحوادث'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function InteractiveAreaChart() {
  const [timeRange, setTimeRange] = useState('90d')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredData = useMemo(() => {
    // Reference date remains "now" In this context (2026-04-21)
    const referenceDate = new Date('2026-04-21')
    let daysToSubtract = 90
    if (timeRange === '30d') daysToSubtract = 30
    else if (timeRange === '7d') daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return dailyEHSData.filter((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })
  }, [timeRange])

  // Calculate trend
  const trend = useMemo(() => {
    if (filteredData.length < 2) return { direction: 'neutral', value: 0 }
    const firstHalf = filteredData.slice(0, Math.floor(filteredData.length / 2))
    const secondHalf = filteredData.slice(Math.floor(filteredData.length / 2))
    const avgFirst = firstHalf.reduce((s, d) => s + d.compliance, 0) / firstHalf.length
    const avgSecond = secondHalf.reduce((s, d) => s + d.compliance, 0) / secondHalf.length
    const diff = avgSecond - avgFirst
    return {
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral',
      value: Math.abs(diff).toFixed(1),
    }
  }, [filteredData])

  const selectedLabel = TIME_RANGES.find((r) => r.value === timeRange)?.label

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-border rounded-[12px] shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-foreground">
              تحليل الامتثال والحوادث
            </h3>
            {trend.direction === 'up' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#388E3C] bg-[#388E3C]/10 px-1.5 py-0.5 rounded-full">
                <TrendingUp size={10} />
                +{trend.value}%
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            متابعة يومية لمعدل الامتثال وعدد الحوادث
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 text-xs font-bold text-foreground bg-background border border-border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <span>{selectedLabel}</span>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute left-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg z-50 min-w-full py-1 overflow-hidden whitespace-nowrap">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      setTimeRange(range.value)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-right text-xs px-3 py-2 transition-colors ${timeRange === range.value
                        ? 'bg-primary/5 text-primary font-bold'
                        : 'text-foreground hover:bg-gray-50'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="px-0 pt-6 pb-4">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 60, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="incidentsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--border))"
                strokeDasharray="3 3"
                strokeOpacity={0.4}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={32}
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Tajawal', fontWeight: 500 }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('ar-EG', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <YAxis
                yAxisId="compliance"
                orientation="right"
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={false}
                tickMargin={16}
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'Tajawal', fontWeight: 500 }}
                tickFormatter={(v) => `${v}%`}
                width={45}
              />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
                content={<ChartTooltipContent />}
              />
              <Area
                yAxisId="compliance"
                dataKey="incidents"
                type="monotone"
                fill="url(#incidentsGrad)"
                stroke="var(--chart-5)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: 'var(--chart-5)' }}
              />
              <Area
                yAxisId="compliance"
                dataKey="compliance"
                type="monotone"
                fill="url(#complianceGrad)"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: 'var(--chart-1)' }}
              />
              <Legend content={<ChartLegendContent />} verticalAlign="top" align="right" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}
