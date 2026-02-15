import dotenv from 'dotenv';

import { PrismaClient } from './generated/prisma/client';

dotenv.config();

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL!;

  if (process.env.NODE_ENV === 'production') {
    const { PrismaPlanetScale } = require('@prisma/adapter-planetscale');
    const adapter = new PrismaPlanetScale({ url });
    return new PrismaClient({ adapter });
  }

  // Local MySQL via mariadb adapter
  const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
  const adapter = new PrismaMariaDb(url);
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

export { prisma };

// Re-export all types from the generated Prisma client
export * from './generated/prisma/client';
