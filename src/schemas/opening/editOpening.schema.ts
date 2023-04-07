import * as yup from 'yup';

export const editOpeningReqShema = yup.object().shape({
  storeName: yup.string().optional(),
  monday: yup.string().optional(),
  tuesday: yup.string().optional(),
  wednesday: yup.string().optional(),
  thursday: yup.string().optional(),
  friday: yup.string().optional(),
  saturday: yup.string().optional(),
  sunday: yup.string().optional(),
});
