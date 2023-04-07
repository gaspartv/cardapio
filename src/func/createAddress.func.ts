import { Address, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export const createAddressData = async (): Promise<Address> => {
  const addressData = {
    id: randomUUID(),
    name: '...',
    zipcode: '...',
    street: '...',
    streetNumber: 0,
    borough: '...',
    city: '...',
    state: '...',
  };

  const address = await prisma.address.create({ data: addressData });

  return address;
};
