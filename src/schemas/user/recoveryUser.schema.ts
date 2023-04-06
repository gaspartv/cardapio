import * as yup from 'yup';

export const recoveryUserReqShema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
});
