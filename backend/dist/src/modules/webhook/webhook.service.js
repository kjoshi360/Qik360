"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
let WebhookService = class WebhookService {
    constructor(config) {
        this.config = config;
    }
    findAll(tenantId) {
        return { tenantId, module: 'webhook', items: [] };
    }
    create(tenantId, payload) {
        return { tenantId, module: 'webhook', payload };
    }
    validateSignature(signature, rawBody) {
        const expected = (0, crypto_1.createHmac)('sha256', this.config.get('app.webhookSecret')).update(rawBody).digest('hex');
        if (signature !== expected)
            throw new common_1.UnauthorizedException('Invalid webhook signature');
        return true;
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map