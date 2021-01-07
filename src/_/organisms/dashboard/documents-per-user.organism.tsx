import React from 'react';

import { blue } from '@material-ui/core/colors';
import { CardHeader, CardContent, IconButton, Typography } from '@material-ui/core';

import { Bar } from 'react-chartjs-2';
import { MoreVertical } from 'react-feather';
import '../../../vendor/roundedBarCharts';

import { IBarGraphValues } from '../../../interfaces/documents-per-user.interface';
import { Card, ChartWrapper, MessageWrapper } from './documents-per-user.styles';

const MessageCard: React.FC<{ barGraph: IBarGraphValues }> = ({ barGraph }) => {
  if (!barGraph.labels?.length) {
    return (
      <MessageWrapper>
        <Typography variant="h2">No users processed any data</Typography>
      </MessageWrapper>
    );
  }
  return null;
};

const BarChart: React.FC<{ barGraph: IBarGraphValues }> = ({ barGraph }) => {
  const data = {
    labels: barGraph.labels,
    datasets: [
      {
        label: 'Documents Processed',
        backgroundColor: blue[500],
        borderColor: blue[500],
        hoverBackgroundColor: blue[500],
        hoverBorderColor: blue[500],
        data: barGraph.values,
        barPercentage: 0.75,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 2,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: false,
          ticks: {
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: 'transparent',
          },
        },
      ],
    },
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title={<Typography variant="h5">Documents per User</Typography>}
      />

      <CardContent>
        <ChartWrapper>
          <MessageCard barGraph={barGraph} />
          <Bar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default BarChart;
