import { baseApi } from "@/redux/api/baseApi";

// ✅ Define a type for the contact info data
export interface ContactUsInfo {
  id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  location: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Inject endpoints
export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET — fetch contact info
    getContactUsInfo: builder.query<{ success: boolean; message: string; data: ContactUsInfo }, void>({
      query: () => ({
        url: "/contact-us-info",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetContactUsInfoQuery } = contactUsApi;
