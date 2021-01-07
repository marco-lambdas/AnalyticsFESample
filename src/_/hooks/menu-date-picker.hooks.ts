import { useState } from 'react';
import moment from 'moment';

const defaultDate = moment().format('YYYY-MM-DD');

export const MenuDateRangeHooks = (
  handleFromDate: any,
  handleToDate: any,
  handleLastFromDate: any,
  handleLastToDate: any,
) => {
  // #### DATE RANGE - Hooks ####
  const [selectedDates, setSelectedDates] = useState({ fromDate: defaultDate, toDate: defaultDate });
  const [open, setOpen] = useState(false);
  // #### MENU DATE PICKER - Hooks ####
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [displayCurrentDate, setDisplayCurrentDate] = useState('Last 7 days');

  // #### DATE RANGE - helpers ####
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleStartDateChange = (date: Date | null) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    setSelectedDates({ ...selectedDates, fromDate: newDate });
  };

  const handleEndDateChange = (date: Date | null) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    setSelectedDates({ ...selectedDates, toDate: newDate });
  };

  const handleSearch = () => {
    const diffDays = moment(selectedDates.toDate).diff(moment(selectedDates.fromDate), 'days') + 1;
    if (diffDays <= 0) {
      return;
    }
    const lastFromDate = moment(selectedDates.fromDate).subtract(diffDays, 'days').format('YYYY-MM-DD');
    const lastToDate = moment(selectedDates.toDate).subtract(diffDays, 'days').format('YYYY-MM-DD');
    const displayFromDate = moment(selectedDates.fromDate).format('DD/MM/YY');
    const displayToDate = moment(selectedDates.toDate).format('DD/MM/YY');
    const displayCurrentDateValue = `${displayFromDate} - ${displayToDate}`;

    handleFromDate(selectedDates.fromDate);
    handleToDate(selectedDates.toDate);
    handleLastFromDate(lastFromDate);
    handleLastToDate(lastToDate);
    setDisplayCurrentDate(displayCurrentDateValue);
    handleCloseDialog();
  };

  // #### MENU DATE PICKER - helpers ####
  const handleAnchorEl = (anchor: any) => {
    setAnchorEl(anchor);
  };

  const handleDisplayCurrentDate = (display: any) => {
    setDisplayCurrentDate(display);
  };

  return {
    hooks: { open, selectedDates, anchorEl, displayCurrentDate },
    helpers: {
      handleOpenDialog,
      handleCloseDialog,
      handleStartDateChange,
      handleEndDateChange,
      handleSearch,
      handleAnchorEl,
      handleDisplayCurrentDate,
    },
  };
};
