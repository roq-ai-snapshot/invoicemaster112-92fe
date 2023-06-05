import { PaymentInterface } from 'interfaces/payment';
import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';

export interface InvoiceInterface {
  id?: string;
  organisation_id: string;
  client_id: string;
  status: string;
  amount: number;
  due_date: Date;
  created_at?: Date;
  updated_at?: Date;
  payment?: PaymentInterface[];
  organisation?: OrganisationInterface;
  user?: UserInterface;
  _count?: {
    payment?: number;
  };
}
