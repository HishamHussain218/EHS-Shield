// ============================================
// EHS Shield — Mock Data Layer
// Simulates SAP-synced data for all 9 sections
// ============================================

// ── Departments ──
export const departments = [
  { id: 1, name: 'قسم الإنتاج', nameEn: 'Production' },
  { id: 2, name: 'قسم الصيانة', nameEn: 'Maintenance' },
  { id: 3, name: 'قسم المخازن', nameEn: 'Warehousing' },
  { id: 4, name: 'قسم الجودة', nameEn: 'Quality' },
  { id: 5, name: 'قسم السلامة', nameEn: 'Safety' },
  { id: 6, name: 'قسم الإدارة', nameEn: 'Administration' },
]

// ── Employees (SAP-synced) ──
export const employees = [
  { id: 'SAP-1001', name: 'أحمد محمد علي', department: 'قسم الإنتاج', position: 'مشغل آلات', efficiency: 92, sapStatus: 'verified', joinDate: '2022-03-15', phone: '0101-xxx-xxxx', trainings: 5, violations: 1, incidents: 0 },
  { id: 'SAP-1002', name: 'محمود حسن إبراهيم', department: 'قسم الصيانة', position: 'فني كهرباء', efficiency: 88, sapStatus: 'verified', joinDate: '2021-07-20', phone: '0112-xxx-xxxx', trainings: 8, violations: 0, incidents: 1 },
  { id: 'SAP-1003', name: 'خالد عبدالرحمن', department: 'قسم الإنتاج', position: 'مشرف خط إنتاج', efficiency: 95, sapStatus: 'verified', joinDate: '2019-11-01', phone: '0100-xxx-xxxx', trainings: 12, violations: 0, incidents: 0 },
  { id: 'SAP-1004', name: 'يوسف سعيد محمد', department: 'قسم المخازن', position: 'أمين مخزن', efficiency: 78, sapStatus: 'pending', joinDate: '2023-01-10', phone: '0115-xxx-xxxx', trainings: 3, violations: 2, incidents: 0 },
  { id: 'SAP-1005', name: 'عمر فاروق أحمد', department: 'قسم الجودة', position: 'مفتش جودة', efficiency: 91, sapStatus: 'verified', joinDate: '2020-05-22', phone: '0106-xxx-xxxx', trainings: 7, violations: 0, incidents: 0 },
  { id: 'SAP-1006', name: 'حسين علي محمود', department: 'قسم السلامة', position: 'فني سلامة', efficiency: 97, sapStatus: 'verified', joinDate: '2018-09-14', phone: '0109-xxx-xxxx', trainings: 15, violations: 0, incidents: 2 },
  { id: 'SAP-1007', name: 'طارق مصطفى', department: 'قسم الإنتاج', position: 'عامل إنتاج', efficiency: 72, sapStatus: 'verified', joinDate: '2023-06-01', phone: '0111-xxx-xxxx', trainings: 2, violations: 3, incidents: 1 },
  { id: 'SAP-1008', name: 'سامي كمال الدين', department: 'قسم الصيانة', position: 'فني ميكانيكا', efficiency: 85, sapStatus: 'verified', joinDate: '2021-02-28', phone: '0102-xxx-xxxx', trainings: 6, violations: 1, incidents: 0 },
  { id: 'SAP-1009', name: 'مصطفى عادل', department: 'قسم المخازن', position: 'مساعد مخزن', efficiency: 81, sapStatus: 'pending', joinDate: '2024-01-15', phone: '0114-xxx-xxxx', trainings: 1, violations: 0, incidents: 0 },
  { id: 'SAP-1010', name: 'إبراهيم عبدالله', department: 'قسم الإدارة', position: 'مسؤول موارد بشرية', efficiency: 90, sapStatus: 'verified', joinDate: '2020-08-10', phone: '0103-xxx-xxxx', trainings: 4, violations: 0, incidents: 0 },
]

// ── Training Records ──
export const trainings = [
  { id: 1, employeeId: 'SAP-1001', title: 'السلامة من الحرائق', date: '2025-12-10', status: 'completed', score: 88 },
  { id: 2, employeeId: 'SAP-1001', title: 'التعامل مع المواد الكيميائية', date: '2026-01-15', status: 'completed', score: 92 },
  { id: 3, employeeId: 'SAP-1002', title: 'السلامة الكهربائية', date: '2026-02-20', status: 'completed', score: 95 },
  { id: 4, employeeId: 'SAP-1003', title: 'إدارة المخاطر', date: '2026-03-05', status: 'completed', score: 90 },
  { id: 5, employeeId: 'SAP-1006', title: 'الإسعافات الأولية المتقدمة', date: '2026-03-18', status: 'completed', score: 98 },
  { id: 6, employeeId: 'SAP-1007', title: 'السلامة من الحرائق', date: '2026-04-01', status: 'pending', score: null },
]

// ── Violations / Penalties ──
export const violations = [
  { id: 1, employeeId: 'SAP-1001', type: 'عدم ارتداء معدات الوقاية', date: '2026-02-14', severity: 'medium', penalty: 'إنذار كتابي' },
  { id: 2, employeeId: 'SAP-1004', type: 'التدخين في منطقة محظورة', date: '2026-01-20', severity: 'high', penalty: 'خصم يوم' },
  { id: 3, employeeId: 'SAP-1004', type: 'عدم الالتزام بإجراءات السلامة', date: '2026-03-10', severity: 'medium', penalty: 'إنذار شفهي' },
  { id: 4, employeeId: 'SAP-1007', type: 'التأخر عن جولة التفتيش', date: '2026-02-28', severity: 'low', penalty: 'تنبيه' },
  { id: 5, employeeId: 'SAP-1007', type: 'عدم ارتداء معدات الوقاية', date: '2026-03-22', severity: 'high', penalty: 'خصم يومين' },
  { id: 6, employeeId: 'SAP-1007', type: 'إهمال في التقرير اليومي', date: '2026-04-05', severity: 'low', penalty: 'تنبيه' },
  { id: 7, employeeId: 'SAP-1008', type: 'تجاوز منطقة  الخطر', date: '2026-03-15', severity: 'medium', penalty: 'إنذار كتابي' },
]

// ── Incidents ──
export const incidents = [
  { id: 'INC-001', title: 'إصابة يد أثناء تشغيل آلة القطع', location: 'خط الإنتاج 3', date: '2026-04-18', time: '09:30', severity: 'high', status: 'investigating', reportedBy: 'SAP-1006', department: 'قسم الإنتاج', description: 'تعرض العامل لإصابة في إصبعين من اليد اليمنى أثناء تشغيل آلة القطع بدون واقي الأمان.', rootCause: 'عدم تركيب واقي الأمان على الآلة', correctiveAction: 'تركيب واقيات أمان على جميع آلات القطع', notified24h: true },
  { id: 'INC-002', title: 'انزلاق عامل في منطقة المخازن', location: 'المخزن الرئيسي', date: '2026-04-15', time: '14:00', severity: 'medium', status: 'resolved', reportedBy: 'SAP-1004', department: 'قسم المخازن', description: 'انزلق العامل بسبب تسرب زيت على أرضية المخزن مما أدى لإصابة خفيفة في الظهر.', rootCause: 'تسرب زيت من رافعة شوكية', correctiveAction: 'صيانة الرافعة وتنظيف الأرضية بمواد مانعة للانزلاق', notified24h: true },
  { id: 'INC-003', title: 'تسرب غاز من خط الأنابيب', location: 'وحدة المعالجة الكيميائية', date: '2026-04-12', time: '06:45', severity: 'critical', status: 'resolved', reportedBy: 'SAP-1006', department: 'قسم الصيانة', description: 'تم اكتشاف تسرب غاز من وصلة في خط أنابيب وحدة المعالجة. تم إخلاء المنطقة فوراً.', rootCause: 'تآكل في وصلة الأنبوب', correctiveAction: 'استبدال جميع الوصلات القديمة وجدولة فحص دوري', notified24h: true },
  { id: 'INC-004', title: 'سقوط عدة من ارتفاع', location: 'ورشة الصيانة', date: '2026-04-08', time: '11:15', severity: 'low', status: 'resolved', reportedBy: 'SAP-1008', department: 'قسم الصيانة', description: 'سقطت مفتاح ربط من الطابق الثاني أثناء أعمال صيانة. لم تحدث إصابات.', rootCause: 'عدم استخدام حبل تثبيت العدد', correctiveAction: 'إلزام جميع الفنيين باستخدام أحبال تثبيت العدد', notified24h: false },
]

// ── Work Permits ──
export const workPermits = [
  { id: 'WP-001', type: 'hot-work', typeLabel: 'أعمال لحام', requester: 'محمود حسن إبراهيم', department: 'قسم الصيانة', location: 'ورشة الصيانة - المبنى B', status: 'approved', createdAt: '2026-04-19', expiresAt: '2026-04-21', approvedBy: 'خالد عبدالرحمن' },
  { id: 'WP-002', type: 'heights', typeLabel: 'العمل على ارتفاعات', requester: 'سامي كمال الدين', department: 'قسم الصيانة', location: 'سقف المصنع - الجناح الشرقي', status: 'review', createdAt: '2026-04-20', expiresAt: null, approvedBy: null },
  { id: 'WP-003', type: 'confined', typeLabel: 'الأماكن المحصورة', requester: 'أحمد محمد علي', department: 'قسم الإنتاج', location: 'خزان المعالجة رقم 5', status: 'new', createdAt: '2026-04-20', expiresAt: null, approvedBy: null },
  { id: 'WP-004', type: 'hot-work', typeLabel: 'أعمال لحام', requester: 'طارق مصطفى', department: 'قسم الإنتاج', location: 'خط الإنتاج 2', status: 'expired', createdAt: '2026-04-10', expiresAt: '2026-04-12', approvedBy: 'خالد عبدالرحمن' },
  { id: 'WP-005', type: 'heights', typeLabel: 'العمل على ارتفاعات', requester: 'حسين علي محمود', department: 'قسم السلامة', location: 'برج التبريد', status: 'approved', createdAt: '2026-04-18', expiresAt: '2026-04-22', approvedBy: 'خالد عبدالرحمن' },
]

// ── Audits / Inspections ──
export const audits = [
  { id: 'AUD-001', title: 'تفتيش السلامة من الحرائق', area: 'المبنى الرئيسي', date: '2026-04-20', inspector: 'حسين علي محمود', completion: 85, status: 'in-progress', totalItems: 20, passedItems: 17, failedItems: 3 },
  { id: 'AUD-002', title: 'فحص معدات الوقاية الشخصية', area: 'خط الإنتاج', date: '2026-04-19', inspector: 'حسين علي محمود', completion: 100, status: 'completed', totalItems: 15, passedItems: 13, failedItems: 2 },
  { id: 'AUD-003', title: 'تفتيش النظافة والترتيب (5S)', area: 'المخازن', date: '2026-04-18', inspector: 'حسين علي محمود', completion: 100, status: 'completed', totalItems: 25, passedItems: 22, failedItems: 3 },
  { id: 'AUD-004', title: 'فحص أنظمة الإطفاء', area: 'جميع المباني', date: '2026-04-17', inspector: 'حسين علي محمود', completion: 60, status: 'in-progress', totalItems: 30, passedItems: 18, failedItems: 4 },
]

export const auditViolations = [
  { id: 'AV-001', auditId: 'AUD-001', description: 'طفاية حريق منتهية الصلاحية', location: 'الطابق الثاني - الممر الشرقي', severity: 'high', status: 'open', photoUrl: null, assignedTo: null },
  { id: 'AV-002', auditId: 'AUD-001', description: 'مخرج طوارئ مسدود بمعدات', location: 'المبنى الرئيسي - الباب الخلفي', severity: 'critical', status: 'assigned', photoUrl: null, assignedTo: 'قسم الصيانة' },
  { id: 'AV-003', auditId: 'AUD-002', description: 'عامل بدون نظارات واقية', location: 'خط الإنتاج 1', severity: 'medium', status: 'resolved', photoUrl: null, assignedTo: null },
  { id: 'AV-004', auditId: 'AUD-003', description: 'مواد كيميائية مخزنة بشكل خاطئ', location: 'المخزن الفرعي B', severity: 'high', status: 'open', photoUrl: null, assignedTo: null },
  { id: 'AV-005', auditId: 'AUD-004', description: 'كاشف دخان معطل', location: 'مكتب الإدارة', severity: 'high', status: 'assigned', photoUrl: null, assignedTo: 'قسم الصيانة' },
]

// ── Legal Records (10 mandatory government records) ──
export const legalRecordTypes = [
  { id: 1, name: 'سجل إصابات العمل', icon: 'FileWarning' },
  { id: 2, name: 'سجل الكشف الطبي الدوري', icon: 'Stethoscope' },
  { id: 3, name: 'سجل التدريب على السلامة', icon: 'GraduationCap' },
  { id: 4, name: 'سجل الحوادث الجسيمة', icon: 'AlertOctagon' },
  { id: 5, name: 'سجل المواد الخطرة', icon: 'FlaskConical' },
  { id: 6, name: 'سجل معدات الوقاية الشخصية', icon: 'HardHat' },
  { id: 7, name: 'سجل تصاريح العمل', icon: 'ClipboardCheck' },
  { id: 8, name: 'سجل التفتيش اليومي', icon: 'SearchCheck' },
  { id: 9, name: 'سجل أنظمة الإطفاء', icon: 'Flame' },
  { id: 10, name: 'سجل الأمن الصناعي', icon: 'Shield' },
]

export const legalRecords = [
  { id: 1, recordTypeId: 1, date: '2026-04-18', description: 'إصابة يد — خط الإنتاج 3', employee: 'أحمد محمد علي', status: 'documented', notes: 'تم إرسال إخطار 24 ساعة' },
  { id: 2, recordTypeId: 1, date: '2026-04-15', description: 'انزلاق — المخزن الرئيسي', employee: 'يوسف سعيد محمد', status: 'documented', notes: 'إصابة خفيفة' },
  { id: 3, recordTypeId: 2, date: '2026-04-01', description: 'كشف طبي دوري — دفعة أبريل', employee: 'جميع الموظفين', status: 'completed', notes: '148 موظف تم الكشف عليهم' },
  { id: 4, recordTypeId: 3, date: '2026-03-28', description: 'تدريب السلامة من الحرائق', employee: 'دفعة 12 موظف', status: 'completed', notes: 'نسبة النجاح 100%' },
  { id: 5, recordTypeId: 9, date: '2026-04-10', description: 'فحص طفايات الحريق — المبنى A', employee: 'حسين علي محمود', status: 'needs-action', notes: '3 طفايات منتهية الصلاحية' },
]

// ── Dashboard Alerts ──
export const alerts = [
  { id: 1, type: 'danger', title: 'طفايات حريق منتهية الصلاحية', description: '3 طفايات في المبنى A تحتاج استبدال فوري', section: '/audits', date: '2026-04-20' },
  { id: 2, type: 'danger', title: 'إخطار 24 ساعة معلق', description: 'حادثة INC-001 لم يتم إرسال الإخطار القانوني بعد', section: '/incidents', date: '2026-04-18' },
  { id: 3, type: 'warning', title: 'تصريح عمل سينتهي غداً', description: 'تصريح لحام WP-001 ينتهي يوم 21 أبريل', section: '/permits', date: '2026-04-20' },
  { id: 4, type: 'warning', title: 'كشف طبي متأخر', description: '12 موظف لم يتم الكشف عليهم هذا الشهر', section: '/legal', date: '2026-04-20' },
  { id: 5, type: 'warning', title: 'تدريب سلامة معلق', description: 'طارق مصطفى — تدريب السلامة من الحرائق متأخر', section: '/workforce', date: '2026-04-15' },
]

// ── Dashboard KPIs ──
export const dashboardKPIs = {
  daysWithoutInjury: 2,
  activePermits: 2,
  complianceRate: 94.2,
  pendingAudits: 2,
  totalWorkforce: 1482,
  activeAlerts: 5,
}

// ── Chart Data ──
export const monthlyComplianceData = [
  { month: 'يناير', compliance: 89, incidents: 3 },
  { month: 'فبراير', compliance: 91, incidents: 2 },
  { month: 'مارس', compliance: 87, incidents: 4 },
  { month: 'أبريل', compliance: 94, incidents: 1 },
  { month: 'مايو', compliance: 92, incidents: 2 },
  { month: 'يونيو', compliance: 96, incidents: 0 },
]

// ── Daily EHS Data (90 days) — For Interactive Area Chart ──
export const dailyEHSData = [
  { date: '2026-02-01', compliance: 88, incidents: 2 },
  { date: '2026-02-02', compliance: 89, incidents: 1 },
  { date: '2026-02-03', compliance: 87, incidents: 3 },
  { date: '2026-02-04', compliance: 90, incidents: 1 },
  { date: '2026-02-05', compliance: 91, incidents: 0 },
  { date: '2026-02-06', compliance: 89, incidents: 2 },
  { date: '2026-02-07', compliance: 88, incidents: 1 },
  { date: '2026-02-08', compliance: 92, incidents: 0 },
  { date: '2026-02-09', compliance: 93, incidents: 1 },
  { date: '2026-02-10', compliance: 90, incidents: 2 },
  { date: '2026-02-11', compliance: 91, incidents: 0 },
  { date: '2026-02-12', compliance: 89, incidents: 1 },
  { date: '2026-02-13', compliance: 87, incidents: 3 },
  { date: '2026-02-14', compliance: 85, incidents: 4 },
  { date: '2026-02-15', compliance: 86, incidents: 2 },
  { date: '2026-02-16', compliance: 88, incidents: 1 },
  { date: '2026-02-17', compliance: 90, incidents: 0 },
  { date: '2026-02-18', compliance: 92, incidents: 1 },
  { date: '2026-02-19', compliance: 91, incidents: 0 },
  { date: '2026-02-20', compliance: 93, incidents: 1 },
  { date: '2026-02-21', compliance: 94, incidents: 0 },
  { date: '2026-02-22', compliance: 92, incidents: 1 },
  { date: '2026-02-23', compliance: 90, incidents: 2 },
  { date: '2026-02-24', compliance: 88, incidents: 3 },
  { date: '2026-02-25', compliance: 89, incidents: 1 },
  { date: '2026-02-26', compliance: 91, incidents: 0 },
  { date: '2026-02-27', compliance: 93, incidents: 1 },
  { date: '2026-02-28', compliance: 92, incidents: 0 },
  { date: '2026-03-01', compliance: 90, incidents: 2 },
  { date: '2026-03-02', compliance: 88, incidents: 3 },
  { date: '2026-03-03', compliance: 86, incidents: 4 },
  { date: '2026-03-04', compliance: 85, incidents: 3 },
  { date: '2026-03-05', compliance: 87, incidents: 2 },
  { date: '2026-03-06', compliance: 89, incidents: 1 },
  { date: '2026-03-07', compliance: 88, incidents: 2 },
  { date: '2026-03-08', compliance: 90, incidents: 1 },
  { date: '2026-03-09', compliance: 91, incidents: 0 },
  { date: '2026-03-10', compliance: 89, incidents: 2 },
  { date: '2026-03-11', compliance: 87, incidents: 3 },
  { date: '2026-03-12', compliance: 85, incidents: 5 },
  { date: '2026-03-13', compliance: 84, incidents: 4 },
  { date: '2026-03-14', compliance: 86, incidents: 2 },
  { date: '2026-03-15', compliance: 88, incidents: 1 },
  { date: '2026-03-16', compliance: 90, incidents: 0 },
  { date: '2026-03-17', compliance: 91, incidents: 1 },
  { date: '2026-03-18', compliance: 89, incidents: 2 },
  { date: '2026-03-19', compliance: 88, incidents: 1 },
  { date: '2026-03-20', compliance: 90, incidents: 0 },
  { date: '2026-03-21', compliance: 92, incidents: 1 },
  { date: '2026-03-22', compliance: 91, incidents: 2 },
  { date: '2026-03-23', compliance: 89, incidents: 3 },
  { date: '2026-03-24', compliance: 87, incidents: 4 },
  { date: '2026-03-25', compliance: 86, incidents: 2 },
  { date: '2026-03-26', compliance: 88, incidents: 1 },
  { date: '2026-03-27', compliance: 90, incidents: 0 },
  { date: '2026-03-28', compliance: 92, incidents: 1 },
  { date: '2026-03-29', compliance: 93, incidents: 0 },
  { date: '2026-03-30', compliance: 91, incidents: 1 },
  { date: '2026-03-31', compliance: 90, incidents: 2 },
  { date: '2026-04-01', compliance: 92, incidents: 1 },
  { date: '2026-04-02', compliance: 93, incidents: 0 },
  { date: '2026-04-03', compliance: 94, incidents: 1 },
  { date: '2026-04-04', compliance: 95, incidents: 0 },
  { date: '2026-04-05', compliance: 93, incidents: 1 },
  { date: '2026-04-06', compliance: 91, incidents: 2 },
  { date: '2026-04-07', compliance: 90, incidents: 3 },
  { date: '2026-04-08', compliance: 92, incidents: 1 },
  { date: '2026-04-09', compliance: 94, incidents: 0 },
  { date: '2026-04-10', compliance: 95, incidents: 1 },
  { date: '2026-04-11', compliance: 96, incidents: 0 },
  { date: '2026-04-12', compliance: 93, incidents: 2 },
  { date: '2026-04-13', compliance: 91, incidents: 3 },
  { date: '2026-04-14', compliance: 92, incidents: 1 },
  { date: '2026-04-15', compliance: 94, incidents: 0 },
  { date: '2026-04-16', compliance: 95, incidents: 1 },
  { date: '2026-04-17', compliance: 96, incidents: 0 },
  { date: '2026-04-18', compliance: 94, incidents: 2 },
  { date: '2026-04-19', compliance: 93, incidents: 1 },
  { date: '2026-04-20', compliance: 95, incidents: 0 },
  { date: '2026-04-21', compliance: 96, incidents: 0 },
]

export const incidentsByDepartment = [
  { department: 'الإنتاج', count: 8 },
  { department: 'الصيانة', count: 5 },
  { department: 'المخازن', count: 3 },
  { department: 'الجودة', count: 1 },
  { department: 'السلامة', count: 0 },
  { department: 'الإدارة', count: 0 },
]

export const violationTypes = [
  { type: 'عدم ارتداء معدات الوقاية', count: 12 },
  { type: 'التدخين في مناطق محظورة', count: 5 },
  { type: 'تجاوز مناطق الخطر', count: 8 },
  { type: 'إهمال في التقارير', count: 3 },
  { type: 'عدم الالتزام بالتصاريح', count: 4 },
]

// ── Team / Users ──
export const systemUsers = [
  { id: 1, name: 'هشام حسين', email: 'hisham@ehsshield.com', role: 'admin', department: 'الإدارة العامة', status: 'active', lastLogin: '2026-04-20T21:00:00' },
  { id: 2, name: 'خالد عبدالرحمن', email: 'khaled@ehsshield.com', role: 'head', department: 'قسم الإنتاج', status: 'active', lastLogin: '2026-04-20T18:30:00' },
  { id: 3, name: 'حسين علي محمود', email: 'hussein@ehsshield.com', role: 'technician', department: 'قسم السلامة', status: 'active', lastLogin: '2026-04-20T20:15:00' },
  { id: 4, name: 'محمد أنور', email: 'anwar@ehsshield.com', role: 'head', department: 'قسم الصيانة', status: 'active', lastLogin: '2026-04-19T16:00:00' },
  { id: 5, name: 'سمير حسن', email: 'samir@ehsshield.com', role: 'technician', department: 'قسم السلامة', status: 'inactive', lastLogin: '2026-04-10T09:00:00' },
]

// ── SAP Sync Status ──
export const sapSyncStatus = {
  connected: true,
  lastSync: '2026-04-20T19:30:00',
  employeesSynced: 1482,
  nextScheduledSync: '2026-04-21T06:00:00',
}
