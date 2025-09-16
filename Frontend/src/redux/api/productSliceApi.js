

/*
?   Custom modules
*/

// Importing the base API slice from the apiSlice file
// This slice was created using createApi and can be extended with new endpoints
import { apiSlice } from "./apiSlice";


// Importing the PRODUCT_URL constant which holds the base path for user-related API endpoints
import { PRODUCT_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            getProducts: builder.query({
                  query: ({ keyword }) => ({
                        url: `${PRODUCT_URL}`,
                        params: { keyword },
                  }),

                  keepUnusedDataFor: 5,
                  providesTags: ["Product"]
            }),

            getProductById: builder.query({
                  query: (productId) => `${PRODUCT_URL}/${productId}`,
                  providesTags: (result, error, productId) => [
                        { type: "Product", id: productId },
                  ],
            }),

            allProducts: builder.query({
                  query: () => `${PRODUCT_URL}/allproducts`
            }),

            getProductDetails: builder.query({
                  query: (productId) => ({
                        url: `${PRODUCT_URL}/${productId}`,
                  }),
                  keepUnusedDataFor: 5,
            }),

            createProduct: builder.mutation({
                  query: (productData) => ({
                        url: `${PRODUCT_URL}`,
                        method: 'POST',
                        body: productData,
                  }),
                  invalidatesTags: ['Product'],
            }),

            updateProduct: builder.mutation({
                  query: ({ productId, productData }) => ({
                        url: `${PRODUCT_URL}/${productId}`,
                        method: 'PUT',
                        body: productData,
                  }),
            }),

            uploadProductImage: builder.mutation({
                  query: (imageData) => ({
                        url: `${UPLOAD_URL}`,
                        method: "POST",
                        body: imageData
                  }),
            }),

            deleteProduct: builder.mutation({
                  query: (productId) => ({
                        url: `${PRODUCT_URL}/${productId}`,
                        method: 'DELETE'
                  }),
                  providesTags: ['Product'],
            }),

            createReview: builder.mutation({
                  query: (data) => ({
                        url: `${PRODUCT_URL}/${data.productId}/reviews`,
                        method: 'POST',
                        body: data
                  }),
            }),

            getTopProduct: builder.query({
                  query: () => `${PRODUCT_URL}/top`,
                  keepUnusedDataFor: 5,
            }),

            getNewProducts: builder.query({
                  query: () => `${PRODUCT_URL}/new`,
                  keepUnusedDataFor: 5,
            }),

            getFilteredProducts: builder.query({
                  query: ({ checked, radio }) => ({
                        url: `${PRODUCT_URL}/filtered-product`,
                        method: 'POST',
                        body: {checked, radio}
                  }),
            })
      }),
});

export const {
      useGetProductsQuery,
      useGetProductByIdQuery,
      useAllProductsQuery,
      useGetProductDetailsQuery,
      useCreateProductMutation,
      useUpdateProductMutation,
      useDeleteProductMutation,
      useCreateReviewMutation,
      useGetTopProductQuery,
      useGetNewProductsQuery,
      useUploadProductImageMutation,
      useGetFilteredProductsQuery
} = productApiSlice;