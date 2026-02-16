export { DashboardOverviewPage } from './dashboard-overview';
export { ConversationsListPage } from './conversations-list';
export { ConversationDetailChatPagePage } from './conversation-detail-chat-page';
export { WhatsappAccountsListPage } from './whatsapp-accounts-list';
export { ConnectWhatsappAccountPage } from './connect-whatsapp-account';
export { WhatsappAccountDetailsPage } from './whatsapp-account-details';
export { WhatsappTemplateManagementPage } from './whatsapp-template-management';
export { MessageLogsPage } from './message-logs';
export { AiSettingsPage } from './ai-settings';
export { AiPlaygroundPage } from './ai-playground';
export { AiUsageAnalyticsPage } from './ai-usage-analytics';
export { KnowledgeBaseListPage } from './knowledge-base-list';
export { CreateKnowledgeBasePage } from './create-knowledge-base';
export { KnowledgeEntriesListPage } from './knowledge-entries-list';
export { CreateKnowledgeEntryPage } from './create-knowledge-entry';
export { EditKnowledgeEntryPage } from './edit-knowledge-entry';
export { WorkflowListPage } from './workflow-list';
export { CreateWorkflowPage } from './create-workflow';
export { WorkflowEditorPage } from './workflow-editor';
export { WorkflowLogsPage } from './workflow-logs';
export { ContactsListPage } from './contacts-list';
export { ContactDetailPage } from './contact-detail';
export { ImportContactsPage } from './import-contacts';
export { ExportContactsPage } from './export-contacts';
export { CampaignListPage } from './campaign-list';
export { CreateCampaignPage } from './create-campaign';
export { CampaignAnalyticsPage } from './campaign-analytics';
export { MessageAnalyticsPage } from './message-analytics';
export { AiAnalyticsPage } from './ai-analytics';
export { AutomationAnalyticsPage } from './automation-analytics';
export { AgentPerformanceAnalyticsPage } from './agent-performance-analytics';
export { CurrentPlanPage } from './current-plan';
export { UpgradePlanPage } from './upgrade-plan';
export { UsageLimitsPage } from './usage-limits';
export { InvoiceHistoryPage } from './invoice-history';
export { PaymentMethodsPage } from './payment-methods';
export { TeamMembersListPage } from './team-members-list';
export { InviteTeamMemberPage } from './invite-team-member';
export { RolesPermissionsPage } from './roles-permissions';
export { CompanyProfilePage } from './company-profile';
export { ApiKeysPage } from './api-keys';
export { WebhookSettingsPage } from './webhook-settings';
export { SecuritySettingsPage } from './security-settings';
export { NotificationSettingsPage } from './notification-settings';

import { DashboardOverviewPage } from './dashboard-overview';
import { ConversationsListPage } from './conversations-list';
import { ConversationDetailChatPagePage } from './conversation-detail-chat-page';
import { WhatsappAccountsListPage } from './whatsapp-accounts-list';
import { ConnectWhatsappAccountPage } from './connect-whatsapp-account';
import { WhatsappAccountDetailsPage } from './whatsapp-account-details';
import { WhatsappTemplateManagementPage } from './whatsapp-template-management';
import { MessageLogsPage } from './message-logs';
import { AiSettingsPage } from './ai-settings';
import { AiPlaygroundPage } from './ai-playground';
import { AiUsageAnalyticsPage } from './ai-usage-analytics';
import { KnowledgeBaseListPage } from './knowledge-base-list';
import { CreateKnowledgeBasePage } from './create-knowledge-base';
import { KnowledgeEntriesListPage } from './knowledge-entries-list';
import { CreateKnowledgeEntryPage } from './create-knowledge-entry';
import { EditKnowledgeEntryPage } from './edit-knowledge-entry';
import { WorkflowListPage } from './workflow-list';
import { CreateWorkflowPage } from './create-workflow';
import { WorkflowEditorPage } from './workflow-editor';
import { WorkflowLogsPage } from './workflow-logs';
import { ContactsListPage } from './contacts-list';
import { ContactDetailPage } from './contact-detail';
import { ImportContactsPage } from './import-contacts';
import { ExportContactsPage } from './export-contacts';
import { CampaignListPage } from './campaign-list';
import { CreateCampaignPage } from './create-campaign';
import { CampaignAnalyticsPage } from './campaign-analytics';
import { MessageAnalyticsPage } from './message-analytics';
import { AiAnalyticsPage } from './ai-analytics';
import { AutomationAnalyticsPage } from './automation-analytics';
import { AgentPerformanceAnalyticsPage } from './agent-performance-analytics';
import { CurrentPlanPage } from './current-plan';
import { UpgradePlanPage } from './upgrade-plan';
import { UsageLimitsPage } from './usage-limits';
import { InvoiceHistoryPage } from './invoice-history';
import { PaymentMethodsPage } from './payment-methods';
import { TeamMembersListPage } from './team-members-list';
import { InviteTeamMemberPage } from './invite-team-member';
import { RolesPermissionsPage } from './roles-permissions';
import { CompanyProfilePage } from './company-profile';
import { ApiKeysPage } from './api-keys';
import { WebhookSettingsPage } from './webhook-settings';
import { SecuritySettingsPage } from './security-settings';
import { NotificationSettingsPage } from './notification-settings';

import type { ComponentType } from 'react';

export type ModuleRoute = { module: string; title: string; path: string; apiModule?: string; component: ComponentType };

export const tenantModuleRoutes: ModuleRoute[] = [
  { module: 'Dashboard', title: 'Dashboard Overview', path: '/app/dashboard', apiModule: 'analytics', component: DashboardOverviewPage },
  { module: 'Conversations', title: 'Conversations List', path: '/app/conversations', apiModule: 'conversations', component: ConversationsListPage },
  { module: 'Conversations', title: 'Conversation Detail (Chat Page)', path: '/app/conversations/:id', apiModule: 'messages', component: ConversationDetailChatPagePage },
  { module: 'WhatsApp', title: 'WhatsApp Accounts List', path: '/app/whatsapp/accounts', apiModule: 'whatsapp', component: WhatsappAccountsListPage },
  { module: 'WhatsApp', title: 'Connect WhatsApp Account', path: '/app/whatsapp/connect', apiModule: 'whatsapp', component: ConnectWhatsappAccountPage },
  { module: 'WhatsApp', title: 'WhatsApp Account Details', path: '/app/whatsapp/accounts/:id', apiModule: 'whatsapp', component: WhatsappAccountDetailsPage },
  { module: 'WhatsApp', title: 'WhatsApp Template Management', path: '/app/whatsapp/templates', apiModule: 'messages', component: WhatsappTemplateManagementPage },
  { module: 'WhatsApp', title: 'Message Logs', path: '/app/whatsapp/logs', apiModule: 'messages', component: MessageLogsPage },
  { module: 'AI Bot', title: 'AI Settings', path: '/app/ai/settings', apiModule: 'ai', component: AiSettingsPage },
  { module: 'AI Bot', title: 'AI Playground', path: '/app/ai/playground', apiModule: 'ai', component: AiPlaygroundPage },
  { module: 'AI Bot', title: 'AI Usage Analytics', path: '/app/ai/usage', apiModule: 'analytics', component: AiUsageAnalyticsPage },
  { module: 'Knowledge Base', title: 'Knowledge Base List', path: '/app/knowledge', apiModule: 'knowledge', component: KnowledgeBaseListPage },
  { module: 'Knowledge Base', title: 'Create Knowledge Base', path: '/app/knowledge/create', apiModule: 'knowledge', component: CreateKnowledgeBasePage },
  { module: 'Knowledge Base', title: 'Knowledge Entries List', path: '/app/knowledge/:id/entries', apiModule: 'knowledge', component: KnowledgeEntriesListPage },
  { module: 'Knowledge Base', title: 'Create Knowledge Entry', path: '/app/knowledge/:id/entries/create', apiModule: 'knowledge', component: CreateKnowledgeEntryPage },
  { module: 'Knowledge Base', title: 'Edit Knowledge Entry', path: '/app/knowledge/:id/entries/:entryId/edit', apiModule: 'knowledge', component: EditKnowledgeEntryPage },
  { module: 'Automation', title: 'Workflow List', path: '/app/automation/workflows', apiModule: 'automation', component: WorkflowListPage },
  { module: 'Automation', title: 'Create Workflow', path: '/app/automation/workflows/create', apiModule: 'automation', component: CreateWorkflowPage },
  { module: 'Automation', title: 'Workflow Editor', path: '/app/automation/workflows/:id/editor', apiModule: 'automation', component: WorkflowEditorPage },
  { module: 'Automation', title: 'Workflow Logs', path: '/app/automation/logs', apiModule: 'automation', component: WorkflowLogsPage },
  { module: 'Contacts', title: 'Contacts List', path: '/app/contacts', apiModule: 'user', component: ContactsListPage },
  { module: 'Contacts', title: 'Contact Detail', path: '/app/contacts/:id', apiModule: 'user', component: ContactDetailPage },
  { module: 'Contacts', title: 'Import Contacts', path: '/app/contacts/import', apiModule: 'user', component: ImportContactsPage },
  { module: 'Contacts', title: 'Export Contacts', path: '/app/contacts/export', apiModule: 'user', component: ExportContactsPage },
  { module: 'Campaigns', title: 'Campaign List', path: '/app/campaigns', apiModule: 'messages', component: CampaignListPage },
  { module: 'Campaigns', title: 'Create Campaign', path: '/app/campaigns/create', apiModule: 'messages', component: CreateCampaignPage },
  { module: 'Campaigns', title: 'Campaign Analytics', path: '/app/campaigns/analytics', apiModule: 'analytics', component: CampaignAnalyticsPage },
  { module: 'Analytics', title: 'Message Analytics', path: '/app/analytics/messages', apiModule: 'analytics', component: MessageAnalyticsPage },
  { module: 'Analytics', title: 'AI Analytics', path: '/app/analytics/ai', apiModule: 'analytics', component: AiAnalyticsPage },
  { module: 'Analytics', title: 'Automation Analytics', path: '/app/analytics/automation', apiModule: 'analytics', component: AutomationAnalyticsPage },
  { module: 'Analytics', title: 'Agent Performance Analytics', path: '/app/analytics/agents', apiModule: 'analytics', component: AgentPerformanceAnalyticsPage },
  { module: 'Billing', title: 'Current Plan', path: '/app/billing/current-plan', apiModule: 'billing', component: CurrentPlanPage },
  { module: 'Billing', title: 'Upgrade Plan', path: '/app/billing/upgrade', apiModule: 'subscription', component: UpgradePlanPage },
  { module: 'Billing', title: 'Usage & Limits', path: '/app/billing/usage-limits', apiModule: 'subscription', component: UsageLimitsPage },
  { module: 'Billing', title: 'Invoice History', path: '/app/billing/invoices', apiModule: 'billing', component: InvoiceHistoryPage },
  { module: 'Billing', title: 'Payment Methods', path: '/app/billing/payment-methods', apiModule: 'billing', component: PaymentMethodsPage },
  { module: 'Team Management', title: 'Team Members List', path: '/app/team/members', apiModule: 'user', component: TeamMembersListPage },
  { module: 'Team Management', title: 'Invite Team Member', path: '/app/team/invite', apiModule: 'user', component: InviteTeamMemberPage },
  { module: 'Team Management', title: 'Roles & Permissions', path: '/app/team/roles-permissions', apiModule: 'permissions', component: RolesPermissionsPage },
  { module: 'Settings', title: 'Company Profile', path: '/app/settings/company-profile', apiModule: 'tenant', component: CompanyProfilePage },
  { module: 'Settings', title: 'API Keys', path: '/app/settings/api-keys', apiModule: 'tenant', component: ApiKeysPage },
  { module: 'Settings', title: 'Webhook Settings', path: '/app/settings/webhooks', apiModule: 'webhook', component: WebhookSettingsPage },
  { module: 'Settings', title: 'Security Settings', path: '/app/settings/security', apiModule: 'tenant', component: SecuritySettingsPage },
  { module: 'Settings', title: 'Notification Settings', path: '/app/settings/notifications', apiModule: 'tenant', component: NotificationSettingsPage },
];
