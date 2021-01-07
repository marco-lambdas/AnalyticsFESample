import React from 'react';

import { IconButton, Checkbox, FormControlLabel, Menu, MenuItem } from '@material-ui/core';
import { MoreVertical } from 'react-feather';

import { DocumentTypes } from '../../interfaces/enums/default.enum';
import { Button } from './checkboxes.styles';
import { TypoDark, TypoWhite } from '../organisms/dashboard/common.styles';

// setup for checkboxes filters and also data points colors
const checkboxes = [
  { label: 'Total', value: DocumentTypes.AllDocuments },
  { label: 'Invoice', value: DocumentTypes.Invoice },
  { label: 'Reimbursement Form', value: DocumentTypes.Reimbursment },
  { label: 'Management Remittance Advice', value: DocumentTypes.Remittance },
  { label: 'Insurance Renewal Invoice', value: DocumentTypes.Insurance },
  { label: 'Bank Statement', value: DocumentTypes.Bank },
];

const checkedInitialValues: any = {};

for (const item of checkboxes) {
  checkedInitialValues[item.value] = false;
  if (item.value === DocumentTypes.AllDocuments) checkedInitialValues[DocumentTypes.AllDocuments] = true;
}

const CheckBoxes: React.FC<{
  handleLineGraphData: (docTypes: string[]) => void;
  hooks: any;
}> = ({ handleLineGraphData, hooks }) => {
  const { anchorEl, setAnchorEl, docTypes, setDocTypes, docsConfirmed, setDocsConfirmed, check, setCheck } = hooks;

  const handleOpenFIlters = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = (confirmedDocs?: string[]) => {
    const docsChecked = confirmedDocs ? confirmedDocs : docsConfirmed;
    for (const item of checkboxes) {
      if (docsChecked.includes(item.value)) check[item.value] = true;
      else check[item.value] = false;
    }
    if (docsChecked.length === 0) {
      check[DocumentTypes.AllDocuments] = true;
      docsChecked.push(DocumentTypes.AllDocuments);
    }
    setCheck({ ...check });
    setDocTypes([...docsChecked]);
    setAnchorEl(null);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      docTypes.push(value);
      setDocTypes(docTypes);
      setCheck({ ...check, [value]: true });
    } else {
      const newDocTypes = docTypes.filter((item: string) => item !== value);
      setDocTypes(newDocTypes);
      setCheck({ ...check, [value]: false });
    }
  };

  const handleSubmitFilter = async () => {
    setDocsConfirmed([...docTypes]);
    handleLineGraphData(docTypes);
    handleCloseFilters([...docTypes]);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="settings" onClick={handleOpenFIlters}>
        <MoreVertical />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleCloseFilters()}
      >
        {checkboxes && checkboxes.length > 0
          ? checkboxes.map((item) => (
              <MenuItem key={item.label}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check[item.value]}
                      value={item.value}
                      color="default"
                      onChange={handleOnChange}
                    />
                  }
                  label={
                    <TypoDark variant="body2" display="inline">
                      {item.label}
                    </TypoDark>
                  }
                />
              </MenuItem>
            ))
          : null}
        <MenuItem>
          <Button autoFocus variant="contained" size="small" color="secondary" onClick={handleSubmitFilter}>
            <TypoWhite variant="body1" display="inline">
              Filter
            </TypoWhite>
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default CheckBoxes;
