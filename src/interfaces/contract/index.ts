import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';

export interface ContractInterface {
  id?: string;
  organisation_id: string;
  client_id: string;
  start_date: Date;
  end_date: Date;
  created_at?: Date;
  updated_at?: Date;

  organisation?: OrganisationInterface;
  user?: UserInterface;
  _count?: {};
}
