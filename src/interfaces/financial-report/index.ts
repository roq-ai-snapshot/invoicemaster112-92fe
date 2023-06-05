import { OrganisationInterface } from 'interfaces/organisation';

export interface FinancialReportInterface {
  id?: string;
  organisation_id: string;
  report_date: Date;
  total_invoiced: number;
  total_received: number;
  created_at?: Date;
  updated_at?: Date;

  organisation?: OrganisationInterface;
  _count?: {};
}
