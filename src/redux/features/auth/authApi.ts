import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        logIn: builder.mutation({
            query: (LogInData) => ({
                url: '/auth/login',
                method: 'POST',
                body: LogInData,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: email,
            }),
        }),

        verifyEmail: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),

        resetAdminPassword: builder.mutation({
            query: ({ email, data }) => ({
                url: `/auth/reset-password?email=${email}`,
                method: 'POST',
                body: data,
            }),
        }),

        changeAdminPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/change-password',
                method: 'PATCH',
                body: data,
            }),
        }),

        editAdminProfile: builder.mutation({
            query: (data) => ({
                url: '/auth/edit-profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),

        getAdminProfile: builder.query({
            query: () => ({
                url: `/auth/profile`,
                method: 'GET',
            }),
            providesTags: ['profile'],
        }),

    }),
});

export const { useLogInMutation, useForgetPasswordMutation, useVerifyEmailMutation, useResetAdminPasswordMutation, useChangeAdminPasswordMutation, useEditAdminProfileMutation, useGetAdminProfileQuery } = authApi;