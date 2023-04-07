import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

export default async function getStore(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const storeFound = await prisma.store.findFirst();

  const address = await prisma.address.findFirst({ where: { id: storeFound?.addressId } });

  const deliveryOrWhithdraw = await prisma.deliveryOrWhithdraw.findFirst({ where: { id: storeFound?.deliveryOrWhithdrawId } });

  const opening = await prisma.opening.findFirst({ where: { id: storeFound?.openingId}})

  const store = {
    ...storeFound,
    addressId: address,
    deliveryOrWhithdrawId: deliveryOrWhithdraw,
    openingId: opening
  }

  return res.status(200).json({ store });
}
