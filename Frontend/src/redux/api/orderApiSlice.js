

/*
?   Custom modules
*/

// Importing the base API slice from the apiSlice file
// This slice was created using createApi and can be extended with new endpoints
import { apiSlice } from "./apiSlice";


// Importing the CATEGORY_URL constant which holds the base path for user-related API endpoints
import { ORDERS_URL, PAYPAL_URL } from "../constants";


export const orderApiSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
            createOrder: builder.mutation({
                  query: (order) => ({
                        url: ORDERS_URL,
                        method: "POST",
                        body: order,
                  }),
            }),

            getOrderDetails: builder.query({
                  query: (id) => ({
                        url: `${ORDERS_URL}/${id}`,
                  }),
            }),

            payOrder: builder.mutation({
                  query: ({ orderId, details }) => ({
                        url: `${ORDERS_URL}/${orderId}/pay`,
                        method: "PUT",
                        body: details,
                  }),
            }),

            getPaypalClientId: builder.query({
                  query: () => ({
                        url: PAYPAL_URL,
                  }),
            }),

            getMyOrders: builder.query({
                  query: () => ({
                        url: `${ORDERS_URL}/mine`,
                  }),
                  keepUnusedDataFor: 5,
            }),

            getOrders: builder.query({
                  query: () => ({
                        url: ORDERS_URL,
                  }),
            }),

            deliverOrder: builder.mutation({
                  query: (orderId) => ({
                        url: `${ORDERS_URL}/${orderId}/deliver`,
                        method: "PUT",
                  }),
            }),

            getTotalOrders: builder.query({
                  query: () => `${ORDERS_URL}/total-orders`,
            }),

            getTotalSales: builder.query({
                  query: () => `${ORDERS_URL}/total-sales`,
            }),

            getTotalSalesByDate: builder.query({
                  query: () => `${ORDERS_URL}/total-sales-by-date`,
            }),
      }),
});

export const {
      useGetTotalOrdersQuery,
      useGetTotalSalesQuery,
      useGetTotalSalesByDateQuery,
      // ------------------
      useCreateOrderMutation,
      useGetOrderDetailsQuery,
      usePayOrderMutation,
      useGetPaypalClientIdQuery,
      useGetMyOrdersQuery,
      useDeliverOrderMutation,
      useGetOrdersQuery,
} = orderApiSlice;