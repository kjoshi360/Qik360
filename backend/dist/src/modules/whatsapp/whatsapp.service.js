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
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const crypto_1 = require("crypto");
let WhatsappService = class WhatsappService {
    constructor(config) {
        this.config = config;
    }
    encrypt(token) {
        const key = Buffer.from(this.config.get('app.encryptionKey'), 'utf8').subarray(0, 32);
        const iv = (0, crypto_1.randomBytes)(16);
        const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', key, iv);
        const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(tokenCipher) {
        const [ivHex, dataHex] = tokenCipher.split(':');
        const key = Buffer.from(this.config.get('app.encryptionKey'), 'utf8').subarray(0, 32);
        const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()]);
        return decrypted.toString('utf8');
    }
    findAll(tenantId) {
        return { tenantId, module: 'whatsapp', items: [] };
    }
    async create(tenantId, payload) {
        return {
            tenantId,
            module: 'whatsapp',
            config: {
                phoneNumberId: payload.phoneNumberId,
                encryptedToken: this.encrypt(payload.accessToken),
            },
        };
    }
    async sendMessage(phoneNumberId, accessToken, to, body) {
        const url = `${this.config.get('app.whatsappApiUrl')}/${phoneNumberId}/messages`;
        const response = await axios_1.default.post(url, { messaging_product: 'whatsapp', to, text: { body } }, { headers: { Authorization: `Bearer ${accessToken}` } });
        return response.data;
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map