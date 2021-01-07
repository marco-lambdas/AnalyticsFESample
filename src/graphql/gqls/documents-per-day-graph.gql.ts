import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { ExecGraphQL } from '../client/client';
import {
  ILineGraphValues,
  IHookFilters,
  IHookSetup,
  HookSetupInitialValues,
  HookFiltersInititalValues,
} from '../../interfaces/documents-per-day-graph.interface';
import { DocumentTypes } from '../../interfaces/enums/default.enum';
import { LineChartLogger } from '../../utils/Logger';

const { AllDocuments } = DocumentTypes;
const log = LineChartLogger();

const getDocumentQueries = (alias: string, queryParameter: string) => {
  return `
      ${alias}: GetDocumentCount(getDocumentCountFilterInput: ${'$' + queryParameter}) {
        count
      }
    `;
};

const QueryWrapper = (queryArgs: string, queries: string) => {
  return gql`
    query GetBarGraphValuesDocumentCount(${queryArgs}) {
      ${queries}
    }
  `;
};

function chunk(array: any, size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

const prepareQueriesAndSetup = (HookFilters: IHookFilters, HookSetup: IHookSetup, docType: string = AllDocuments) => {
  // HookFilters.fromDate now contains the 00:00:00
  const currDateTime = moment(HookFilters.fromDate);
  let currDate = currDateTime.format('YYYY-MM-DD').toString();
  const docTypeAlias = docType.split(' ').join('_');

  while (currDate <= HookFilters.toDate) {
    const dayOfMonth = moment(currDate).format('DD-MMM');
    const dayMonth = dayOfMonth.split('-').join('');
    const queryParameter = `${docTypeAlias}FilterOf${dayMonth}`;
    const alias = docTypeAlias + 'docOf' + dayMonth;

    HookSetup.queryArgs += `${'$' + queryParameter}: GetDocumentCountFilterInput! `;
    HookSetup.documentQueries += getDocumentQueries(alias, queryParameter);
    HookSetup.variables[queryParameter] = {
      docTypes: docType === AllDocuments ? [] : docType,
      fromDate: `${currDate} 00:00:00`,
      toDate: `${currDate} 23:59:59`,
      businessUnits: HookFilters.BUFilter,
    };

    if (!HookSetup.graphLabels.includes(dayOfMonth)) {
      HookSetup.graphLabels.push(dayOfMonth);
      HookSetup.breakArrayInto += 1;
    }
    currDate = moment(currDate).add(1, 'days').format('YYYY-MM-DD').toString();
  }
};

async function getLineGraphValues(
  fromDate: string,
  toDate: string,
  BUFilter: string[],
  docTypes: string[] | [],
  setStateValue: React.Dispatch<React.SetStateAction<ILineGraphValues>>,
) {
  const HookSetup: IHookSetup = HookSetupInitialValues();
  const HookFilters: IHookFilters = HookFiltersInititalValues(fromDate, toDate, BUFilter);
  let isDataRetrieved = 0;
  let graphValues: any = [];
  const documentTypesInput = docTypes && docTypes.length > 0 ? docTypes : [AllDocuments];

  // setup
  for (const doc of documentTypesInput) {
    if (doc === AllDocuments) prepareQueriesAndSetup(HookFilters, HookSetup);
    else prepareQueriesAndSetup(HookFilters, HookSetup, doc);
  }
  const GET_GRAPH_VALUES_DOCUMENT_COUNT_QL = QueryWrapper(HookSetup.queryArgs, HookSetup.documentQueries);

  // execution to get results
  try {
    log.debug('Executing Request: For retrieving lineChart data ...');
    setStateValue({ loading: true });
    const data = await ExecGraphQL(GET_GRAPH_VALUES_DOCUMENT_COUNT_QL, { ...HookSetup.variables });

    if (data && data.error) throw new Error(data.message);

    graphValues = Object.values(data).map((item: any) => {
      isDataRetrieved += item?.count;
      return item.count;
    });

    graphValues = chunk(graphValues, HookSetup.breakArrayInto);

    if (!isDataRetrieved) graphValues = null;

    setStateValue({
      graphLabels: HookSetup.graphLabels,
      graphValues,
      graphValueLabels: documentTypesInput,
    });

    log.debug('LineChart data assigned to a state');
  } catch (error) {
    log.warn('Unhandled Error: During request for LineChart data');
    setStateValue(() => {
      throw new Error(error);
    });
  }
}

export default getLineGraphValues;
