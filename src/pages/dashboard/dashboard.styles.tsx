import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid as MuiGrid, Divider as MuiDivider, Typography as MuiTypography } from '@material-ui/core';
import { spacing } from '@material-ui/system';

export const Divider = styled(MuiDivider)(spacing);

export const Typography = styled(MuiTypography)(spacing);

export const Grid = styled(MuiGrid)(spacing);

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
