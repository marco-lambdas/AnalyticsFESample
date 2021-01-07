import styled from 'styled-components';

import { spacing } from '@material-ui/system';
import { Card as MuiCard, Button as MuiButton } from '@material-ui/core';

export const Card = styled(MuiCard)(spacing);

export const ChartWrapper = styled.div`
  position: relative;
  height: 378px;
`;

export const MessageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 35%;
  tansform: translate(-50%, -50%);
`;

export const Button = styled(MuiButton)`
  background-color: #58595b;
`;
