import React, { useContext } from 'react';
import moment from 'moment';

import { Helmet } from 'react-helmet';
// import { green } from '@material-ui/core/colors';    # removed temporarily
import Skeleton from '@material-ui/lab/Skeleton';
import Actions from '../../_/organisms/dashboard/dashboard-filters.organism';
import LineChart from '../../_/organisms/dashboard/documents-per-day-graph.organism';
import DoughnutChart from '../../_/organisms/dashboard/process-types.organism';
import Stats from '../../_/organisms/dashboard/document-stats.organism';
import Table from '../../_/organisms/dashboard/creditor-table.organism';
import BarChart from '../../_/organisms/dashboard/documents-per-user.organism';
import ErrorBoundry from '../../_/molecules/error-boundary.molecule';

import { IndexHooks } from './dashboard.hooks';
import { Grid, Divider, Typography, useStyles } from './dashboard.styles';
import { UserContext } from '../../provider/UserProvider';

const today = moment().format('dddd, DD MMMM YYYY');

const DefaultContent = () => {
  const classes = useStyles();
  const {
    mainFiltersHooks: { fromDate, toDate, BUFilter, setBUFilter },
    graphHooks: {
      statsValues,
      doughnutChartValues,
      lineGraph,
      creditors,
      creditorsForDocTemplate,
      barGraph,
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
  } = IndexHooks();
  const [authUser] = useContext(UserContext);

  const stats = [
    {
      title: 'Processed Documents',
      amount: statsValues.doc_Proc,
      ...getPercentTextAndColor(statsValues.doc_Proc_percent),
      showText: true,
    },
    {
      title: 'Awaiting Review Documents ',
      amount: statsValues.doc_await_rev,
      ...getPercentTextAndColor(statsValues.doc_await_rev_percent),
      showText: true,
    },
    {
      title: 'Awaiting Validation Documents',
      amount: statsValues.doc_await_val,
      ...getPercentTextAndColor(statsValues.doc_await_val_percent),
      showText: true,
    },
    {
      title: 'Total Documents',
      amount: statsValues.total_num_doc,
      ...getPercentTextAndColor(statsValues.total_num_doc_percent),
      showText: true,
    },
    {
      title: 'Total Invoice Amount',
      amount: totalInvAmt.Amt,
      text: '',
      color: '',
      showText: false,
    },
  ];
  const statsLength = stats.length;

  return (
    <ErrorBoundry>
      <Helmet title="Dashboard" />
      <Grid justify="space-between" container direction="row" spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="h3" display="inline">
            Welcome back, {authUser.firstName}
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
            {today}
          </Typography>
        </Grid>

        <Grid item>
          <Actions
            handleFromDate={handleFromDate}
            handleToDate={handleToDate}
            handleLastFromDate={handleLastFromDate}
            handleLastToDate={handleLastToDate}
            setBUFilter={setBUFilter}
          />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        {stats && statsLength > 0
          ? stats.map(({ title, amount, text, color, showText }) => (
              <Grid item xs={12} sm={12} md={6} lg={3} xl key={title}>
                <Stats
                  title={title}
                  amount={amount ? amount : 'No documents'}
                  percentageText={text}
                  percentagecolor={color}
                  loading={statsValues.loading}
                  showText={showText}
                />
              </Grid>
            ))
          : 'No Stats Card Specified'}
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart
            lineGraph={lineGraph}
            handleLineGraphData={handleLineGraphData}
            mainFilters={{ fromDate, toDate, BUFilter }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart
            doughnutChartValues={doughnutChartValues}
            handleManualDocumentDetails={handleManualDocumentDetails}
            handleCSVManualDocumentDetails={handleCSVManualDocumentDetails}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          {creditors.length === 1 && creditors[0].loading ? (
            <Skeleton variant="rect" className={classes.graphs} animation="wave" />
          ) : (
            <Table
              creditors={creditors}
              handleListCreditors={handleListCreditors}
              handleCSVListCreditors={handleCSVListCreditors}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {creditorsForDocTemplate.length === 1 && creditorsForDocTemplate[0].loading ? (
            <Skeleton variant="rect" className={classes.graphs} animation="wave" />
          ) : (
            <Table
              creditors={creditorsForDocTemplate}
              handleListCreditors={handleListCreditorsForDocTemplate}
              handleCSVListCreditors={handleCSVListCreditorsForDocTemplate}
              forTemplate={true}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {barGraph.loading ? <Skeleton variant="rect" className={classes.graphs} /> : <BarChart barGraph={barGraph} />}
        </Grid>
      </Grid>
    </ErrorBoundry>
  );
};

const Default = () => {
  return (
    <ErrorBoundry>
      <DefaultContent />
    </ErrorBoundry>
  );
};

export default Default;
