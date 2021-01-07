import { IManualDocumentDetails } from './process-types.interface';

export interface ICreditor {
  value?: string;
  creditor?: string;
  documents_processed?: number;
  automatic_documents?: number;
  manual_documents?: number;
  in_review_documents?: number;
  documents_for_validation?: number;
  documents_generic?: number;
  documents_not_generic?: number;
  assignee?: string;
  loading?: boolean;
}

export interface ITableParam {
  open?: Boolean;
  labels: string[];
  creditors?: ICreditorMany;
  manualDocs?: IManualDocumentDetails[];
}

export type ICreditorMany = ICreditor[];

// initial values

export const creditorsValuesInitial: ICreditor = {
  value: '',
  creditor: '',
  documents_processed: 0,
  automatic_documents: 0,
  manual_documents: 0,
  in_review_documents: 0,
  loading: true,
};
