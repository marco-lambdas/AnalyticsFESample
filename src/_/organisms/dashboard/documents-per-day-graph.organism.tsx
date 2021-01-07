import React from 'react';
import { withTheme, ThemeProps } from 'styled-components';

import { CardContent, CardHeader, Theme, Typography } from '@material-ui/core';
import { blue, purple, yellow, lightGreen, red, blueGrey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Skeleton from '@material-ui/lab/Skeleton';
import { Line } from 'react-chartjs-2';

import { Card, ChartWrapper, MessageWrapper, useStyles } from './documents-per-day-graph.styles';
import { ILineGraphValues, IMainFilters } from '../../../interfaces/documents-per-day-graph.interface';
import { DocumentTypes } from '../../../interfaces/enums/default.enum';
import Checkboxes from '../../molecules/checkboxes.molecule';
import { CheckboxesHooks } from '../../hooks/documents-per-day-graph.hooks';
import moment from 'moment';

const lineColors: any = {};

lineColors[DocumentTypes.Invoice] = blueGrey[500];
lineColors[DocumentTypes.Reimbursment] = purple[500];
lineColors[DocumentTypes.Remittance] = red[500];
lineColors[DocumentTypes.Insurance] = yellow[400];
lineColors[DocumentTypes.Bank] = lightGreen['A400'];

const MessageCard: React.FC<{ graphValues: number[] | null }> = ({ graphValues }) => {
  if (!graphValues) {
    return (
      <MessageWrapper>
        <Typography variant="h2">No Documents Retrieved</Typography>
      </MessageWrapper>
    );
  }
  return null;
};

const LineChart: React.FC<
  { theme: ThemeProps<Theme> & { palette: any } } & {
    lineGraph: ILineGraphValues;
    handleLineGraphData: (docTypes: string[]) => void;
    mainFilters: IMainFilters;
  }
> = ({ theme, lineGraph, mainFilters, handleLineGraphData }) => {
  const classes = useStyles();
  const data = (canvas: any) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fade(theme.palette.primary.light, 0.0875));
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const valueLabels = (lineGraph && lineGraph.graphValueLabels) || 'Documents';
    const values = lineGraph && lineGraph.graphValues;
    const dateToday = moment().format('YYYY-MM-DD');
    const dateFilterStart = mainFilters?.fromDate?.split(' ')[0];
    const dateFilterEnd = mainFilters?.toDate?.split(' ')[0];
    const isWithinDateRange = moment(dateToday).isBefore(dateFilterEnd) && moment(dateToday).isAfter(dateFilterStart);
    if (isWithinDateRange && values && values.length >= 1) {
      values[0].length = moment(dateToday).date();
    }

    const graphDatasets: any = [];
    const max = valueLabels.length;

    for (let i = 0; i < max; i++) {
      const color = lineColors[valueLabels[i]] || blue[500];

      graphDatasets.push({
        label: valueLabels[i],
        fill: true,
        backgroundColor: gradient,
        borderColor: color,
        data: values && values[i],
      });
    }

    return {
      labels: lineGraph.graphLabels,
      datasets: graphDatasets,
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        fontFamily: 'Helvetica Neue',
        boxWidth: 20,
      },
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: 'rgba(0,0,0,0.0)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: 'rgba(0,0,0,0.0375)',
            fontColor: '#fff',
          },
        },
      ],
    },
  };

  const { hooks } = CheckboxesHooks(mainFilters);
  return (
    <Card mb={3}>
      {lineGraph.loading ? (
        <Skeleton variant="rect" animation="wave" className={classes.graphs} />
      ) : (
        <>
          <CardHeader
            action={<Checkboxes handleLineGraphData={handleLineGraphData} hooks={hooks} />}
            title={<Typography variant="h5">Total Documents per Day</Typography>}
          />
          <CardContent>
            <ChartWrapper>
              <MessageCard graphValues={lineGraph.graphValues} />
              <Line data={data} options={options} />
            </ChartWrapper>
          </CardContent>
        </>
      )}
    </Card>
  );
};
export default withTheme(LineChart);
