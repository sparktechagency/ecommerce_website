import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { message } from 'antd';
import { setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://backend.alansarilaw.com',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { logInUser: { accessToken?: string } }).logInUser.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithLogoutOnError = async (
    args: Parameters<typeof baseQuery>[0],
    api: Parameters<typeof baseQuery>[1],
    extraOptions: Parameters<typeof baseQuery>[2]
) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        // Log out user and clear session
        api.dispatch(setUser({ user: null, token: null }));
        message.error('Session expired. Please log in again.');
        window.location.href = '/auth/login';
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithLogoutOnError,
    tagTypes: ['privacy', 'awards', 'updates', 'events', 'newsletters', 'sectors', 'peopleManagement', 'csr', 'profile', 'AboutCount', 'SocialMedia', 'updateHomeContent'],
    endpoints: () => ({}),
});
