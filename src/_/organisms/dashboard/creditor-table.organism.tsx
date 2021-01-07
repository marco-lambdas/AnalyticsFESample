import React from 'react';
import { MoreVertical } from 'react-feather';

import {
  CardHeader,
  CardContent,
  IconButton,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Button,
  Typography,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';

import List from '../../molecules/table-list.molecule';
import CSVDownload from '../../molecules/csv-download.molecule';
import { ICreditorMany } from '../../../interfaces/creditor-tables.interface';
import { Card, Pagination, useStyles } from './creditor-table.styles';
import { TableHooks } from '../../hooks/Table.hooks';
import { TableLogger } from '../../../utils/Logger';

const log = TableLogger();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardTable: React.FC<{
  creditors: ICreditorMany;
  handleListCreditors: (limit: number, page: number, click: boolean) => any;
  handleCSVListCreditors: (limit: number, page: number) => any;
  forTemplate?: boolean;
}> = ({ creditors, handleListCreditors, handleCSVListCreditors, forTemplate }) => {
  log.debug('DashboardTable start... forTemplate:', forTemplate);

  const classes = useStyles();
  const {
    hooks: { open, pages, tableLoading },
    helpers: { handleOpen, handleClose, handlePageChange },
    extra: { tableHeaderLabels, csvHeaders, csvFilename, limit },
  } = TableHooks(handleListCreditors, forTemplate);
  if (!creditors || (creditors && creditors.length === 0)) {
    return (
      <Card mb={6}>
        <CardHeader
          action={<MoreVertical />}
          titleTypographyProps={{ variant: 'h5' }}
          title={forTemplate ? 'Creditor Templates' : 'TOP 10 Creditors'}
          style={{ textAlign: 'left' }}
        />
        <CardContent className={classes.messageCard}>
          <Typography variant="h2">No Creditors Retrieved</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <CSVDownload
              handleCSVFetch={handleCSVListCreditors}
              csvFilename={csvFilename}
              csvHeaders={csvHeaders}
              limit={limit}
              pages={pages}
              forTemplate={forTemplate}
            />
          </Toolbar>
        </AppBar>
        <List open={open} labels={tableHeaderLabels} creditors={creditors} />
        <Pagination mb={10} count={pages} className={classes.paginateArea} onChange={handlePageChange} />
      </Dialog>

      <Button onClick={handleOpen} fullWidth={true}>
        <Card mb={6} className={classes.tableCard}>
          <CardHeader
            action={<MoreVertical />}
            titleTypographyProps={{ variant: 'h5' }}
            title={forTemplate ? 'Creditor Templates' : 'TOP 10 Creditors'}
            style={{ textAlign: 'left' }}
          />
          <List open={open} labels={tableHeaderLabels} creditors={creditors} />
        </Card>
      </Button>

      <Backdrop className={classes.backdrop} open={tableLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default DashboardTable;
