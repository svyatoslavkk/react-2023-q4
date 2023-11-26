import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/animal/search',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    searchByValue: build.mutation({
      query: (params) => ({
        url: `?pageNumber=${params.pageNumber}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${encodeURIComponent('name')}=${encodeURIComponent(
          params.searchValue || '',
        )}`,
      }),
    }),
  }),
});

export const {
  useSearchByValueMutation,
  util: { getRunningQueriesThunk },
} = cardsApi;

export const { searchByValue } = cardsApi.endpoints;
