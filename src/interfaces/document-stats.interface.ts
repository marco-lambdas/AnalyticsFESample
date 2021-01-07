export interface IStatsAmt {
  doc_Proc?: string;
  doc_Proc_percent?: string;
  doc_await_rev?: string;
  doc_await_rev_percent?: string;
  doc_await_val?: string;
  doc_await_val_percent?: string;
  total_num_doc?: string;
  total_num_doc_percent?: string;
  total_inv_amt?: string;
  loading?: boolean;
}

export interface ITotalInvoiceAmt {
  Amt?: string;
  loading?: boolean;
}

// initial values

export const totalInvAmtInitialValues: ITotalInvoiceAmt = {
  Amt: 'No Amount to display',
  loading: true,
};

export const statsValuesInital: IStatsAmt = {
  doc_await_rev: '',
  total_num_doc: '',
  total_inv_amt: '',
  loading: true,
};
