import * as yup from 'yup';

export const financialReportValidationSchema = yup.object().shape({
  report_date: yup.date().required(),
  total_invoiced: yup.number().integer().required(),
  total_received: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  organisation_id: yup.string().nullable().required(),
});
