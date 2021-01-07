import React from 'react';

import { Card, Box, Typography, CardContent, Percentage } from './document-stats.styles';
import Skeleton from '@material-ui/lab/Skeleton';

type StatsPropsType = {
  title: string;
  amount: string;
  percentageText: string;
  percentagecolor: string;
  loading: boolean | undefined;
  showText: boolean;
};

const Stats: React.FC<StatsPropsType> = ({ title, amount, percentageText, percentagecolor, loading, showText }) => {
  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h6" mb={4}>
          {loading ? <Skeleton animation="wave" /> : title}
        </Typography>
        <Typography variant="h4" mb={3}>
          <Box fontWeight="fontWeightRegular">{loading ? <Skeleton animation="wave" /> : amount}</Box>
        </Typography>
        <Percentage variant="subtitle1" mb={4} percentagecolor={percentagecolor}>
          {loading ? (
            <Skeleton animation="wave" />
          ) : (
            <React.Fragment>
              <span>{showText ? percentageText : ''}</span>
              {showText ? 'Since last period' : ''}
            </React.Fragment>
          )}
        </Percentage>
      </CardContent>
    </Card>
  );
};

export default Stats;
