import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import { Button as MuiButton, Typography as MuiTypography } from '@material-ui/core';

export const Typography = styled(MuiTypography)(spacing);

export const ButtonTypography = styled(MuiTypography)`
  color: #58595b;
`;

export const Button = styled(MuiButton)``;

export const DialogButton = styled(MuiButton)`
  &:hover {
    background-color: #fee949;
  }
`;

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
  }),
);
