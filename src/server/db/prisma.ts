import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export async function queryPrismaDb(
  table: 'fileStore',
  action: 'create' | 'find',
  payload: any
) {
  const prisma = new PrismaClient();
  try {
    const prismaClient = prisma[table];
    switch (action) {
      case 'create':
        return await prismaClient.create(payload);
      case 'find':
        return await prismaClient.findFirst(payload);
    }
  } catch (error) {
    logger.error('🚀 ~ file: prisma.ts:7 ~ queryPrismaDb ~ error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
