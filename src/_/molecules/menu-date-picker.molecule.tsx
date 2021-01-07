import React from 'react';
import moment from 'moment';

import { DatePicker } from '@material-ui/pickers';
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { Props } from '../../interfaces/dashboard-filters.interface';
import { TypoDark, TypoWhite } from '../organisms/dashboard/common.styles';
import { Typography, ButtonTypography, DialogButton } from './menu-date-picker.styles';
import { MenuDateRangeHooks } from '../hooks/menu-date-picker.hooks';

const MenuDatePicker: React.FC<Props> = ({ handleFromDate, handleToDate, handleLastFromDate, handleLastToDate }) => {
  const {
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
  } = MenuDateRangeHooks(handleFromDate, handleToDate, handleLastFromDate, handleLastToDate);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleAnchorEl(event.currentTarget);
  };

  const handleDateValue = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const datePicked = event.currentTarget.dataset.myValue;
    let start_date = '';
    let end_date = '';
    let last_start_date = '';
    let last_end_date = '';

    switch (datePicked) {
      case 'Today':
        start_date = moment().format('YYYY-MM-DD');
        end_date = start_date;
        last_start_date = moment().subtract(1, 'days').format('YYYY-MM-DD');
        last_end_date = moment().format('YYYY-MM-DD');
        handleDisplayCurrentDate('Today');
        break;
      case 'Yesterday':
        start_date = moment().subtract(1, 'days').format('YYYY-MM-DD');
        end_date = start_date;
        handleDisplayCurrentDate('Yesterday');
        break;
      case 'Last1Weeks':
        start_date = moment().subtract(6, 'days').format('YYYY-MM-DD');
        end_date = moment().format('YYYY-MM-DD');
        handleDisplayCurrentDate('Last 7 days');
        break;
      case 'Last2Weeks':
        start_date = moment().subtract(13, 'days').format('YYYY-MM-DD');
        end_date = moment().format('YYYY-MM-DD');
        handleDisplayCurrentDate('Last 2 weeks');
        break;
      case 'ThisMonth':
        start_date = moment().date(1).format('YYYY-MM-DD');
        end_date = moment().endOf('month').format('YYYY-MM-DD');
        handleDisplayCurrentDate('This Month');
        break;
      case 'PrevMonth':
        const lastMonth = moment().subtract(1, 'months');
        start_date = lastMonth.date(1).format('YYYY-MM-DD');
        end_date = lastMonth.endOf('month').format('YYYY-MM-DD');
        handleDisplayCurrentDate('Last Month');
        break;
    }

    switch (datePicked) {
      case 'Today':
      case 'Yesterday':
      case 'Last1Weeks':
      case 'Last2Weeks':
        const diffDays = moment(end_date).diff(moment(start_date), 'days') + 1;
        last_start_date = moment(start_date).subtract(diffDays, 'days').format('YYYY-MM-DD');
        last_end_date = moment(end_date).subtract(diffDays, 'days').format('YYYY-MM-DD');
        break;
      case 'ThisMonth':
      case 'PrevMonth':
        const diffMonths = moment(end_date).diff(moment(start_date), 'months') + 1;
        const lastMonth = moment(end_date).subtract(diffMonths, 'months');
        last_start_date = lastMonth.date(1).format('YYYY-MM-DD');
        last_end_date = lastMonth.endOf('month').format('YYYY-MM-DD');
        break;
    }

    handleFromDate(start_date);
    handleToDate(end_date);

    handleLastFromDate(last_start_date);
    handleLastToDate(last_end_date);

    handleAnchorEl(null);
  };

  const handleClose = () => {
    handleAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <TypoWhite variant="body1" display="inline">
          {displayCurrentDate}
        </TypoWhite>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDateValue} data-my-value={'Today'}>
          <TypoDark variant="body2" display="inline">
            Today
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleDateValue} data-my-value={'Yesterday'}>
          <TypoDark variant="body2" display="inline">
            Yesterday
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleDateValue} data-my-value={'Last1Weeks'}>
          <TypoDark variant="body2" display="inline">
            Last 7 days
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleDateValue} data-my-value={'Last2Weeks'}>
          <TypoDark variant="body2" display="inline">
            Last 2 weeks
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleDateValue} data-my-value={'ThisMonth'}>
          <TypoDark variant="body2" display="inline">
            This month
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleDateValue} data-my-value={'PrevMonth'}>
          <TypoDark variant="body2" display="inline">
            Last month
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleOpenDialog} data-my-value={'PrevMonth'}>
          <TypoDark variant="body2" display="inline">
            Date Range
          </TypoDark>
        </MenuItem>
      </Menu>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseDialog} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="body2" display="inline">
            Choose date range to filter data retrieved
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DatePicker
            margin="normal"
            label={
              <Typography variant="body2" display="inline">
                Pick Start Date
              </Typography>
            }
            value={selectedDates.fromDate}
            onChange={handleStartDateChange}
            format="dd/MM/yyyy"
            views={['year', 'month', 'date']}
            showTodayButton={true}
          />
          <br />
          <DatePicker
            margin="normal"
            label={
              <Typography variant="body2" display="inline">
                Pick End Date
              </Typography>
            }
            value={selectedDates.toDate}
            onChange={handleEndDateChange}
            format="dd/MM/yyyy"
            views={['year', 'month', 'date']}
            showTodayButton={true}
          />
        </DialogContent>

        <DialogActions>
          <DialogButton autoFocus onClick={() => handleSearch()}>
            <ButtonTypography variant="h5" display="inline">
              Search
            </ButtonTypography>
          </DialogButton>
          <DialogButton onClick={handleCloseDialog} autoFocus>
            <ButtonTypography variant="h5" display="inline">
              Close
            </ButtonTypography>
          </DialogButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MenuDatePicker;
