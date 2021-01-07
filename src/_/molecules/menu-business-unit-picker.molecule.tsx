import React from 'react';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { TypoDark, TypoWhite } from '../organisms/dashboard/common.styles';

const MenuBUFilter: React.FC<{ setBUFilter: React.Dispatch<React.SetStateAction<string[]>> }> = ({ setBUFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [displayCurrentFilter, setDisplayCurrentFilter] = React.useState('All Business Units');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBUFilter = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const datePicked = event.currentTarget.dataset.myValue;
    let BUFilter: string[] = [];

    if (datePicked === 'All') {
      BUFilter = ['QLD', 'NSW'];
      setDisplayCurrentFilter('All Business Units');
    } else if (datePicked === 'QLD') {
      BUFilter = ['QLD'];
      setDisplayCurrentFilter('QLD Business Unit');
    } else if (datePicked === 'NSW') {
      BUFilter = ['NSW'];
      setDisplayCurrentFilter('NSW Business Unit');
    }

    setBUFilter(BUFilter);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          {displayCurrentFilter}
        </TypoWhite>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleBUFilter} data-my-value={'All'}>
          <TypoDark variant="body2" display="inline">
            All Business Units
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleBUFilter} data-my-value={'QLD'}>
          <TypoDark variant="body2" display="inline">
            QLD
          </TypoDark>
        </MenuItem>
        <MenuItem onClick={handleBUFilter} data-my-value={'NSW'}>
          <TypoDark variant="body2" display="inline">
            NSW
          </TypoDark>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuBUFilter;
