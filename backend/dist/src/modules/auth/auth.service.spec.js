"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
describe('AuthService', () => {
    it('should be defined', () => {
        const service = new auth_service_1.AuthService({}, new jwt_1.JwtService({ secret: 'x' }));
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=auth.service.spec.js.map