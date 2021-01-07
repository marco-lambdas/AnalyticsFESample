import React from 'react';
import gql from 'graphql-tag';
import { ExecGraphQL } from '../client/client';
import { IStatsAmt, ITotalInvoiceAmt } from '../../interfaces/document-stats.interface';
import {
  getDocumentFilterInputs,
  getInvoiceTotalsFilterInput,
} from '../../interfaces/inputs/get-document-count-filter.input';
import { StatsLogger } from '../../utils/Logger';
import { docStatuses } from '../../interfaces/enums/default.enum';

const log = StatsLogger();

const GET_SUMMARY_DOCUMENT_COUNT_QL = gql`
  query GetDocumentCount(
    $getDocumentCountForStatuses: GetDocumentCountFilterInput!
    $getDocumentCountTotalDocs: GetDocumentCountFilterInput!
    $percentageDocumentCountForStatuses: GetDocumentCountFilterInput
    $percentageDocumentCountTotalDocs: GetDocumentCountFilterInput
  ) {
    Status_Documents: GetDocumentCounts(getDocumentCountFilterInput: $getDocumentCountForStatuses) {
      count
      docStatus
      percentage(percentageDocumentCountFilterInput: $percentageDocumentCountForStatuses)
    }
    Total_Documents: GetDocumentCount(getDocumentCountFilterInput: $getDocumentCountTotalDocs) {
      count
      percentage(percentageDocumentCountFilterInput: $percentageDocumentCountTotalDocs)
    }
  }
`;

const GET_TOTAL_INVOICE_AMOUNT = gql`
  query GetTotalInvoiceAmt($getInvoiceTotalsFilter: GetInvoiceTotalsFilter!) {
    GetTotalInvoiceAmt(getInvoiceTotalsFilter: $getInvoiceTotalsFilter)
  }
`;

const getStatsValues = async (
  fromDate: string,
  toDate: string,
  lastFromDate: string,
  lastToDate: string,
  BUFilter: string[],
  setStatValues: React.Dispatch<React.SetStateAction<IStatsAmt>>,
) => {
  try {
    setStatValues({ loading: true });
    log.debug('Executing Request: For retrieving stats card data ...');
    const data = await ExecGraphQL(
      GET_SUMMARY_DOCUMENT_COUNT_QL,
      getDocumentFilterInputs(fromDate, toDate, lastFromDate, lastToDate, BUFilter),
    );

    if (data && data.error) throw new Error(data.message);
    const { Status_Documents, Total_Documents } = data;

    const findDocumentStatus = (docStatus: string) => {
      return Status_Documents.find((statusDocument: any) => {
        return statusDocument.docStatus === docStatus;
      });
    };

    const Documents_processed = findDocumentStatus(docStatuses.FINISHED);
    const Document_awaiting_review = findDocumentStatus(docStatuses.READY_FOR_REVIEW);
    const Document_awaiting_validation = findDocumentStatus(docStatuses.READY_FOR_VALIDATION);

    setStatValues({
      doc_Proc: Documents_processed?.count,
      doc_Proc_percent: Documents_processed?.percentage,
      doc_await_rev: Document_awaiting_review?.count,
      doc_await_rev_percent: Document_awaiting_review?.percentage,
      doc_await_val: Document_awaiting_validation?.count,
      doc_await_val_percent: Document_awaiting_validation?.percentage,
      total_num_doc: Total_Documents?.count,
      total_num_doc_percent: Total_Documents?.percentage,
      total_inv_amt: '$ 0',
    });

    log.debug('stats card data assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: During request for stats card data');
    setStatValues(() => {
      throw new Error(error);
    });
  }
};

export const getTotalInvoiceAmt = async (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  setTotalInvAmt: React.Dispatch<React.SetStateAction<ITotalInvoiceAmt>>,
) => {
  try {
    setTotalInvAmt({ loading: true });
    log.debug('Executing Request: For retrieving Total Invoice Amount Value ...');
    const data = await ExecGraphQL(GET_TOTAL_INVOICE_AMOUNT, getInvoiceTotalsFilterInput(fromDate, toDate, BUFilter));

    if (data && data.error) throw new Error(data.message);
    const { GetTotalInvoiceAmt } = data;

    setTotalInvAmt({ Amt: GetTotalInvoiceAmt });

    log.debug('Total Invoice Amount Value assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: During request for Total Invoice Amount Value');
    setTotalInvAmt(() => {
      throw new Error(error);
    });
  }
};

export default getStatsValues;
