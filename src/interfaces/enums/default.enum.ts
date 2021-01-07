export enum DocumentTypes {
  AllDocuments = 'Total',
  Invoice = 'Invoice',
  Reimbursment = 'Reimbursement Form',
  Remittance = 'Management Remittance Advice',
  Insurance = 'Insurance Renewal Invoice',
  Bank = 'Bank Statement',
}

export enum docStatuses {
  FINISHED = 'FINISHED',
  READY_FOR_REVIEW = 'READY_FOR_REVIEW',
  READY_FOR_VALIDATION = 'READY_FOR_VALIDATION',
}

export enum processingTypes {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL = 'MANUAL',
}

export enum docTemplates {
  GENERIC = 'GENERIC',
  NOT_GENERIC = 'NOT_GENERIC',
}
