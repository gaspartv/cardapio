import * as yup from 'yup';

export const editStoreReqShema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(15)
    .optional(),
  desc: yup.string().optional(),
  cnpj: yup.string().optional(),
  pix: yup.string().optional(),
  phone: yup.string().optional(),
  minimumOrder: yup.number().optional(),
  image: yup.string().optional(),
});
