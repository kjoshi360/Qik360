declare const _default: () => {
    app: {
        port: number;
        nodeEnv: string;
        jwtSecret: string;
        jwtExpiresIn: string;
        encryptionKey: string;
        webhookSecret: string;
        openAiApiKey: string;
        whatsappApiUrl: string;
        n8nWebhookUrl: string;
    };
    database: {
        url: string | undefined;
    };
    redis: {
        url: string;
    };
};
export default _default;
