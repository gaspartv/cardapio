import * as yup from 'yup';

export const editAddressReqShema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(15)
    .optional(),
  zipcode: yup.string().optional(),
  street: yup.string().optional(),
  streetNumber: yup.number().optional(),
  borough: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
});
