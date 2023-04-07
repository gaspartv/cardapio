import * as yup from 'yup';

export const editUserReqShema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(15)
    .optional(),
  email: yup
    .string()
    .email()
    .optional(),
  password: yup.string().min(8).optional(),
});
