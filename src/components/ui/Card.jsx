import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function Card({ children, className, title, subtitle, icon: Icon, color }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white border border-border rounded-[12px] p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          {title && <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>}
          {subtitle && <p className="text-2xl font-bold text-foreground mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div 
            className="size-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            <Icon size={24} strokeWidth={2} />
          </div>
        )}
      </div>
      {children}
    </motion.div>
  )
}
