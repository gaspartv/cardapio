import { Opening, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export const createOpeningData = async (): Promise<Opening> => {
  const openingData = {
    id: randomUUID(),
    storeName: '00:00 às 00:00',
    monday: '00:00 às 00:00',
    tuesday: '00:00 às 00:00',
    wednesday: '00:00 às 00:00',
    thursday: '00:00 às 00:00',
    friday: '00:00 às 00:00',
    saturday: '00:00 às 00:00',
    sunday: '00:00 às 00:00',
  };

  const opening = await prisma.opening.create({ data: openingData });

  return opening;
};
