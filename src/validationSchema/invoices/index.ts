import * as yup from 'yup';
import { paymentValidationSchema } from 'validationSchema/payments';

export const invoiceValidationSchema = yup.object().shape({
  status: yup.string().required(),
  amount: yup.number().integer().required(),
  due_date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  organisation_id: yup.string().nullable().required(),
  client_id: yup.string().nullable().required(),
  payment: yup.array().of(paymentValidationSchema),
});
