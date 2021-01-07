import { docStatuses, processingTypes, docTemplates } from '../enums/default.enum';

export const getDocumentFilterInputs = (
  fromDate: string,
  toDate: string,
  lastFromDate: string,
  lastToDate: string,
  BUFilter: string[],
) => {
  const getDocumentCountForStatuses = {
    docStatuses: [docStatuses.FINISHED, docStatuses.READY_FOR_REVIEW, docStatuses.READY_FOR_VALIDATION],
    fromDate: fromDate,
    toDate: toDate,
    businessUnits: BUFilter,
  };

  const getDocumentCountTotalDocs = {
    fromDate: fromDate,
    toDate: toDate,
    businessUnits: BUFilter,
  };

  const percentageDocumentCountForStatuses = {
    ...getDocumentCountForStatuses,
    fromDate: lastFromDate,
    toDate: lastToDate,
  };

  const percentageDocumentCountTotalDocs = {
    ...getDocumentCountTotalDocs,
    fromDate: lastFromDate,
    toDate: lastToDate,
  };

  return {
    getDocumentCountForStatuses,
    getDocumentCountTotalDocs,
    percentageDocumentCountForStatuses,
    percentageDocumentCountTotalDocs,
  };
};

export const getDocumentProcessingTypesInput = (fromDate: string, toDate: string, BUFilter: string[]) => {
  return {
    getFinishDocumentInput: {
      fromDate: fromDate,
      toDate: toDate,
      businessUnits: BUFilter,
      docStatuses: [docStatuses.FINISHED],
    },
    getAutomaticDocumentInput: {
      processingTypes: [processingTypes.AUTOMATIC],
      fromDate: fromDate,
      toDate: toDate,
      businessUnits: BUFilter,
      docStatuses: [docStatuses.FINISHED],
    },
    getManualDocumentInput: {
      processingTypes: [processingTypes.MANUAL],
      fromDate: fromDate,
      toDate: toDate,
      businessUnits: BUFilter,
      docStatuses: [docStatuses.FINISHED],
    },
  };
};

export const getCreditorsFilterInput = (
  limit: number,
  page = 1,
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  templates: Boolean = false,
) => {
  limit = limit ? limit : 10;
  let listCreditorsFilterInput;
  if (templates) {
    listCreditorsFilterInput = {
      sort: 'documentCount',
      order: 'DESC',
      limit: limit,
      page: page,
      fromDate: fromDate,
      toDate: toDate,
      docTemplatesFilterCount: [docTemplates.GENERIC],
      businessUnits: BUFilter,
    };
    return {
      listCreditorsFilterInput,
      documentCountFilterCreditorGeneric: {
        docTemplates: [docTemplates.GENERIC],
        businessUnits: BUFilter,
        fromDate: fromDate,
        toDate: toDate,
      },
      documentCountFilterCreditorNotGeneric: {
        docTemplates: [docTemplates.NOT_GENERIC],
        businessUnits: BUFilter,
        fromDate: fromDate,
        toDate: toDate,
      },
    };
  }

  listCreditorsFilterInput = {
    sort: 'documentCount',
    order: 'DESC',
    limit: limit,
    page: page,
    fromDate: fromDate,
    toDate: toDate,
    docStatusesFilterCount: [docStatuses.FINISHED],
    businessUnits: BUFilter,
  };
  return {
    listCreditorsFilterInput,
    documentCountFilterCreditorProcessed: {
      docStatuses: [docStatuses.FINISHED],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
    documentCountFilterCreditorAuto: {
      docStatuses: [docStatuses.FINISHED],
      processingTypes: [processingTypes.AUTOMATIC],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
    documentCountFilterCreditorManual: {
      docStatuses: [docStatuses.FINISHED],
      processingTypes: [processingTypes.MANUAL],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
    documentCountFilterCreditorInReview: {
      docStatuses: [docStatuses.READY_FOR_REVIEW],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
    documentCountFilterCreditorForValidation: {
      docStatuses: [docStatuses.READY_FOR_VALIDATION],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
  };
};

export const getUsersFilterInput = (fromDate: string, toDate: string, BUFilter: string[]) => {
  const listUsersFilterInput = {
    fromDate: fromDate,
    toDate: toDate,
    docStatusesFilterCount: [docStatuses.FINISHED],
    businessUnits: BUFilter,
  };

  return {
    listUsersFilterInput,
    documentCountFilterUsersProcessed: {
      docStatuses: [docStatuses.FINISHED],
      businessUnits: BUFilter,
      fromDate: fromDate,
      toDate: toDate,
    },
  };
};

export const getManualDocumentFilterInput = (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  limit: number,
  page = 1,
) => {
  limit = !limit || limit === 0 ? 10 : limit;
  const getManualDocumentFilterInput = {
    fromDate: fromDate,
    toDate: toDate,
    businessUnits: BUFilter,
    limit: limit,
    page: page,
  };

  return { getManualDocumentFilterInput };
};

export const getInvoiceTotalsFilterInput = (fromDate: string, toDate: string, BUFilter: string[]) => {
  const getInvoiceTotalsFilter = {
    fromDate: fromDate,
    toDate: toDate,
    businessUnits: BUFilter,
  };

  return { getInvoiceTotalsFilter };
};
