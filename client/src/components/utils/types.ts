export type Business = {
  business_id?: string | number;
  business_name: string;
};

export type BusinessAmount = {
  business_id?: string | number;
  income: number;
  expense: number;
  transaction_date: Date | string;
  description?: string;
};

export type getBusinessData = {
  year?: number;
  month?: number;
  week_in_month?: number;
  transaction_date?: Date | string;
  business_id?: string | number;
  total_income: number;
  total_expense: number;
};

export type User = {
  email: string;
  password?: string;
  token?: string;
};

export type DeleteUpdate = {
  transaction_date?: Date | string;
  business_id?: string | number;
};
