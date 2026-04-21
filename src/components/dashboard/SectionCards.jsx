import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { dashboardKPIs } from '../../data/mockData'

const cards = [
  {
    title: 'أيام بدون إصابات',
    value: `${dashboardKPIs.daysWithoutInjury}`,
    suffix: ' يوم',
    badge: { text: '+5 أيام', trend: 'up' },
    footer: { text: 'تحسن مستمر هذا الشهر', trend: 'up' },
    sub: 'مقارنة بالشهر الماضي',
  },
  {
    title: 'التصاريح النشطة',
    value: `${dashboardKPIs.activePermits}`,
    suffix: '',
    badge: { text: '-20%', trend: 'down' },
    footer: { text: 'انخفاض 20% هذه الفترة', trend: 'down' },
    sub: 'يحتاج متابعة فورية',
  },
  {
    title: 'معدل الامتثال',
    value: `${dashboardKPIs.complianceRate}`,
    suffix: '%',
    badge: { text: '+2.3%', trend: 'up' },
    footer: { text: 'تجاوز المستهدف', trend: 'up' },
    sub: 'أداء ممتاز هذا الربع',
  },
  {
    title: 'عمليات تفتيش معلقة',
    value: `${dashboardKPIs.pendingAudits}`,
    suffix: '',
    badge: { text: '+4.5%', trend: 'up' },
    footer: { text: 'أداء ثابت', trend: 'up' },
    sub: 'يتماشى مع خطة التفتيش',
  },
]

export default function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-white shadow-sm"
        >
          {/* Header */}
          <div className="flex flex-col gap-1 p-6 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">
                {card.title}
              </span>
              {/* Badge */}
              <span
                className={`
                  inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium
                  ${card.badge.trend === 'up'
                    ? 'border-[#388E3C]/20 text-[#388E3C]'
                    : 'border-[#D32F2F]/20 text-[#D32F2F]'
                  }
                `}
              >
                {card.badge.trend === 'up'
                  ? <TrendingUp size={12} />
                  : <TrendingDown size={12} />
                }
                {card.badge.text}
              </span>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
              {card.value}{card.suffix}
            </p>
          </div>
          {/* Footer */}
          <div className="flex flex-col gap-1.5 border-t border-border/50 px-6 py-4 text-sm">
            <div className="flex items-center gap-2 font-medium text-foreground leading-none">
              {card.footer.text}
              {card.footer.trend === 'up'
                ? <TrendingUp size={16} className="text-[#388E3C]" />
                : <TrendingDown size={16} className="text-[#D32F2F]" />
              }
            </div>
            <div className="text-muted-foreground text-xs">
              {card.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
