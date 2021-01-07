import React from 'react';
import gql from 'graphql-tag';
import { ExecGraphQL } from '../client/client';
import { IDoughnutChartValues, IManualDocuments } from '../../interfaces/process-types.interface';
import {
  getDocumentProcessingTypesInput,
  getManualDocumentFilterInput,
} from '../../interfaces/inputs/get-document-count-filter.input';
import { DoughnutChartLogger } from '../../utils/Logger';

const log = DoughnutChartLogger();

const GET_DOCUMENT_COUNT_FOR_PROCESSING_TYPES_QL = gql`
  query GetDocumentCountForProcessTypes(
    $getFinishDocumentInput: GetDocumentCountFilterInput!
    $getAutomaticDocumentInput: GetDocumentCountFilterInput!
    $getManualDocumentInput: GetDocumentCountFilterInput!
  ) {
    Total: GetDocumentCount(getDocumentCountFilterInput: $getFinishDocumentInput) {
      count
    }
    Automatic: GetDocumentCount(getDocumentCountFilterInput: $getAutomaticDocumentInput) {
      count
    }
    Manual: GetDocumentCount(getDocumentCountFilterInput: $getManualDocumentInput) {
      count
    }
  }
`;

const GET_MANUAL_DOCUMENT_DETAILS_QL = gql`
  query GetManualDocumentDetails($getManualDocumentFilterInput: GetManualDocumentDetailsFilterInput!) {
    GetManualDocumentDetails(getDocumentCountFilterInput: $getManualDocumentFilterInput) {
      data {
        batchInstanceId
        documentId
        creditors
        taskOwner
        batchCreationDate
        docDateTime
        transactionDt
        validationError
        reviewError
      }
      total
    }
  }
`;

const getProcessingTypesCount = async (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  setDoughnutChartValues: React.Dispatch<React.SetStateAction<IDoughnutChartValues>>,
) => {
  try {
    log.debug('Executing request: For retrieving DoughnutChart data ...');
    setDoughnutChartValues({ loading: true, total_docs: 0, automatic_docs: 0, manual_docs: 0 });
    const data = await ExecGraphQL(
      GET_DOCUMENT_COUNT_FOR_PROCESSING_TYPES_QL,
      getDocumentProcessingTypesInput(fromDate, toDate, BUFilter),
    );

    if (data && data.error) throw new Error(data.message);

    setDoughnutChartValues({
      total_docs: data.Total?.count,
      automatic_docs: data.Automatic?.count,
      manual_docs: data.Manual?.count,
    });

    log.debug('DoughnutChart data assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: During request for DoughnutChart data');
    setDoughnutChartValues(() => {
      throw new Error(error);
    });
  }
};

export const getManualDocumentDetails = async (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  limit: number,
  page: number,
  setManualDocumentDetails: React.Dispatch<React.SetStateAction<IManualDocuments>>,
) => {
  try {
    log.debug('Executing request: For retrieving Manual Documents Breakdown data ...');
    const responseData = await ExecGraphQL(
      GET_MANUAL_DOCUMENT_DETAILS_QL,
      getManualDocumentFilterInput(fromDate, toDate, BUFilter, limit, page),
    );

    if (responseData && responseData.error) throw new Error(responseData.message);
    const { data, total } = responseData.GetManualDocumentDetails;

    setManualDocumentDetails({
      data: data,
      total: Math.ceil(total / limit),
    });

    log.debug('Manual Documents Breakdown data assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: during request for Manual Documents Breakdown data');
    setManualDocumentDetails(() => {
      throw new Error(error);
    });
  }
};

export const getManualDocumentDetailsForCSV = async (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  limit: number,
  page: number,
) => {
  try {
    log.debug('Executing request: For retrieving Manual Documents Breakdown data ...');
    const responseData = await ExecGraphQL(
      GET_MANUAL_DOCUMENT_DETAILS_QL,
      getManualDocumentFilterInput(fromDate, toDate, BUFilter, limit, page),
    );

    if (responseData && responseData.error) throw new Error(responseData.message);
    const { data } = responseData.GetManualDocumentDetails;

    log.debug('Returning request: For retrieving Manual Documents Breakdown data ...');
    return data;
  } catch (error) {
    log.warn('Unhandled Error: during request for Manual Documents Breakdown data');
  }
};

export default getProcessingTypesCount;
