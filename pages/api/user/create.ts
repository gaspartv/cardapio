import { createAddressData } from '@/src/func/createAddress.func';
import { createDeliveryOrWhithdrawData } from '@/src/func/createDeliveryOrWithdraw.func';
import { createOpeningData } from '@/src/func/createOpening.func';
import { CreateUserRes } from '@/src/mappers';
import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import { createUserReqShema } from '@/src/schemas/user/createUser.schema';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedBody = await createUserReqShema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });

    req.body = validatedBody;
  } catch ({ message }: any) {
    return res.status(400).json({ message });
  }

  const { name, email } = req.body;

  const emailFound = await prisma.user.findFirst({
    where: { email },
  });

  if (emailFound) {
    return res.status(400).json({ message: 'Email já cadastrado.' });
  }

  let isAdmin = false;

  let employee = false;

  const password = Math.random()
    .toString(36)
    .slice(-10);

  const userAddress = await createAddressData();

  const usersCount = await prisma.user.count();

  if (usersCount === 0) {
    isAdmin = true;
    employee = true;

    const address = await createAddressData();

    const deliveryOrWhithdraw = await createDeliveryOrWhithdrawData();

    const opening = await createOpeningData();

    const storeData = {
      id: randomUUID(),
      name: 'Loja Modelo',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod libero eu elit scelerisque, vel vestibulum urna pretium. Quisque tincidunt velit ut mauris bibendum, non rutrum sapien laoreet. Nullam a purus nec ante euismod vestibulum eget ut orci. Sed rhoncus consectetur felis, ac tempor orci bibendum vel. Duis euismod mi nec quam faucibus, nec vulputate odio eleifend. Sed fringilla, est at mollis blandit, sem mi bibendum sapien, a elementum urna justo in nunc. Vivamus id fringilla nulla. Vivamus laoreet maximus orci, auctor tincidunt odio iaculis in. Sed sed dui dui. Curabitur varius, sapien vel lacinia consequat, elit elit tempor orci, vel commodo ipsum urna euismod justo. Sed ac arcu non nisi convallis dictum sed vel metus. Sed id orci vitae enim convallis venenatis vitae quis metus.',
      cnpj: '00.000.000/0000-0',
      pix: 'd62a05d3-0637-41c0-b3e0-86db0e7a42b8',
      phone: '00 0 0000-0000',
      minimumOrder: 10,
      image: '/image/profile.jpg',
      addressId: address.id,
      deliveryOrWhithdrawId: deliveryOrWhithdraw.id,
      openingId: opening.id,
    };

    const store = await prisma.store.create({ data: storeData });

    const newUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        name,
        password: hashSync(password, 10),
        isAdmin,
        employee,
        storeId: store.id,
        addressId: userAddress.id,
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
        to: newUser.email,
        replyTo: newUser.email,
        subject: 'Sua senha chegou!',
        html: `<p><strong>Senha: </strong>${password}</p>`,
      })
      .then((res) => res)
      .catch((error) => console.error(error));

    const user = CreateUserRes.handle(newUser);

    return res.status(201).json({ user });
  }

  const newUser = await prisma.user.create({
    data: {
      id: randomUUID(),
      email,
      name,
      password: hashSync(password, 10),
      isAdmin,
      employee,
      storeId: null,
      addressId: userAddress.id,
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

  return res.status(201).json({ user });
}
