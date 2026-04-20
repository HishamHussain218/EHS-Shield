// ============================================
// EHS Shield — Current User Context
// Simulates the authenticated user session
// ============================================
import { useState } from 'react'

// Default user (Admin for full demo access)
const defaultUser = {
  id: 1,
  name: 'هشام حسين',
  email: 'hisham@ehsshield.com',
  role: 'admin', // 'admin' | 'head' | 'technician'
  department: 'الإدارة العامة',
  avatar: null,
  initials: 'هح',
}

// Role labels in Arabic
export const roleLabels = {
  admin: 'مدير النظام',
  head: 'رئيس قسم',
  technician: 'فني سلامة',
}

// Role permissions map
export const rolePermissions = {
  admin: {
    canViewDashboard: true,
    canViewWorkforce: true,
    canViewLegalRecords: true,
    canViewIncidents: true,
    canViewPermits: true,
    canViewAudits: true,
    canViewAnalytics: true,
    canViewTeam: true,
    canAddUsers: true,
    canSyncSAP: true,
    canExportPDF: true,
    canApprovePermits: true,
    canInvestigateIncidents: true,
  },
  head: {
    canViewDashboard: true,
    canViewWorkforce: true,
    canViewLegalRecords: true,
    canViewIncidents: true,
    canViewPermits: true,
    canViewAudits: true,
    canViewAnalytics: true,
    canViewTeam: false,
    canAddUsers: false,
    canSyncSAP: false,
    canExportPDF: true,
    canApprovePermits: true,
    canInvestigateIncidents: true,
  },
  technician: {
    canViewDashboard: true,
    canViewWorkforce: true,
    canViewLegalRecords: true,
    canViewIncidents: true,
    canViewPermits: true,
    canViewAudits: true,
    canViewAnalytics: false,
    canViewTeam: false,
    canAddUsers: false,
    canSyncSAP: false,
    canExportPDF: false,
    canApprovePermits: false,
    canInvestigateIncidents: false,
  },
}

// Export default user for simple imports
export { defaultUser }
