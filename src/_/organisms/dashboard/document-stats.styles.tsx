import styled from 'styled-components';

import {
  Box as MuiBox,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

export const Card = styled(MuiCard)(spacing);

export const Box = styled(MuiBox)(spacing);

export const Typography = styled(MuiTypography)(spacing);

export const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

export const Percentage = styled(MuiTypography)<{ percentagecolor: string; mb: number }>`
  color: ${(props) => props.theme.palette.grey[600]};

  span {
    color: ${(props) => props.percentagecolor};
    font-familty: 'Montserrat, sans-serif';
    padding-right: 10px;
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;
