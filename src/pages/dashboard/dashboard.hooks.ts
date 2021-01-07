import { useState, useEffect } from 'react';
import moment from 'moment';
import { green, red } from '@material-ui/core/colors';

import { statsValuesInital, totalInvAmtInitialValues } from '../../interfaces/document-stats.interface';
import {
  IDoughnutChartValues,
  IManualDocuments,
  doughnutChartInitialValues,
} from '../../interfaces/process-types.interface';
import { ILineGraphValues, lineGrahpValuesInitial } from '../../interfaces/documents-per-day-graph.interface';
import { ICreditorMany, creditorsValuesInitial } from '../../interfaces/creditor-tables.interface';
import { IBarGraphValues } from '../../interfaces/documents-per-user.interface';

import getStatsValues, { getTotalInvoiceAmt } from '../../graphql/gqls/document-stats.gql';
import getProcessingTypesCount, {
  getManualDocumentDetails,
  getManualDocumentDetailsForCSV,
} from '../../graphql/gqls/process-types.gql';
import listCreditors, {
  listCreditorsBasedOnDocTemplateForCSV,
  listCreditorsForCSV,
} from '../../graphql/gqls/creditors-request';
import { listCreditorsBasedOnDocTemplate } from '../../graphql/gqls/creditors-request';
import getLineGraphValues from '../../graphql/gqls/documents-per-day-graph.gql';
import getBarChartValues from '../../graphql/gqls/documents-per-user.gql';

export const IndexHooks = () => {
  const newMoment = moment();
  const defaultDate = newMoment.format('YYYY-MM-DD');
  const weekStart = newMoment.subtract(6, 'days').format('YYYY-MM-DD');
  const diffDays = moment(defaultDate).diff(moment(weekStart), 'days') + 1;
  const lastWeekStart = moment(weekStart).subtract(diffDays, 'days').format('YYYY-MM-DD');
  const lastDefaultDate = moment(defaultDate).subtract(diffDays, 'days').format('YYYY-MM-DD');
  const [, setError] = useState('');

  const fromDateFormat = (date: string) => {
    return `${date} 00:00:00`;
  };

  const endDateFormat = (date: string) => {
    return `${date} 23:59:59`;
  };

  // -------------------- Hooks ----------------------------
  // Filters
  const [fromDate, setFromDate] = useState(fromDateFormat(weekStart));
  const [toDate, setToDate] = useState(endDateFormat(defaultDate));
  const [lastFromDate, setLastFromDate] = useState(lastWeekStart);
  const [lastToDate, setLastToDate] = useState(endDateFormat(lastDefaultDate));
  const [BUFilter, setBUFilter] = useState(['QLD', 'NSW']);

  // Chart values or Table Values
  const [statsValues, setStatValues] = useState(statsValuesInital);
  const [totalInvAmt, setTotalInvAmt] = useState(totalInvAmtInitialValues);
  const [doughnutChartValues, setDoughnutChartValues] = useState<IDoughnutChartValues>(doughnutChartInitialValues);
  const [lineGraph, setLineGraph] = useState<ILineGraphValues>(lineGrahpValuesInitial);
  const [creditors, setCreditors] = useState<ICreditorMany>([creditorsValuesInitial]);
  const [creditorsForDocTemplate, setCreditorsForDocTemplates] = useState<ICreditorMany>([creditorsValuesInitial]);
  const [barGraph, setBarGraph] = useState<IBarGraphValues>({ loading: true });
  const limit = 10;
  const page = 1;

  // -------------------- Helpers ----------------------------
  const handleFromDate = (date: string) => {
    setFromDate(fromDateFormat(date));
  };

  const handleToDate = (date: string) => {
    setToDate(endDateFormat(date));
  };

  const handleLastFromDate = (date: string) => {
    setLastFromDate(date);
  };

  const handleLastToDate = (date: string) => {
    setLastToDate(endDateFormat(date));
  };

  const getPercentTextAndColor = (value: any) => {
    const isMinusValue = parseInt(value, 10) < 0;
    return {
      text: `${isMinusValue ? '-' : '+'}${Math.abs(value)}%`,
      color: isMinusValue ? red[500] : green[500],
    };
  };

  const handleLineGraphData = async (docTypes: string[]) => {
    await getLineGraphValues(fromDate, toDate, BUFilter, docTypes, setLineGraph);
  };

  const handleListCreditors = async (limit: number, page: number, click = false) => {
    const pages = await listCreditors(setCreditors, limit, page, fromDate, toDate, BUFilter, click);
    return pages ? pages : 1;
  };

  const handleCSVListCreditors = async (limit: number, page: number) => {
    const creditors = await listCreditorsForCSV(limit, page, fromDate, toDate, BUFilter);
    return creditors;
  };

  const handleListCreditorsForDocTemplate = async (limit: number, page: number, click = false) => {
    const pages = await listCreditorsBasedOnDocTemplate(
      setCreditorsForDocTemplates,
      limit,
      page,
      fromDate,
      toDate,
      BUFilter,
      click,
    );
    return pages ? pages : 1;
  };

  const handleCSVListCreditorsForDocTemplate = async (limit: number, page: number) => {
    const creditors = await listCreditorsBasedOnDocTemplateForCSV(limit, page, fromDate, toDate, BUFilter);
    return creditors;
  };

  const handleManualDocumentDetails = async (
    setManualDocDetails: React.Dispatch<React.SetStateAction<IManualDocuments>>,
    limit: number,
    page: number,
  ) => {
    await getManualDocumentDetails(fromDate, toDate, BUFilter, limit, page, setManualDocDetails);
  };

  const handleCSVManualDocumentDetails = async (limit: number, page: number) => {
    const data = await getManualDocumentDetailsForCSV(fromDate, toDate, BUFilter, limit, page);
    return data;
  };

  // rerender condition
  useEffect(() => {
    try {
      getStatsValues(fromDate, toDate, lastFromDate, lastToDate, BUFilter, setStatValues);
      getTotalInvoiceAmt(fromDate, toDate, BUFilter, setTotalInvAmt);
      getLineGraphValues(fromDate, toDate, BUFilter, [], setLineGraph);
      getProcessingTypesCount(fromDate, toDate, BUFilter, setDoughnutChartValues);
      listCreditors(setCreditors, limit, page, fromDate, toDate, BUFilter);
      listCreditorsBasedOnDocTemplate(setCreditorsForDocTemplates, limit, page, fromDate, toDate, BUFilter);
      getBarChartValues(fromDate, toDate, BUFilter, setBarGraph);
    } catch (err) {
      setError(() => {
        throw err;
      });
    }
  }, [fromDate, toDate, lastFromDate, lastToDate, BUFilter]);

  return {
    mainFiltersHooks: { fromDate, setFromDate, toDate, setToDate, BUFilter, setBUFilter },
    graphHooks: {
      statsValues,
      doughnutChartValues,
      lineGraph,
      creditors,
      creditorsForDocTemplate,
      barGraph,
      setBarGraph,
      totalInvAmt,
    },
    helpers: {
      handleFromDate,
      handleToDate,
      handleLastFromDate,
      handleLastToDate,
      handleLineGraphData,
      handleListCreditors,
      handleCSVListCreditors,
      handleListCreditorsForDocTemplate,
      handleCSVListCreditorsForDocTemplate,
      handleManualDocumentDetails,
      handleCSVManualDocumentDetails,
      getPercentTextAndColor,
    },
  };
};
