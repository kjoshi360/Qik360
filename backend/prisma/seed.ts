import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
    update: { passwordHash: ownerHash, role: Role.OWNER, tenantId: tenant.id },
    create: {
      email: 'owner@qik360.dev',
      passwordHash: ownerHash,
      role: Role.OWNER,
      tenantId: tenant.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@qik360.dev' },
    update: { passwordHash: adminHash, role: Role.OWNER, tenantId: tenant.id },
    create: {
      email: 'admin@qik360.dev',
      passwordHash: adminHash,
      role: Role.OWNER,
      tenantId: tenant.id,
    },
  });
}

main().finally(async () => prisma.$disconnect());
