import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card as MuiCard } from '@material-ui/core';
import { Pagination as MuiPagination } from '@material-ui/lab';

export const Card = styled(MuiCard)(spacing);

export const Pagination = styled(MuiPagination)(spacing);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'relative' },
    appBar: { position: 'relative', backgroundColor: theme.palette.primary.main },
    messageCard: { height: 100, textAlign: 'center' },
    paginateArea: { margin: 'auto' },
    tableCard: { width: '100%' },
    csvWrapper: { position: 'absolute', right: 0 },
    csvButton: {
      textDecoration: 'none',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
      '&:hover': {
        backgroundColor: theme.palette.success.main,
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
