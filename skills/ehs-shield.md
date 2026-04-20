# EHS Shield — Complete Design System & Product Skills

## 1. UI Style (Remote Style)
- **Concept**: Clean UI, comfortable white spaces, highly readable, mathematical precision.
- **Edges**: Soft rounded corners (Border-radius: ~12px).
- **Direction**: Arabic (RTL). Sidebar and content layout must start from the right.

## 2. Color Palette

| Category | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Navy | `#003366` | Logo, Headers, Large Buttons |
| **Secondary** | Royal Blue | `#1565C0` | Active Elements, Links, Secondary Buttons |
| **Background** | Off-white | `#F4F7F9` | Main background color |
| **Danger** | Red | `#D32F2F` | Emergencies, High risk, Expired |
| **Warning** | Orange | `#F57C00` | Alerts, Near deadlines |
| **Success** | Green | `#388E3C` | Security, Full compliance |

## 3. Typography
- **Font Family**: **Tajawal**
- Professional and high readability for Arabic SaaS systems.

## 4. Logo Concept
- **Shield** + **Industrial Elements** (cooling towers/chimneys).
- Colors: Deep Navy to match brand identity.

## 5. Technical Identity
- **Framework**: React / Vite
- **UI Components**: shadcn/ui (fully customizable)
- **Icons**: Lucide-React (thin 2px stroke)
- **Animations**: Framer Motion
- **Charts**: Recharts (clean & minimal)
- **Data Integration**: Read-only API with SAP

---

## 6. UI/UX Rules & Behavior

### A. Iconography
- **Library**: Lucide-React
- **Style**: Thin Stroke (2px). Matches Tajawal font.

### B. State UX (Loading & Data)
- **Loading**: Use Skeletons (not spinners). Mimic card/table layouts while fetching.
- **Empty States**: Faded icon + explanation + action button.
  - Example: "لا يوجد حوادث حالياً" + (Green Shield Icon) + [Report Incident button]

### C. Micro-interactions
- **Animations (Framer Motion)**:
  - Modals/Dialogs: Scale-up entry
  - Page Transitions: Natural fade-in
- **Hover Effects**: Color shift + Subtle Shadow + 2px upward lift

### D. Grid & Spacing
- **System**: 8px Grid System
- All gaps, paddings, and margins = multiples of 8 (8, 16, 24, 32...)

### E. Data Visualization
- **Library**: Recharts
- **Style**: Clean & Minimal
- No grid lines. Brand colors only. Tooltips: white card with 12px radius.

---

## 7. System Overview (Master Context)

**EHS Shield** (درع الحماية والامتثال) is a B2B SaaS platform for Egyptian factories to manage Environment, Health & Safety. It digitizes paperwork, tracks employee safety compliance, manages daily offline inspections via mobile, and automates Egyptian labor law requirements. Directly integrated with SAP for employee data sync.

---

## 8. User Roles & Access Control

### Role 1: Manager (Admin)
- Full control over the system
- Views the big picture
- Prints official government reports
- ONLY user who can add new users or manage SAP API sync

### Role 2: Department Head
- Operational engine
- Views dashboard for their department only
- Approves work permits digitally
- Investigates incidents

### Role 3: Safety Technician
- Field hero
- Uses Mobile App (offline mode supported)
- Answers inspection checklists
- Takes photos of violations
- Submits incident reports

---

## 9. The 9 Core Sections — User Flows & Business Logic

### 9.1 Login Screen — "البوابة" (The Gateway)
- **Flow**: Email + Password → SAP-linked auth → Role-based redirect
  - Manager → Full access
  - Department Head → Everything except user management
  - Technician → Redirected to mobile-focused tasks
- **UI**: Split screen. Left: industrial image with dark overlay + logo. Right: minimal login form.
- **Components**: shadcn Input, Button (Deep Navy), Checkbox "Remember Me"

### 9.2 Dashboard — "المراية" (The Mirror)
- **Flow**: Shows "How is the factory doing today?"
  - "Days without injuries" counter
  - Red/orange alerts (expiring fire extinguishers, outdated legal records)
  - Clicking any alert navigates to the relevant section
- **UI**: 4 KPI Cards (top row), Alerts Center (middle), Recharts bar chart for incidents by department (bottom)
- **Data**: Live KPIs pulled from system records

### 9.3 Workforce Hub — "العمود الفقري" (The Spine)
- **Flow**: All factory workers auto-synced from SAP
  - Search/filter employees
  - Employee Profile: training history, violations/penalties, incident history — all in one page
- **UI**: Data Table with columns: ID, Name, Department, Efficiency Score (progress bar), SAP Status tag
- **Toolbar**: Search bar, "Import from SAP" button, "Add Employee" button

### 9.4 Legal Records — "الدرع" (The Shield)
- **Flow**: The 10 mandatory government inspection records
  - Department Head enters data into tables
  - Manager presses "Print" → System generates official formatted PDF
- **UI**: Sidebar list of 10 records, main view: Data Table with date filters, "Export as Official PDF" primary button
- **Critical**: Must look documentation-heavy but clean

### 9.5 Incidents & Investigations — "المحقق" (The Investigator)
- **Flow**: Technician photographs incident (mobile) → uploads
  - Department Head receives alert → opens "Digital Investigation" (root causes, responsible parties)
  - System auto-generates "24-hour notification" form (legal requirement for labor office)
- **UI**: Vertical Timeline view (Under investigation → Root cause identified → Corrective action taken)
  - FAB: "Report New Incident"
  - Modal: location, time, severity, photo upload
  - Countdown timer for 24-hour legal deadline

### 9.6 Work Permits — "الإذن" (The Permission)
- **Flow**: Contractor/technician submits permit request for hazardous work (welding, heights, confined spaces)
  - Department Head reviews + approves
  - Without approval → System flags work as "illegal" in reports
- **UI**: Kanban Board with columns: New Request, Under Review, Approved, Expired
  - Cards: permit type icon, requester name, real-time countdown timer
  - Royal Blue for active, Red for expired

### 9.7 Audits & Inspections — "العين" (The Eye)
- **Flow**: Technician opens mobile app → answers checklist questions
  - Violation photos appear instantly on Department Head's web view
  - Department Head converts violation to a "Task" for maintenance
- **UI**: Left: active checklists list. Right: "Live Photo Gallery" with Before/After tags
  - Each violation card: "Assign to Maintenance" button
  - Grid-based, highly visual, high-contrast for failed points

### 9.8 Analytics & Reports — "الخلاصة" (The Summary)
- **Flow**: System aggregates all data → generates charts
  - Shows which department had most violations this month
  - Helps Manager decide where to increase oversight
- **UI**: Date range picker, "Generate Half-Yearly Statistics" button
  - 3 main charts: Line (accident trends), Pie (violation types), Heatmap (risk zones)
  - Minimal style, no grid lines, brand colors only

### 9.9 Team & Settings — "المطبخ" (The Kitchen)
- **Flow**: Admin-only screen
  - Add/manage Department Heads and Technicians
  - Manual SAP sync trigger
- **UI**: User table (name, role, permissions, actions: edit/reset/deactivate)
  - SAP Integration section: connection status (green pulse = live), last sync timestamp, "Sync Now" button

---

## 10. Critical Design Instructions

1. For every screen: consider **User Flow** (step-by-step from user's perspective with role restrictions), **Business Logic** (SAP connections, labor law triggers), and **UI/UX Details** (why specific components/colors/layouts are used).
2. Use Skeletons for all loading states.
3. Empty states must always have an icon + text + action button.
4. All charts: no grid lines, brand colors, white card tooltips with 12px radius.
5. Hover on interactive cards: color shift + subtle shadow + 2px upward lift.
6. Modals: scale-up entry animation. Page transitions: fade-in.
7. All spacing: multiples of 8px.
8. All border-radius: 12px.
9. Font: Tajawal everywhere.
10. Direction: RTL everywhere.
