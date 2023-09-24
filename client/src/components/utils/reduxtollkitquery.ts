// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Business, BusinessAmount } from "./types";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getBusiness: builder.query<Business[], void>({
      query: () => `/user/get/business/`,
    }),

    AddBusinessExpense: builder.mutation<void, BusinessAmount>({
      query: (body) => ({
        url: `/user/add/amount/`,
        method: "POST",
        body,
      }),
    }),

    AddBusiness: builder.mutation<void, Business>({
      query: (body) => ({
        url: `/user/add/business/`,
        method: "POST",
        body,
      }),
    }),

    dailyExpenseIncome: builder.mutation<BusinessAmount[], string | number>({
      query: (id) => ({
        url: `/user/get/amount/${id}`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBusinessQuery,
  useAddBusinessExpenseMutation,
  useAddBusinessMutation,
  useDailyExpenseIncomeMutation,
} = api;
