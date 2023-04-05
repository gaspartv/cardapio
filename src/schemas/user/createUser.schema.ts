import * as yup from 'yup';

export const createUserReqShema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(15)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
});
