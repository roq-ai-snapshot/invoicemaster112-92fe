import * as yup from 'yup';
import { contractValidationSchema } from 'validationSchema/contracts';
import { financialReportValidationSchema } from 'validationSchema/financial-reports';
import { invoiceValidationSchema } from 'validationSchema/invoices';

export const organisationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  contract: yup.array().of(contractValidationSchema),
  financial_report: yup.array().of(financialReportValidationSchema),
  invoice: yup.array().of(invoiceValidationSchema),
});
