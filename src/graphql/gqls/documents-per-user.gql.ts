import React from 'react';
import gql from 'graphql-tag';
import { ExecGraphQL } from '../client/client';
import { IBarGraphValues } from '../../interfaces/documents-per-user.interface';
import { getUsersFilterInput } from '../../interfaces/inputs/get-document-count-filter.input';
import { BarChartLogger } from '../../utils/Logger';

const log = BarChartLogger();

const LIST_USERS_QL = gql`
  query ListUsers(
    $listUsersFilterInput: ListUsersFilterInput!
    $documentCountFilterUsersProcessed: GetDocumentCountFilterInput!
  ) {
    ListUsers(listUsersFilterInput: $listUsersFilterInput) {
      data {
        firstName
        lastName
        processed: documentCount(getDocumentCountFilterInput: $documentCountFilterUsersProcessed)
      }
    }
  }
`;

const getBarChartValues = async (
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  setBarGraph: React.Dispatch<React.SetStateAction<IBarGraphValues>>,
) => {
  const labels: string[] = [];
  const values: number[] = [];

  try {
    log.debug('Executing Request: For retrieving BarChart data ...');
    setBarGraph({ loading: true });
    const responseData = await ExecGraphQL(LIST_USERS_QL, {
      ...getUsersFilterInput(fromDate, toDate, BUFilter),
    });

    if (responseData && responseData.error) throw new Error(responseData.message);

    const {
      ListUsers: { data },
    } = responseData;

    for (const item of data) {
      labels.push(item.firstName + ' ' + item.lastName);
      values.push(item.processed);
    }

    setBarGraph({
      labels,
      values,
    });

    log.debug('BarChart data assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: During request for BarChart data');
    setBarGraph(() => {
      throw new Error(error);
    });
  }
};

export default getBarChartValues;
