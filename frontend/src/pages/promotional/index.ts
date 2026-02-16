export { HomePage } from './home';
export { FeaturesOverviewPage } from './features-overview';
export { WhatsappAutomationFeaturePage } from './whatsapp-automation-feature';
export { AiChatbotFeaturePage } from './ai-chatbot-feature';
export { WorkflowAutomationFeaturePage } from './workflow-automation-feature';
export { SharedInboxFeaturePage } from './shared-inbox-feature';
export { KnowledgeBaseFeaturePage } from './knowledge-base-feature';
export { PricingPlansPage } from './pricing-plans';
export { ComparePlansPage } from './compare-plans';
export { EnterprisePlanPagePage } from './enterprise-plan-page';
export { CustomerSupportUseCasePage } from './customer-support-use-case';
export { LeadGenerationUseCasePage } from './lead-generation-use-case';
export { ECommerceAutomationUseCasePage } from './e-commerce-automation-use-case';
export { BookingAutomationUseCasePage } from './booking-automation-use-case';
export { EducationAutomationUseCasePage } from './education-automation-use-case';
export { BlogListPage } from './blog-list';
export { BlogDetailPage } from './blog-detail';
export { DocumentationHomePage } from './documentation-home';
export { ApiDocumentationPage } from './api-documentation';
export { IntegrationGuidesPage } from './integration-guides';
export { FaqHelpCenterPage } from './faq-help-center';
export { LoginPage } from './login';
export { RegisterPage } from './register';
export { ForgotPasswordPage } from './forgot-password';
export { ResetPasswordPage } from './reset-password';
export { EmailVerificationPage } from './email-verification';
export { TermsOfServicePage } from './terms-of-service';
export { PrivacyPolicyPage } from './privacy-policy';
export { CookiePolicyPage } from './cookie-policy';

import { HomePage } from './home';
import { FeaturesOverviewPage } from './features-overview';
import { WhatsappAutomationFeaturePage } from './whatsapp-automation-feature';
import { AiChatbotFeaturePage } from './ai-chatbot-feature';
import { WorkflowAutomationFeaturePage } from './workflow-automation-feature';
import { SharedInboxFeaturePage } from './shared-inbox-feature';
import { KnowledgeBaseFeaturePage } from './knowledge-base-feature';
import { PricingPlansPage } from './pricing-plans';
import { ComparePlansPage } from './compare-plans';
import { EnterprisePlanPagePage } from './enterprise-plan-page';
import { CustomerSupportUseCasePage } from './customer-support-use-case';
import { LeadGenerationUseCasePage } from './lead-generation-use-case';
import { ECommerceAutomationUseCasePage } from './e-commerce-automation-use-case';
import { BookingAutomationUseCasePage } from './booking-automation-use-case';
import { EducationAutomationUseCasePage } from './education-automation-use-case';
import { BlogListPage } from './blog-list';
import { BlogDetailPage } from './blog-detail';
import { DocumentationHomePage } from './documentation-home';
import { ApiDocumentationPage } from './api-documentation';
import { IntegrationGuidesPage } from './integration-guides';
import { FaqHelpCenterPage } from './faq-help-center';
import { LoginPage } from './login';
import { RegisterPage } from './register';
import { ForgotPasswordPage } from './forgot-password';
import { ResetPasswordPage } from './reset-password';
import { EmailVerificationPage } from './email-verification';
import { TermsOfServicePage } from './terms-of-service';
import { PrivacyPolicyPage } from './privacy-policy';
import { CookiePolicyPage } from './cookie-policy';

import type { ComponentType } from 'react';

export type ModuleRoute = { module: string; title: string; path: string; apiModule?: string; component: ComponentType };

export const promotionalModuleRoutes: ModuleRoute[] = [
  { module: 'Marketing', title: 'Home', path: '/', component: HomePage },
  { module: 'Marketing', title: 'Features Overview', path: '/features', component: FeaturesOverviewPage },
  { module: 'Marketing', title: 'WhatsApp Automation Feature', path: '/features/whatsapp-automation', component: WhatsappAutomationFeaturePage },
  { module: 'Marketing', title: 'AI Chatbot Feature', path: '/features/ai-chatbot', component: AiChatbotFeaturePage },
  { module: 'Marketing', title: 'Workflow Automation Feature', path: '/features/workflow-automation', component: WorkflowAutomationFeaturePage },
  { module: 'Marketing', title: 'Shared Inbox Feature', path: '/features/shared-inbox', component: SharedInboxFeaturePage },
  { module: 'Marketing', title: 'Knowledge Base Feature', path: '/features/knowledge-base', component: KnowledgeBaseFeaturePage },
  { module: 'Pricing', title: 'Pricing Plans', path: '/pricing', component: PricingPlansPage },
  { module: 'Pricing', title: 'Compare Plans', path: '/compare-plans', component: ComparePlansPage },
  { module: 'Pricing', title: 'Enterprise Plan Page', path: '/enterprise-plan', component: EnterprisePlanPagePage },
  { module: 'Use Cases', title: 'Customer Support Use Case', path: '/use-cases/customer-support', component: CustomerSupportUseCasePage },
  { module: 'Use Cases', title: 'Lead Generation Use Case', path: '/use-cases/lead-generation', component: LeadGenerationUseCasePage },
  { module: 'Use Cases', title: 'E-commerce Automation Use Case', path: '/use-cases/ecommerce-automation', component: ECommerceAutomationUseCasePage },
  { module: 'Use Cases', title: 'Booking Automation Use Case', path: '/use-cases/booking-automation', component: BookingAutomationUseCasePage },
  { module: 'Use Cases', title: 'Education Automation Use Case', path: '/use-cases/education-automation', component: EducationAutomationUseCasePage },
  { module: 'Resources', title: 'Blog List', path: '/blog', component: BlogListPage },
  { module: 'Resources', title: 'Blog Detail', path: '/blog/:slug', component: BlogDetailPage },
  { module: 'Resources', title: 'Documentation Home', path: '/documentation', component: DocumentationHomePage },
  { module: 'Resources', title: 'API Documentation', path: '/api-documentation', component: ApiDocumentationPage },
  { module: 'Resources', title: 'Integration Guides', path: '/integration-guides', component: IntegrationGuidesPage },
  { module: 'Resources', title: 'FAQ / Help Center', path: '/help-center', component: FaqHelpCenterPage },
  { module: 'Authentication', title: 'Login', path: '/login', component: LoginPage },
  { module: 'Authentication', title: 'Register', path: '/register', component: RegisterPage },
  { module: 'Authentication', title: 'Forgot Password', path: '/forgot-password', component: ForgotPasswordPage },
  { module: 'Authentication', title: 'Reset Password', path: '/reset-password', component: ResetPasswordPage },
  { module: 'Authentication', title: 'Email Verification', path: '/email-verification', component: EmailVerificationPage },
  { module: 'Legal', title: 'Terms of Service', path: '/terms-of-service', component: TermsOfServicePage },
  { module: 'Legal', title: 'Privacy Policy', path: '/privacy-policy', component: PrivacyPolicyPage },
  { module: 'Legal', title: 'Cookie Policy', path: '/cookie-policy', component: CookiePolicyPage },
];
