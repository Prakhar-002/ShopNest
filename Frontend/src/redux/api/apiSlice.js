

/*
?   Node modules
*/
// Importing necessary functions from Redux Toolkit's RTK Query
// - fetchBaseQuery: a small wrapper around fetch for making HTTP requests
// - createApi: helps create an API service with endpoints and caching
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'



/*
?   Custom modules
*/
// Importing the base URL for API requests from the constants file
import { BASE_URL } from '../constants'


// Creating a base query instance using the provided base URL
// This will be used as the default configuration for all API requests
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });


// Creating an API slice using RTK Query
// - baseQuery: the fetchBaseQuery defined above for base config
// - tagTypes: defines the entity types for cache management and invalidation
// - endpoints: currently empty, to be filled with API endpoint definitions later
export const apiSlice = createApi({
      baseQuery,
      tagTypes: ['Product', 'Order', 'User', 'Category'],
      endpoints: () => ({})
})
