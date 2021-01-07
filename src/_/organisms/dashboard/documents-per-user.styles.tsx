import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';

export const Card = styled(MuiCard)`
  margin-top: 4px;
  height: 430px;
`;

export const ChartWrapper = styled.div`
  position: relative;
  height: 340px;
  width: 100%;
`;

export const MessageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  tansform: translate(-50%, -50%);
`;
