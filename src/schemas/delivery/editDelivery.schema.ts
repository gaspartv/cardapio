import * as yup from 'yup';

export const editDeliveryReqShema = yup.object().shape({
  delivery: yup.boolean().optional(),
  whithdraw: yup.boolean().optional(),
});
