import { DocumentTypes } from './enums/default.enum';

export interface ILineGraphValues {
  graphLabels?: string[] | null;
  graphValues?: any;
  graphValueLabels?: string[] | null;
  loading?: boolean;
}

export interface IHookSetup {
  queryArgs: string;
  documentQueries: string;
  variables: any;
  graphLabels: string[];
  breakArrayInto: number;
}

export interface IHookFilters {
  fromDate: string;
  toDate: string;
  BUFilter: string[];
}

export interface IMainFilters {
  fromDate?: string;
  toDate?: string;
  BUFilter?: string[];
}

export const HookSetupInitialValues = () => ({
  queryArgs: '',
  documentQueries: '',
  variables: {},
  graphLabels: [],
  breakArrayInto: 0,
});

export const HookFiltersInititalValues = (fromDate: string, toDate: string, BUFilter: string[]) => {
  return {
    fromDate: fromDate,
    toDate: toDate,
    BUFilter: BUFilter,
  };
};

export const lineGrahpValuesInitial: ILineGraphValues = {
  graphLabels: null,
  graphValues: null,
  graphValueLabels: [
    DocumentTypes.Invoice,
    DocumentTypes.Reimbursment,
    DocumentTypes.Remittance,
    DocumentTypes.Insurance,
    DocumentTypes.Bank,
  ],
  loading: true,
};
