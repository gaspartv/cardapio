import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function getAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Você precisa estar logado!' });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    res.status(400).json({ message: 'Você precisa estar logado!' });
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;

  const addressFound = await prisma.address.findFirst({
    where: { id: Number(id) },
  });

  if (!addressFound) {
    res.status(200).json({
      address: {
        id: 0,
        name: 'Sem nome',
        zipcode: '00000-000',
        street: 'Sem rua',
        streetNumber: 'Sem número',
        borough: 'Sem bairro',
        city: 'Sem cidade',
        state: 'Sem estado',
      },
    });
    return;
  }

  res.status(200).json({
    address: addressFound,
  });
}
