import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../backendUrl";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.userToken;

            if (token) {
                headers.set("authorization", `Bearer ${token}`);

                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "users/userInfo",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApi;
