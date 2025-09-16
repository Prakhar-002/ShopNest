

/*
?   Custom modules
*/

// Importing the base API slice from the apiSlice file
// This slice was created using createApi and can be extended with new endpoints
import { apiSlice } from "./apiSlice";

// Importing the USERS_URL constant which holds the base path for user-related API endpoints
import { USERS_URL } from "../constants";


// Extending the base API slice by injecting new endpoints related to users
export const userApiSlice = apiSlice.injectEndpoints({
      // Defining API endpoints using the builder pattern
      endpoints: (builder) => ({

            // Defining a "login" endpoint that sends a POST request to authenticate the user
            login: builder.mutation({

                  // Configuring the query details for this mutation
                  query: (data) => ({

                        // API URL will be: USERS_URL + "/auth"
                        url: `${USERS_URL}/auth`,

                        // HTTP method for this request
                        method: "POST",

                        // Request body contains login data (e.g., email and password)
                        body: data,
                  }),
            }),

            logout: builder.mutation({
                  query: () => ({
                        url: `${USERS_URL}/logout`,
                        method: "POST",
                  }),
            }),

            register: builder.mutation({
                  query: data => ({
                        url: `${USERS_URL}`,
                        method: "POST",
                        body: data,
                  }),
            }),

            profile: builder.mutation({
                  query: data => ({
                        url: `${USERS_URL}/profile`,
                        method: "PUT",
                        body: data,
                  }),
            }),

            getUsers: builder.query({
                  query: () => ({
                        url: USERS_URL,
                  }),
                  providesTags: ['User'],
                  keepUnusedDataFor: 5,
            }),

            deleteUser: builder.mutation({
                  query: (userId) => ({
                        url: `${USERS_URL}/${userId}`,
                        method: "DELETE",
                  }),
            }),

            getUserDetails: builder.query({
                  query: (id) => ({
                        url: `${USERS_URL}/${id}`,
                  }),
                  keepUnusedDataFor: 5,
            }),

            updateUser: builder.mutation({
                  query: (data) => ({
                        url: `${USERS_URL}/${data.userId}`,
                        method: "PUT",
                        body: data,
                  }),
                  invalidatesTags: ["User"]
            }),
      }),
});

export const {
      useLoginMutation,
      useLogoutMutation,
      useRegisterMutation,
      useProfileMutation,
      useGetUsersQuery,
      useDeleteUserMutation,
      useGetUserDetailsQuery,
      useUpdateUserMutation,
} = userApiSlice;

