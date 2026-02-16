"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const configuration_1 = require("./config/configuration");
const tenant_middleware_1 = require("./common/middleware/tenant.middleware");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const user_module_1 = require("./modules/user/user.module");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const webhook_module_1 = require("./modules/webhook/webhook.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const messages_module_1 = require("./modules/messages/messages.module");
const ai_module_1 = require("./modules/ai/ai.module");
const knowledge_module_1 = require("./modules/knowledge/knowledge.module");
const automation_module_1 = require("./modules/automation/automation.module");
const billing_module_1 = require("./modules/billing/billing.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(tenant_middleware_1.TenantMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [configuration_1.default] }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            tenant_module_1.TenantModule,
            user_module_1.UserModule,
            whatsapp_module_1.WhatsappModule,
            webhook_module_1.WebhookModule,
            conversations_module_1.ConversationsModule,
            messages_module_1.MessagesModule,
            ai_module_1.AiModule,
            knowledge_module_1.KnowledgeModule,
            automation_module_1.AutomationModule,
            billing_module_1.BillingModule,
            analytics_module_1.AnalyticsModule,
            subscription_module_1.SubscriptionModule,
            permissions_module_1.PermissionsModule,
        ],
        providers: [{ provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map