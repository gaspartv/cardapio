import { DeliveryOrWhithdraw, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export const createDeliveryOrWhithdrawData = async (): Promise<
  DeliveryOrWhithdraw
> => {
  const deliveryOrWhithdrawData = {
    id: randomUUID(),
    delivery: false,
    whithdraw: false,
  };

  const deliveryOrWhithdraw = await prisma.deliveryOrWhithdraw.create({
    data: deliveryOrWhithdrawData,
  });

  return deliveryOrWhithdraw;
};
