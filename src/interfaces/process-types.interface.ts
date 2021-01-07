export interface IDoughnutChartValues {
  total_docs: number;
  automatic_docs: number;
  manual_docs: number;
  loading?: boolean;
}

export interface IManualDocumentDetails {
  batchInstanceId?: string;
  documentId?: string;
  batchCreationDate?: any;
  creditors?: string;
  taskOwner?: string;
  docDateTime: string;
  transactionDt: string;
  validationError?: string;
  reviewError?: string;
  processTime?: string;
}

export interface IManualDocuments {
  data?: IManualDocumentDetails[];
  total?: number;
}

// initial values

export const doughnutChartInitialValues: IDoughnutChartValues = {
  total_docs: 0,
  automatic_docs: 0,
  manual_docs: 0,
  loading: true,
};
