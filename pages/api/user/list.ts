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

  const userFound = await prisma.user.findFirst({ where: { id: req.userId } });
  
  if (!userFound){
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  if (!userFound?.isAdmin) {
    return res.status(400).json({ message: 'Você não tem permissão.' });
  }

  const userList = await prisma.user.findMany();

  const users = userList.map((el) => CreateUserRes.handle(el));

  return res.status(200).json({ users });
});
