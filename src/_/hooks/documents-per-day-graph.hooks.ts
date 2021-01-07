import { useState, useEffect } from 'react';
import { IMainFilters } from '../../interfaces/documents-per-day-graph.interface';
import { DocumentTypes } from '../../interfaces/enums/default.enum';

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

export const CheckboxesHooks = (mainFilters: IMainFilters) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [docTypes, setDocTypes] = useState<string[]>([DocumentTypes.AllDocuments]);
  const [docsConfirmed, setDocsConfirmed] = useState<string[]>([DocumentTypes.AllDocuments]);
  const [check, setCheck] = useState(checkedInitialValues);

  useEffect(() => {
    setDocTypes([DocumentTypes.AllDocuments]);
    setDocsConfirmed([DocumentTypes.AllDocuments]);
    for (const item of checkboxes) {
      checkedInitialValues[item.value] = false;
      if (item.value === DocumentTypes.AllDocuments) checkedInitialValues[DocumentTypes.AllDocuments] = true;
      setCheck(checkedInitialValues);
    }
  }, [mainFilters.fromDate, mainFilters.toDate, mainFilters.BUFilter]);

  return {
    hooks: {
      anchorEl,
      setAnchorEl,
      docTypes,
      setDocTypes,
      docsConfirmed,
      setDocsConfirmed,
      check,
      setCheck,
    },
  };
};
