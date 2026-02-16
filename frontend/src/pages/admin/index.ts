export { AdminOverviewDashboardPage } from './admin-overview-dashboard';
export { TenantListPage } from './tenant-list';
export { TenantDetailPage } from './tenant-detail';
export { SuspendActivateTenantPage } from './suspend-activate-tenant';
export { TenantUsageDetailsPage } from './tenant-usage-details';
export { PlansListPage } from './plans-list';
export { CreatePlanPage } from './create-plan';
export { EditPlanPage } from './edit-plan';
export { RevenueReportsPage } from './revenue-reports';
export { TransactionsListPage } from './transactions-list';
export { InvoiceManagementPage } from './invoice-management';
export { WhatsappAccountsListPage } from './whatsapp-accounts-list';
export { WebhookMonitoringPage } from './webhook-monitoring';
export { AiUsageOverviewPage } from './ai-usage-overview';
export { TokenConsumptionMonitoringPage } from './token-consumption-monitoring';
export { WorkflowMonitoringPage } from './workflow-monitoring';
export { AutomationErrorLogsPage } from './automation-error-logs';
export { AdminUsersListPage } from './admin-users-list';
export { RoleManagementPage } from './role-management';
export { GlobalSettingsPage } from './global-settings';
export { FeatureFlagsPage } from './feature-flags';
export { ApiLimitsPage } from './api-limits';
export { SystemLogsPage } from './system-logs';

import { AdminOverviewDashboardPage } from './admin-overview-dashboard';
import { TenantListPage } from './tenant-list';
import { TenantDetailPage } from './tenant-detail';
import { SuspendActivateTenantPage } from './suspend-activate-tenant';
import { TenantUsageDetailsPage } from './tenant-usage-details';
import { PlansListPage } from './plans-list';
import { CreatePlanPage } from './create-plan';
import { EditPlanPage } from './edit-plan';
import { RevenueReportsPage } from './revenue-reports';
import { TransactionsListPage } from './transactions-list';
import { InvoiceManagementPage } from './invoice-management';
import { WhatsappAccountsListPage } from './whatsapp-accounts-list';
import { WebhookMonitoringPage } from './webhook-monitoring';
import { AiUsageOverviewPage } from './ai-usage-overview';
import { TokenConsumptionMonitoringPage } from './token-consumption-monitoring';
import { WorkflowMonitoringPage } from './workflow-monitoring';
import { AutomationErrorLogsPage } from './automation-error-logs';
import { AdminUsersListPage } from './admin-users-list';
import { RoleManagementPage } from './role-management';
import { GlobalSettingsPage } from './global-settings';
import { FeatureFlagsPage } from './feature-flags';
import { ApiLimitsPage } from './api-limits';
import { SystemLogsPage } from './system-logs';

import type { ComponentType } from 'react';

export type ModuleRoute = { module: string; title: string; path: string; apiModule?: string; component: ComponentType };

export const adminModuleRoutes: ModuleRoute[] = [
  { module: 'Admin Dashboard', title: 'Admin Overview Dashboard', path: '/admin', apiModule: 'analytics', component: AdminOverviewDashboardPage },
  { module: 'Tenant Management', title: 'Tenant List', path: '/admin/tenants', apiModule: 'tenant', component: TenantListPage },
  { module: 'Tenant Management', title: 'Tenant Detail', path: '/admin/tenants/:id', apiModule: 'tenant', component: TenantDetailPage },
  { module: 'Tenant Management', title: 'Suspend / Activate Tenant', path: '/admin/tenants/:id/status', apiModule: 'tenant', component: SuspendActivateTenantPage },
  { module: 'Tenant Management', title: 'Tenant Usage Details', path: '/admin/tenants/:id/usage', apiModule: 'analytics', component: TenantUsageDetailsPage },
  { module: 'Plan Management', title: 'Plans List', path: '/admin/plans', apiModule: 'subscription', component: PlansListPage },
  { module: 'Plan Management', title: 'Create Plan', path: '/admin/plans/create', apiModule: 'subscription', component: CreatePlanPage },
  { module: 'Plan Management', title: 'Edit Plan', path: '/admin/plans/:id/edit', apiModule: 'subscription', component: EditPlanPage },
  { module: 'Billing Management', title: 'Revenue Reports', path: '/admin/billing/revenue-reports', apiModule: 'billing', component: RevenueReportsPage },
  { module: 'Billing Management', title: 'Transactions List', path: '/admin/billing/transactions', apiModule: 'billing', component: TransactionsListPage },
  { module: 'Billing Management', title: 'Invoice Management', path: '/admin/billing/invoices', apiModule: 'billing', component: InvoiceManagementPage },
  { module: 'WhatsApp Management', title: 'WhatsApp Accounts List', path: '/admin/whatsapp/accounts', apiModule: 'whatsapp', component: WhatsappAccountsListPage },
  { module: 'WhatsApp Management', title: 'Webhook Monitoring', path: '/admin/whatsapp/webhook-health', apiModule: 'webhook', component: WebhookMonitoringPage },
  { module: 'AI Management', title: 'AI Usage Overview', path: '/admin/ai/usage', apiModule: 'analytics', component: AiUsageOverviewPage },
  { module: 'AI Management', title: 'Token Consumption Monitoring', path: '/admin/ai/token-consumption', apiModule: 'analytics', component: TokenConsumptionMonitoringPage },
  { module: 'Automation Monitoring', title: 'Workflow Monitoring', path: '/admin/automation/monitoring', apiModule: 'automation', component: WorkflowMonitoringPage },
  { module: 'Automation Monitoring', title: 'Automation Error Logs', path: '/admin/automation/errors', apiModule: 'automation', component: AutomationErrorLogsPage },
  { module: 'User Management', title: 'Admin Users List', path: '/admin/users', apiModule: 'user', component: AdminUsersListPage },
  { module: 'User Management', title: 'Role Management', path: '/admin/users/roles', apiModule: 'permissions', component: RoleManagementPage },
  { module: 'System Settings', title: 'Global Settings', path: '/admin/settings/global', apiModule: 'tenant', component: GlobalSettingsPage },
  { module: 'System Settings', title: 'Feature Flags', path: '/admin/settings/feature-flags', apiModule: 'permissions', component: FeatureFlagsPage },
  { module: 'System Settings', title: 'API Limits', path: '/admin/settings/api-limits', apiModule: 'subscription', component: ApiLimitsPage },
  { module: 'System Settings', title: 'System Logs', path: '/admin/settings/system-logs', apiModule: 'analytics', component: SystemLogsPage },
];
