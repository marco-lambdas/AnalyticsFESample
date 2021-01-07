import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

import { Card as MuiCard, TableCell as MuiTableCell, TableRow as MuiTableRow, Theme } from '@material-ui/core';
import { Pagination as MuiPagination } from '@material-ui/lab';

export const Pagination = styled(MuiPagination)(spacing);

export const Bold = styled.div`
  font-weight: 700;
`;

export const Card = styled(MuiCard)`
  height: 475px;
  margin-bottom: 20px;
`;

export const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

export const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

export const TableRow = styled(MuiTableRow)`
  height: 42px;
  cursor: pointer;
`;

export const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    appBar: {
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    paginateArea: { margin: 'auto' },
    csvWrapper: { position: 'absolute', right: 20 },
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
