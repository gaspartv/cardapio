import { corsMiddleware } from '@/src/middlewares/cors.middleware';
import withTokenMiddleware from '@/src/middlewares/token.middleware';
import { editDeliveryReqShema } from '@/src/schemas/delivery/editDelivery.schema';
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
      const validatedBody = await editDeliveryReqShema.validate(req.body, {
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

    if (!userFound?.isAdmin) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    const store = await prisma.store.findFirst()

    const deliveryFound = await prisma.deliveryOrWhithdraw.findFirst({
      where: { id: store?.deliveryOrWhithdrawId },
    });

    if (!deliveryFound) {
      return res.status(404).json({ message: 'Opção não encontrada' });
    }

    const data = await prisma.deliveryOrWhithdraw.update({
      where: { id: store?.deliveryOrWhithdrawId },
      data: req.body,
    });

    return res.status(200).json({ data });
  }
);
