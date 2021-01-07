import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { v4 as uuid4 } from 'uuid';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer as MuiTableContainer,
  TableContainerTypeMap,
  Typography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

import { ICreditor, ITableParam } from '../../interfaces/creditor-tables.interface';
import { IManualDocumentDetails } from '../../interfaces/process-types.interface';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
  }),
);

const Paper = styled(MuiPaper)(spacing);

const TableContainerMinHeight: OverridableComponent<TableContainerTypeMap<{}, 'div'>> = styled(MuiTableContainer)`
  height: 370px;
`;

const TableContainerMaxHeight: OverridableComponent<TableContainerTypeMap<{}, 'div'>> = styled(MuiTableContainer)`
  height: 80vh;
`;

const Bold = styled.div`
  font-weight: 600;
`;

const TableContent = (props: ITableParam) => {
  const { labels, creditors, manualDocs } = props;
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {labels.map((label: string) => (
            <TableCell key={label}>
              <Typography variant="h6" display="inline">
                <Bold>{label}</Bold>
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {creditors && creditors.length > 0 ? (
          creditors.map((row: ICreditor) => {
            // TODO:NM: change
            if (Object.keys(row).length > 3) {
              return (
                <TableRow key={uuid4()}>
                  <TableCell component="th" scope="row">
                    <Typography variant="h6" display="inline">
                      {row.creditor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.documents_processed}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.automatic_documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.manual_documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.in_review_documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.documents_for_validation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.assignee}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            } else {
              return (
                <TableRow key={uuid4()}>
                  <TableCell component="th" scope="row">
                    <Typography variant="h6" display="inline">
                      {row.creditor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.documents_generic}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" display="inline">
                      {row.documents_not_generic}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            }
          })
        ) : manualDocs ? (
          manualDocs.map((row: IManualDocumentDetails) => {
            row.processTime = moment
              .duration(moment(parseInt(row.transactionDt)).diff(moment(parseInt(row.docDateTime))))
              .humanize();
            row.batchCreationDate = moment(parseInt(row.batchCreationDate)).format('DD/MM/YYYY');
            return (
              <TableRow key={uuid4()}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" display="inline">
                    {row.batchInstanceId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.documentId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.creditors}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.reviewError}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.validationError}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.taskOwner}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.batchCreationDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" display="inline">
                    {row.processTime}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell component="th" scope="row" colSpan={6}>
              <Typography variant="h5" display="inline">
                <Bold>No Creditors Retrieved </Bold>
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const List = (props: ITableParam) => {
  const classes = useStyles();
  const { labels, open, creditors, manualDocs } = props;

  if (open) {
    return (
      <Paper className={classes.root}>
        <TableContainerMaxHeight>
          <TableContent labels={labels} creditors={creditors} manualDocs={manualDocs} />
        </TableContainerMaxHeight>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.root}>
        <TableContainerMinHeight>
          <TableContent labels={labels} creditors={creditors} manualDocs={manualDocs} />
        </TableContainerMinHeight>
      </Paper>
    );
  }
};

export default List;
