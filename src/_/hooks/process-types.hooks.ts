import { useState } from 'react';

import { IManualDocuments } from '../../interfaces/process-types.interface';

export const DoughnutChartHooks = (handleManualDocumentDetails: any) => {
  const [open, setOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [manualDocDetails, setManualDocDetails] = useState<IManualDocuments>({});
  const limit = 20;
  const tableHeaderLabels = [
    'Batch Instance ID',
    'Document ID',
    'Creditors',
    'Reason for Manual Review',
    'Reason for Manual Validation',
    'Task Owner',
    'Batch Creation Date',
    'Process Time',
  ];
  const csvHeaders = [
    { label: tableHeaderLabels[0], key: 'batchInstanceId' },
    { label: tableHeaderLabels[1], key: 'documentId' },
    { label: tableHeaderLabels[2], key: 'creditors' },
    { label: tableHeaderLabels[3], key: 'reviewError' },
    { label: tableHeaderLabels[4], key: 'validationError' },
    { label: tableHeaderLabels[5], key: 'taskOwner' },
    { label: tableHeaderLabels[6], key: 'batchCreationDate' },
    { label: tableHeaderLabels[7], key: 'processTime' },
  ];
  const manualFullListLabels = [
    'Batch Instance ID',
    'Document ID',
    'Creditors',
    'Reason for Manual Review',
    'Reason for Manual Validation',
    'Task Owner',
    'Batch Creation Date',
    'Process Time',
  ];
  const graphLabels = ['Source', '# of Document', '% Value'];

  const handleOpen = async () => {
    const page = 1;
    setTableLoading(true);
    await handleManualDocumentDetails(setManualDocDetails, limit, page);
    setTableLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = async (_event: object, page: number) => {
    handleManualDocumentDetails(setManualDocDetails, limit, page);
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return {
    hooks: { open, manualDocDetails, setManualDocDetails, tableLoading },
    helpers: { handleOpen, handleClose, handlePageChange },
    labels: { manualFullListLabels, graphLabels },
    extra: { options, csvHeaders, limit },
  };
};
