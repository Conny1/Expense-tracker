// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Business, BusinessAmount, DeleteUpdate, User } from "./types";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,

    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).AuthSlice.authDetails?.tokens;
      const authDet = localStorage.getItem("user");

      if (authDet) {
        const token = JSON.parse(authDet).token;

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Businessnames", "Incomeexpense", "Daily"],
  endpoints: (builder) => ({
    getBusiness: builder.query<Business[], void>({
      query: () => `/user/get/business/`,
      providesTags: ["Businessnames"],
    }),

    AddBusinessExpense: builder.mutation<void, BusinessAmount>({
      query: (body) => ({
        url: `/user/add/amount/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Incomeexpense"],
    }),

    AddBusiness: builder.mutation<void, Business>({
      query: (body) => ({
        url: `/user/add/business/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Businessnames"],
    }),

    deleteBusinessNames: builder.mutation<void, DeleteUpdate>({
      query: (body) => ({
        url: `/user/deletebusinessnames/${body.business_id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Businessnames", "Incomeexpense"],
    }),

    dailyExpenseIncome: builder.query<BusinessAmount[], string | number>({
      query: (id) => `/user/get/amount/${id}`,
      providesTags: ["Incomeexpense"],
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

    deleteProfitloss: builder.mutation<void, DeleteUpdate>({
      query: (body) => ({
        url: `/user/deleteProfitloss/${body.business_id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Incomeexpense"],
    }),

    editIncomeExpense: builder.mutation<void, BusinessAmount>({
      query: (body) => ({
        url: `/user/editIncomeExpense/${body.business_id}/${body.dateurl}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Incomeexpense"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBusinessQuery,
  useAddBusinessExpenseMutation,
  useAddBusinessMutation,
  useDailyExpenseIncomeQuery,
  useLoginAccountMutation,
  useChangePasswordMutation,
  useVerifyemailMutation,
  useDeleteProfitlossMutation,
  useEditIncomeExpenseMutation,
  useDeleteBusinessNamesMutation,
} = api;
