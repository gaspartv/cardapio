import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import { recoveryUserReqShema } from '@/src/schemas/user/recoveryUser.schema';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface CustomError extends Error {
  customProperty: any;
}
const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

export default async function recoveryUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await recoveryUserReqShema.validate(req.body);
  } catch (e: any) {
    res.status(400).json({ message: e.response.data.message });
    return;
  }

  const { email } = req.body;

  const emailFound = await prisma.user.findFirst({
    where: { email },
  });

  if (!emailFound) {
    res.status(404).json({ message: 'Email não encontrado.' });
    return;
  }

  const password = Math.random()
    .toString(36)
    .slice(-10);

  const editUser = await prisma.user.update({
    where: { email },
    data: {
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
      subject: 'Sua nova senha chegou!',
      html: `<p><strong>Senha: </strong>${password}</p>`,
    })
    .then((res) => res)
    .catch((error) => console.error(error));

  res.status(200);
}
