import React from 'react';

import { Grid } from '@material-ui/core';

import MenuDatePicker from '../../molecules/menu-date-picker.molecule';
import MenuBUFilter from '../../molecules/menu-business-unit-picker.molecule';
import { Props } from '../../../interfaces/dashboard-filters.interface';
import { useStyles } from './dashboard-filters.styles';

const FilterData: React.FunctionComponent<Props & { setBUFilter: React.Dispatch<React.SetStateAction<string[]>> }> = (
  Props,
) => {
  const classes = useStyles();
  const { handleFromDate, handleToDate, handleLastFromDate, handleLastToDate, setBUFilter } = Props;

  return (
    <React.Fragment>
      <div>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <MenuBUFilter setBUFilter={setBUFilter} />
          </Grid>
          <Grid item className={classes.root}>
            <MenuDatePicker
              handleFromDate={handleFromDate}
              handleToDate={handleToDate}
              handleLastFromDate={handleLastFromDate}
              handleLastToDate={handleLastToDate}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default FilterData;
