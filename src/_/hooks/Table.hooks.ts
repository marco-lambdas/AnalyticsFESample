import { useState } from 'react';

export const TableHooks = (handleListCreditors: any, forTemplate?: boolean) => {
  const [open, setOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const limit = 20;

  let tableHeaderLabels;
  let csvHeaders;
  let csvFilename;
  if (forTemplate) {
    tableHeaderLabels = ['Creditor', 'General Templates', 'Customised Templates'];
    csvHeaders = [
      { label: tableHeaderLabels[0], key: 'creditor' },
      { label: tableHeaderLabels[1], key: 'documents_generic' },
      { label: tableHeaderLabels[2], key: 'documents_not_generic' },
    ];
    csvFilename = 'creditorsTemplateSummary.csv';
  } else {
    tableHeaderLabels = [
      'Creditor',
      '# of processed Documents',
      '# of Automatic Processed Documents',
      '# of Manual Processed Documents',
      '# of Documents `In Review`',
      '# of Documents for validation',
    ];
    csvHeaders = [
      { label: tableHeaderLabels[0], key: 'creditor' },
      { label: tableHeaderLabels[1], key: 'documents_processed' },
      { label: tableHeaderLabels[2], key: 'automatic_documents' },
      { label: tableHeaderLabels[3], key: 'manual_documents' },
      { label: tableHeaderLabels[4], key: 'in_review_documents' },
      { label: tableHeaderLabels[5], key: 'documents_for_validation' },
    ];

    csvFilename = 'creditorsDocumentsSummary';
  }

  async function handleOpen() {
    const page = 1;
    setTableLoading(true);
    const pages = await handleListCreditors(limit, page, true);

    setPages(pages);
    setOpen(true);
    setTableLoading(false);
  }

  async function handleClose() {
    await handleListCreditors(10, 1);
    setOpen(false);
  }

  async function handlePageChange(_event: object, page: number) {
    const pages = await handleListCreditors(limit, page, true);
    setPages(pages);
  }

  return {
    hooks: { open, pages, tableLoading },
    helpers: { handleOpen, handleClose, handlePageChange },
    extra: { tableHeaderLabels, csvHeaders, csvFilename, limit },
  };
};
