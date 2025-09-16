

/*
?   Custom modules
*/

// Importing the base API slice from the apiSlice file
// This slice was created using createApi and can be extended with new endpoints
import { apiSlice } from "./apiSlice";


// Importing the CATEGORY_URL constant which holds the base path for user-related API endpoints
import { CATEGORY_URL } from "../constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            createCategory: builder.mutation({
                  query: (newCategory) => ({
                        url: `${CATEGORY_URL}`,
                        method: "POST",
                        body: newCategory,
                  }),
            }),

            updateCategory: builder.mutation({
                  query: ({ categoryId, updatedCategory }) => ({
                        url: `${CATEGORY_URL}/${categoryId}`,
                        method: "PUT",
                        body: updatedCategory,
                  }),
            }),

            deleteCategory: builder.mutation({
                  query: (categoryId) => ({
                        url: `${CATEGORY_URL}/${categoryId}`,
                        method: "DELETE",
                  }),
            }),

            fetchCategories: builder.query({
                  query: () => ({ url: `${CATEGORY_URL}/categories` }),
            }),
      }),
});

export const {
      useCreateCategoryMutation,
      useUpdateCategoryMutation,
      useDeleteCategoryMutation,
      useFetchCategoriesQuery
} = categoryApiSlice;