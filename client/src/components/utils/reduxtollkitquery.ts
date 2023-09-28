// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Business, BusinessAmount, User, getBusinessData } from "./types";

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

    weeklyExpenseIncome: builder.mutation<getBusinessData[], string | number>({
      query: (id) => ({
        url: `/user/get/week/${id}`,
        method: "POST",
      }),
    }),

    MonthlyExpenseIncome: builder.mutation<getBusinessData[], string | number>({
      query: (id) => ({
        url: `/user/get/month/${id}`,
        method: "POST",
      }),
    }),

    loginAccount: builder.mutation<User, User>({
      query: (body) => ({
        url: `/auth/login/`,
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<void, User>({
      query: (body) => ({
        url: `/auth/changepassword/`,
        method: "PUT",
        body,
      }),
    }),

    verifyemail: builder.mutation<User[], User>({
      query: (body) => ({
        url: `/auth/verifyemail/`,
        method: "POST",
        body,
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
  useWeeklyExpenseIncomeMutation,
  useMonthlyExpenseIncomeMutation,
  useLoginAccountMutation,
  useChangePasswordMutation,
  useVerifyemailMutation,
} = api;
