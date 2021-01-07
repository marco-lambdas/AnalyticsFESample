import { ErrorInfo } from 'react';
import log from 'loglevel';

const commonlevel: any = process.env.REACT_APP_LOGGERLEVEL || 'DEBUG';
const warnlevel = 'WARN';

log.getLogger('errorBoundary-component').setLevel(warnlevel);
log.getLogger('Stats-component').setLevel(commonlevel);
log.getLogger('LineChart-component').setLevel(commonlevel);
log.getLogger('DoughnutChart-component').setLevel(commonlevel);
log.getLogger('Table-component').setLevel(commonlevel);
log.getLogger('BarChart-component').setLevel(commonlevel);

export const StatsLogger = () => {
  return log.getLogger('Stats-component');
};

export const LineChartLogger = () => {
  return log.getLogger('LineChart-component');
};

export const DoughnutChartLogger = () => {
  return log.getLogger('DoughnutChart-component');
};

export const TableLogger = () => {
  return log.getLogger('Table-component');
};

export const BarChartLogger = () => {
  return log.getLogger('BarChart-component');
};

export const ErrorBoundaryLogger = (error: Error, errorInfo: ErrorInfo) => {
  const errorBoundaryLogger = log.getLogger('errorBoundary-component');
  errorBoundaryLogger.error(error);
  errorBoundaryLogger.error(errorInfo);
};
