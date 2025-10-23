export interface TermsAndConditionsData {
  id: string;
  userId: string;
  heading: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermsAndConditionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TermsAndConditionsData;
}



// redux/features/terms/termsApi.ts
import { baseApi } from "@/redux/api/baseApi";
// import { TermsAndConditionsResponse } from "@/types/termsAndConditions";

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<TermsAndConditionsResponse, void>({
      query: () => ({
        url: "/terms-&-conditions",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTermsAndConditionsQuery } = termsAndConditionsApi;
