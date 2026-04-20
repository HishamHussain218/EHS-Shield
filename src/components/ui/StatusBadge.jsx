import React from 'react'
import { cn } from '../../lib/utils'

const variants = {
  success: 'bg-[#388E3C]/10 text-[#388E3C] border-[#388E3C]/20',
  warning: 'bg-[#F57C00]/10 text-[#F57C00] border-[#F57C00]/20',
  danger: 'bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20',
  info: 'bg-[#1565C0]/10 text-[#1565C0] border-[#1565C0]/20',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function StatusBadge({ children, variant = 'neutral', className }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
