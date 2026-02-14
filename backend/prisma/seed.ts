import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Owner@123', 10);
  await prisma.tenant.upsert({
    where: { id: 'seed-tenant' },
    update: {},
    create: {
      id: 'seed-tenant',
      name: 'Seed Tenant',
      users: {
        create: {
          email: 'owner@qik360.dev',
          passwordHash: hash,
          role: Role.OWNER,
        },
      },
    },
  });
}

main().finally(async () => prisma.$disconnect());
