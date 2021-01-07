import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import { Card as MuiCard } from '@material-ui/core';

export const Card = styled(MuiCard)(spacing);

export const ChartWrapper = styled.div`
  position: relative;
  height: 378px;
`;

export const MessageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
`;

export const useStyles = makeStyles(() => ({
  graphs: {
    '@media (min-width: 1200px)': {
      height: '57vh',
    },
    '@media (min-width: 1440px)': {
      height: '54vh',
    },
    '@media (min-width: 1920px)': {
      height: '45vh',
    },
    '@media (min-width: 2560px)': {
      height: '34vh',
    },
    '@media (min-width: 3840px)': {
      height: '25vh',
    },
  },
}));
