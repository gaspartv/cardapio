import { CreateUserRes } from '@/src/mappers';
import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import { loginReqShema } from '@/src/schemas/session/login.schema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import Cors from 'cors';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  try {
    await loginReqShema.validate(req.body);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Email ou senha invalida!' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Email ou senha invalida!' });
  }

  const token = jwt.sign({ type: user.id }, process.env.SECRET_KEY!, {
    subject: user.id.toString(),
    expiresIn: '24h',
  });

  const userReturn = CreateUserRes.handle(user);

  res.status(200).json({ token, user: userReturn });
}
