export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    jwtSecret: process.env.JWT_SECRET ?? 'changeme',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
    encryptionKey: process.env.ENCRYPTION_KEY ?? '0123456789abcdef0123456789abcdef',
    webhookSecret: process.env.WHATSAPP_WEBHOOK_SECRET ?? 'webhook-secret',
    openAiApiKey: process.env.OPENAI_API_KEY ?? '',
    whatsappApiUrl: process.env.WHATSAPP_API_URL ?? 'https://graph.facebook.com/v21.0',
    metaApiUrl: process.env.META_API_URL ?? 'https://graph.facebook.com/v21.0',
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL ?? '',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
});
