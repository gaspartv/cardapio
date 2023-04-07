import { CreateUserRes } from '@/src/mappers';
import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import withTokenMiddleware from '@/src/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }
  
  const { id } = req.query;

  const userFound = await prisma.user.findFirst({
    where: {id: id?.toString()}
  })

  if (!userFound){
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  if (userFound?.id !== id && !userFound?.isAdmin ) {
    return res.status(400).json({ message: 'Você não tem permissão.' });
  }

  const user = CreateUserRes.handle(userFound)

  return res.status(200).json({ user });
});
