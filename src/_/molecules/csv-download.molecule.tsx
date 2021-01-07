import { Button, CircularProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { creditorsValuesInitial, ICreditorMany } from '../../interfaces/creditor-tables.interface';
import { useStyles } from '../organisms/dashboard/creditor-table.styles';
import { TableLogger } from '../../utils/Logger';

const log = TableLogger();

interface CSVDownloadProps {
  handleCSVFetch: (limit: number, page: number) => any;
  csvFilename: string;
  csvHeaders: any;
  limit: number;
  pages: number;
  forTemplate?: boolean | undefined;
}

const CSVDownload: React.FC<CSVDownloadProps> = ({
  handleCSVFetch,
  csvFilename,
  csvHeaders,
  limit,
  pages,
  forTemplate,
}) => {
  const classes = useStyles();
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvData, setCsvData] = useState<ICreditorMany>([creditorsValuesInitial]);
  const csvLink = useRef<any>();

  const handleCSVDownload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    log.debug('DashboardTable:handleCSVDownload forTemplate:', forTemplate);
    const totalCreditors = limit * pages;
    const creditorsPerQuery = 50;
    const totalPages = Math.ceil(totalCreditors / creditorsPerQuery);
    let csvCreditorsArr: ICreditorMany = [];
    let currentPage = 0;
    setCsvLoading(true);
    while (currentPage !== totalPages) {
      log.debug('totalPages - currentPage', totalPages - currentPage);
      if (totalPages - currentPage >= 3) {
        const result = await Promise.all([
          handleCSVFetch(creditorsPerQuery, currentPage + 1),
          handleCSVFetch(creditorsPerQuery, currentPage + 2),
          handleCSVFetch(creditorsPerQuery, currentPage + 3),
        ]);
        // merges the arrays into a single array
        const mergedArray = [].concat(...result);
        csvCreditorsArr = [...csvCreditorsArr, ...mergedArray];
        currentPage += 3;
      } else if (totalPages - currentPage >= 2) {
        const result = await Promise.all([
          handleCSVFetch(creditorsPerQuery, currentPage + 1),
          handleCSVFetch(creditorsPerQuery, currentPage + 2),
        ]);
        // merges the arrays into a single array
        const mergedArray = [].concat(...result);
        csvCreditorsArr = [...csvCreditorsArr, ...mergedArray];
        currentPage += 2;
      } else {
        const result = await handleCSVFetch(creditorsPerQuery, currentPage + 1);
        csvCreditorsArr = [...csvCreditorsArr, ...result];
        currentPage++;
      }
    }
    setCsvData(csvCreditorsArr);
    csvLink.current.link.click();
    setCsvLoading(false);
  };

  return (
    <div className={classes.csvWrapper}>
      {csvLoading ? (
        <Button variant="contained" className={classes.csvButton} disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button variant="contained" className={classes.csvButton} onClick={handleCSVDownload}>
          <Typography variant="button" display="inline">
            export to csv
          </Typography>
        </Button>
      )}
      <CSVLink
        data={csvData}
        filename={`${csvFilename}-${moment().format('DD/MM/YYYY')}.csv`}
        headers={csvHeaders}
        target="_blank"
        ref={csvLink}
      />
    </div>
  );
};

export default CSVDownload;
