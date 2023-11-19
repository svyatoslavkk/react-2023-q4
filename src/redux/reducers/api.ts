import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/animal/search',
  }),
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

export const { useSearchByValueMutation } = cardsApi;
