import { CreateUserRes } from '@/src/mappers';
import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import { createUserReqShema } from '@/src/schemas/user/createUser.schema';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await createUserReqShema.validate(req.body);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { name, email } = req.body;

  const emailFound = await prisma.user.findFirst({
    where: { email },
  });

  if (emailFound) {
    res.status(400).json({ message: 'Email já cadastrado.' });
    return;
  }

  const password = Math.random()
    .toString(36)
    .slice(-10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT),
    auth: {
      user: process.env.SMTPUSER,
      pass: process.env.SMTPPASSWORD,
    },
  });

  transporter
    .sendMail({
      from: process.env.SMTPUSER,
      to: process.env.SMTPUSER,
      replyTo: process.env.SMTPUSER,
      subject: 'Sua senha chegou!',
      html: `<p><strong>Senha: </strong>${password}</p>`,
    })
    .then((res) => res)
    .catch((error) => console.error(error));

  const user = CreateUserRes.handle(newUser);

  res.status(201).json({ user });
}
