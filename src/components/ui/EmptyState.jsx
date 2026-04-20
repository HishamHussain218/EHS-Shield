import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col items-center justify-center py-16 text-center", className)}
    >
      {Icon && (
        <div className="size-16 rounded-2xl bg-[#F4F7F9] flex items-center justify-center mb-4">
          <Icon size={32} strokeWidth={1.5} className="text-muted-foreground/50" />
        </div>
      )}
      <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      )}
      {action}
    </motion.div>
  )
}
