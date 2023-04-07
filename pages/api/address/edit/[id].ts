import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import withTokenMiddleware from '@/src/middlewares/token.middleware';
import { editAddressReqShema } from '@/src/schemas/address/editAddres.schema';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'PATCH') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    try {
      const validatedBody = await editAddressReqShema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBody;
    } catch ({ message }: any) {
      return res.status(400).json({ message });
    }

    const userFound = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (!userFound) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const { id } = req.query;

    if (userFound?.id !== id && !userFound?.isAdmin ) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }
  
    const addressFound = await prisma.address.findFirst({
      where: { id: id?.toString() },
    });

    if (!addressFound) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }

    const address = await prisma.address.update({
      where: { id: addressFound.id },
      data: req.body,
    });

    return res.status(200).json({ address });
  }
);
