import React from 'react';
import { withTheme, ThemeProps } from 'styled-components';
import { blue, orange, red } from '@material-ui/core/colors';
import {
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableHead,
  Typography,
  Theme,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import Skeleton from '@material-ui/lab/Skeleton';
import { Doughnut } from 'react-chartjs-2';
import { MoreVertical } from 'react-feather';
import List from '../../molecules/table-list.molecule';
import { IDoughnutChartValues, IManualDocuments } from '../../../interfaces/process-types.interface';
import {
  Pagination,
  Bold,
  Card,
  ChartWrapper,
  DoughnutInner,
  TableRow,
  TableCell,
  useStyles,
} from './process-types.styles';
import { DoughnutChartHooks } from '../../hooks/process-types.hooks';
import CSVDownload from '../../molecules/csv-download.molecule';

const calculateDocumentsOverTotal = (documents: number, total_documents: number, precision: number) => {
  if (total_documents > 0) {
    const multiplier = Math.pow(10, precision || 0);
    const value = (documents / total_documents) * 100;
    return Math.round(value * multiplier) / multiplier;
  }
  return 0;
};

const HeaderLabel: React.FC<{
  AutomaticDocsPercentage: number;
  total_docs: number;
  doughnutChartValues: IDoughnutChartValues;
}> = ({ AutomaticDocsPercentage, total_docs, doughnutChartValues }) => {
  if (total_docs === 0) {
    return (
      <React.Fragment>
        <Typography variant="h4">
          {doughnutChartValues.loading ? (
            <Box display="flex" style={{ width: '100%' }} height={50} justifyContent="center">
              <Skeleton width={50} />
            </Box>
          ) : (
            '0%'
          )}
        </Typography>
        <Typography variant="caption">
          {doughnutChartValues.loading ? (
            <Box display="flex" style={{ width: '100%' }} height={20} justifyContent="center">
              <Skeleton width={50} />
            </Box>
          ) : (
            'No Documents Retrieved'
          )}
        </Typography>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="h4">{doughnutChartValues.loading ? <Skeleton /> : `${AutomaticDocsPercentage}%`}</Typography>
      <Typography variant="caption">Automatic Documents</Typography>
    </React.Fragment>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PieChart: React.FC<
  { theme: ThemeProps<Theme> & { palette: any } } & {
    doughnutChartValues: IDoughnutChartValues;
    handleManualDocumentDetails: (
      setManualDocDetails: React.Dispatch<React.SetStateAction<IManualDocuments>>,
      limit: number,
      page: number,
    ) => void;
    handleCSVManualDocumentDetails: (limit: number, page: number) => any;
  }
> = ({ theme, doughnutChartValues, handleManualDocumentDetails, handleCSVManualDocumentDetails }) => {
  const classes = useStyles();
  const { automatic_docs, manual_docs, total_docs } = doughnutChartValues;
  const AutomaticDocsPercentage = calculateDocumentsOverTotal(automatic_docs, total_docs, 1);
  const ManualDocsPercentage = calculateDocumentsOverTotal(manual_docs, total_docs, 1);
  const {
    hooks: { open, manualDocDetails, tableLoading },
    helpers: { handleClose, handleOpen, handlePageChange },
    labels: { manualFullListLabels, graphLabels },
    extra: { options, csvHeaders, limit },
  } = DoughnutChartHooks(handleManualDocumentDetails);

  const data = {
    labels: ['Automatic', 'Manual'],
    datasets: [
      {
        data: [automatic_docs, manual_docs],
        backgroundColor: [blue[500], red[500], orange[500], theme.palette.grey[200]],
        borderWidth: 5,
      },
    ],
    valuePercent: [AutomaticDocsPercentage, ManualDocsPercentage],
  };

  const graphRows = [
    { label: data.labels[0], value: data.datasets[0].data[0], percent: data.valuePercent[0] },
    { label: data.labels[1], value: data.datasets[0].data[1], percent: data.valuePercent[1] },
  ];

  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <CSVDownload
              handleCSVFetch={handleCSVManualDocumentDetails}
              csvFilename={`processTypes`}
              csvHeaders={csvHeaders}
              limit={limit}
              pages={manualDocDetails.total as number}
            />
          </Toolbar>
        </AppBar>
        <List open={open} labels={manualFullListLabels} manualDocs={manualDocDetails.data} />
        <Pagination
          mb={10}
          count={manualDocDetails.total}
          className={classes.paginateArea}
          onChange={handlePageChange}
        />
      </Dialog>

      <Card>
        <CardHeader
          action={
            doughnutChartValues.loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertical />
              </IconButton>
            )
          }
          title={
            <Typography variant="h5" display="inline">
              {doughnutChartValues.loading ? <Skeleton animation="wave" /> : 'Process Types'}
            </Typography>
          }
        />

        <CardContent>
          <ChartWrapper>
            <DoughnutInner>
              <HeaderLabel
                AutomaticDocsPercentage={AutomaticDocsPercentage}
                total_docs={total_docs}
                doughnutChartValues={doughnutChartValues}
              />
            </DoughnutInner>
            {doughnutChartValues.loading ? (
              <Box display="flex" justifyContent="center">
                <Skeleton animation="wave" variant="circle" width={40} height={40} />
              </Box>
            ) : (
              <Doughnut data={data} options={options} />
            )}
          </ChartWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {graphLabels.map((value) => (
                  <TableCell key={value}>
                    <Typography variant="h6" display="inline">
                      {doughnutChartValues.loading ? <Skeleton animation="wave" /> : <Bold>{value}</Bold>}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : graphRows[0].label}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : graphRows[0].value}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : `${graphRows[0].percent}%`}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow onClick={handleOpen}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : graphRows[1].label}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : graphRows[1].value}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6" display="inline">
                    {doughnutChartValues.loading ? <Skeleton animation="wave" /> : `${graphRows[1].percent}%`}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Backdrop className={classes.backdrop} open={tableLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default withTheme(PieChart);
