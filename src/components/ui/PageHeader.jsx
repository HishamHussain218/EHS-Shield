import React from 'react'

export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h2 className="text-2xl font-black text-primary">{title}</h2>
        {description && (
          <p className="text-muted-foreground font-medium mt-1 text-sm">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  )
}
