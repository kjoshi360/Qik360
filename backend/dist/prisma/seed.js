"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const ownerHash = await bcrypt.hash('Owner@123', 10);
    const adminHash = await bcrypt.hash('Admin@123', 10);
    const tenant = await prisma.tenant.upsert({
        where: { id: 'seed-tenant' },
        update: {},
        create: {
            id: 'seed-tenant',
            name: 'Seed Tenant',
        },
    });
    await prisma.user.upsert({
        where: { email: 'owner@qik360.dev' },
        update: { passwordHash: ownerHash, role: client_1.Role.OWNER, tenantId: tenant.id },
        create: {
            email: 'owner@qik360.dev',
            passwordHash: ownerHash,
            role: client_1.Role.OWNER,
            tenantId: tenant.id,
        },
    });
    await prisma.user.upsert({
        where: { email: 'admin@qik360.dev' },
        update: { passwordHash: adminHash, role: client_1.Role.OWNER, tenantId: tenant.id },
        create: {
            email: 'admin@qik360.dev',
            passwordHash: adminHash,
            role: client_1.Role.OWNER,
            tenantId: tenant.id,
        },
    });
}
main().finally(async () => prisma.$disconnect());
//# sourceMappingURL=seed.js.map