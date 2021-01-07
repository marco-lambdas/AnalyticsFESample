import React from 'react';
import gql from 'graphql-tag';
import { ExecGraphQL } from '../client/client';
import { ICreditorMany } from '../../interfaces/creditor-tables.interface';
import { getCreditorsFilterInput } from '../../interfaces/inputs/get-document-count-filter.input';
import { TableLogger } from '../../utils/Logger';

const log = TableLogger();

const LIST_CREDITORS_QL = gql`
  query ListCreditors(
    $listCreditorsFilterInput: ListCreditorsFilterInput!
    $documentCountFilterCreditorProcessed: GetDocumentCountFilterInput!
    $documentCountFilterCreditorInReview: GetDocumentCountFilterInput!
    $documentCountFilterCreditorAuto: GetDocumentCountFilterInput!
    $documentCountFilterCreditorManual: GetDocumentCountFilterInput!
    $documentCountFilterCreditorForValidation: GetDocumentCountFilterInput!
  ) {
    ListCreditors(listCreditorsFilterInput: $listCreditorsFilterInput) {
      data {
        value
        processed: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorProcessed)
        in_review: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorInReview)
        automatic: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorAuto)
        manual: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorManual)
        for_validation: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorForValidation)
      }
      total
    }
  }
`;

const LIST_CREDITORS_BASED_ON_DOCTEMPLATE_QL = gql`
  query ListCreditors(
    $listCreditorsFilterInput: ListCreditorsFilterInput!
    $documentCountFilterCreditorGeneric: GetDocumentCountFilterInput!
    $documentCountFilterCreditorNotGeneric: GetDocumentCountFilterInput!
  ) {
    ListCreditors(listCreditorsFilterInput: $listCreditorsFilterInput) {
      data {
        value
        documentCount
        documentUsers {
          firstName
          lastName
        }
        generic: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorGeneric)
        not_generic: documentCount(getDocumentCountFilterInput: $documentCountFilterCreditorNotGeneric)
      }
      total
    }
  }
`;

const listCreditors = async (
  setCreditors: React.Dispatch<React.SetStateAction<ICreditorMany>>,
  limit: number,
  page: number,
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  click = false,
) => {
  try {
    log.debug('Executing Request: For retrieving Creditors data ...');
    if (!click) {
      setCreditors([{ loading: true }]);
    }
    const data = await ExecGraphQL(LIST_CREDITORS_QL, {
      ...getCreditorsFilterInput(limit, page, fromDate, toDate, BUFilter),
    });

    if (data && data.error) throw new Error(data.message);
    const { ListCreditors } = data;

    const creditors: ICreditorMany = ListCreditors['data'].map((item: any) => ({
      creditor: item.value,
      documents_processed: item.processed,
      automatic_documents: item.automatic,
      manual_documents: item.manual,
      in_review_documents: item.in_review,
      documents_for_validation: item.for_validation,
    }));
    setCreditors(creditors);

    log.debug('Creditors data assigned to a state');

    return Math.ceil(ListCreditors['total'] / limit);
  } catch (error) {
    log.warn('Unhandled Error: During request for Creditors data');
    setCreditors(() => {
      throw new Error(error);
    });
  }
};

export const listCreditorsForCSV = async (
  limit: number,
  page: number,
  fromDate: string,
  toDate: string,
  BUFilter: string[],
) => {
  try {
    log.debug('Executing Request: For retrieving Creditors CSV data ...');
    const data = await ExecGraphQL(LIST_CREDITORS_QL, {
      ...getCreditorsFilterInput(limit, page, fromDate, toDate, BUFilter),
    });

    if (data && data.error) throw new Error(data.message);
    const { ListCreditors } = data;

    const creditors: ICreditorMany = ListCreditors['data'].map((item: any) => ({
      creditor: item.value,
      documents_processed: item.processed,
      automatic_documents: item.automatic,
      manual_documents: item.manual,
      in_review_documents: item.in_review,
      documents_for_validation: item.for_validation,
    }));

    log.debug('Returning Request: For retrieving CreditorsBasedOnDocTemplate data ...');
    return creditors;
  } catch (error) {
    log.warn('Unhandled Error: During request for Creditors CSV data');
  }
};

export const listCreditorsBasedOnDocTemplate = async (
  setCreditors: React.Dispatch<React.SetStateAction<ICreditorMany>>,
  limit: number,
  page: number,
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  click = false,
) => {
  try {
    log.debug('Executing Request: For retrieving CreditorsBasedOnDocTemplate data ...');
    if (!click) {
      setCreditors([{ loading: true }]);
    }
    const data = await ExecGraphQL(LIST_CREDITORS_BASED_ON_DOCTEMPLATE_QL, {
      ...getCreditorsFilterInput(limit, page, fromDate, toDate, BUFilter, true),
    });

    if (data && data.error) throw new Error(data.message);
    const { ListCreditors } = data;

    const creditors: ICreditorMany = ListCreditors['data'].map((item: any) => ({
      creditor: item.value,
      documents_generic: item.generic,
      documents_not_generic: item.not_generic,
    }));

    setCreditors(creditors);
    log.debug('CreditorsBasedOnDocTemplate data assigned to a state');

    return Math.ceil(ListCreditors['total'] / limit);
  } catch (error) {
    log.warn('Unhandled Error: During request for CreditorsBasedOnDocTemplate data');
    setCreditors(() => {
      throw new Error(error);
    });
  }
};

export const listCreditorsBasedOnDocTemplateForCSV = async (
  limit: number,
  page: number,
  fromDate: string,
  toDate: string,
  BUFilter: string[],
) => {
  try {
    log.debug('Executing Request: For retrieving CreditorsBasedOnDocTemplate CSV data ...');
    const data = await ExecGraphQL(LIST_CREDITORS_BASED_ON_DOCTEMPLATE_QL, {
      ...getCreditorsFilterInput(limit, page, fromDate, toDate, BUFilter, true),
    });

    if (data && data.error) throw new Error(data.message);
    const { ListCreditors } = data;

    const creditors: ICreditorMany = ListCreditors['data'].map((item: any) => ({
      creditor: item.value,
      documents_generic: item.generic,
      documents_not_generic: item.not_generic,
    }));

    log.debug('ReturningRequest: For retrieving CreditorsBasedOnDocTemplate CSV data ...');
    return creditors;
  } catch (error) {
    log.warn('Unhandled Error: During request for CreditorsBasedOnDocTemplate data');
  }
};

export default listCreditors;
