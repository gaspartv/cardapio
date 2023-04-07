import { CreateUserRes } from '@/src/mappers';
import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import withTokenMiddleware from '@/src/middlewares/token.middleware';
import { editUserReqShema } from '@/src/schemas/user/editUser.schema';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await cors(req, res);

  if (req.method !== 'PATCH'){
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const validatedBody  = await editUserReqShema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    req.body = validatedBody
  } catch ({message}: any) {
    return res.status(400).json({ message });
  }

  const { id } = req.query;

  const userToken = await prisma.user.findFirst({
    where: {id : req.userId}
  })

  if (userToken?.id !== id && !userToken?.isAdmin ) {
    return res.status(400).json({ message: 'Você não tem permissão.' });
  }

  const userFound = await prisma.user.findFirst({
    where: {id: id?.toString()}
  })

  if (!userFound){
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  if (req.body.password) {
    req.body.password = hashSync(req.body.password, 10);
  }

  const userEdit = await prisma.user.update({
    where: { id: id?.toString() },
    data: req.body,
  });

  const user = CreateUserRes.handle(userEdit);

  return res.status(200).json({ user });
});
