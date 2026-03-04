import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import configuration from './config/configuration';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AiModule } from './modules/ai/ai.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { AutomationModule } from './modules/automation/automation.module';
import { BillingModule } from './modules/billing/billing.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { MetaAdsModule } from './modules/meta-ads/meta-ads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    PrismaModule,
    AuthModule,
    TenantModule,
    UserModule,
    WhatsappModule,
    WebhookModule,
    ConversationsModule,
    MessagesModule,
    AiModule,
    KnowledgeModule,
    AutomationModule,
    BillingModule,
    AnalyticsModule,
    SubscriptionModule,
    PermissionsModule,
    MetaAdsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
