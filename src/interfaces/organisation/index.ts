import { ContractInterface } from 'interfaces/contract';
import { FinancialReportInterface } from 'interfaces/financial-report';
import { InvoiceInterface } from 'interfaces/invoice';
import { UserInterface } from 'interfaces/user';

export interface OrganisationInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  contract?: ContractInterface[];
  financial_report?: FinancialReportInterface[];
  invoice?: InvoiceInterface[];
  user?: UserInterface;
  _count?: {
    contract?: number;
    financial_report?: number;
    invoice?: number;
  };
}
