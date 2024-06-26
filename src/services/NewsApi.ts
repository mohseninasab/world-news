import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type NewsApiArticle from 'src/types/NewsApiArticles';
import type {
  NewsApiParams,
  SourceParams,
  SourcesApi,
  TopLineParams,
} from 'src/types/NewsApiArticles';

const baseUrl = import.meta.env.VITE_NEWSAPI_BASE_URL;
const Authorization = import.meta.env.VITE_NEWSAPI_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl, headers: { Authorization } }),
  endpoints: (builder) => ({
    newsApiGetAllNews: builder.query<NewsApiArticle, NewsApiParams>({
      query: (params: NewsApiParams) => {
        const { q, source, date: from, category } = params;
        if (q || source || from || category)
          return {
            url: '/everything',
            params: { q, source, category, from },
          };
        return { url: '/everything?q=usa' };
      },
    }),
    newsApiGetSources: builder.query<SourcesApi, SourceParams>({
      query: (params: SourceParams) => ({
        url: '/top-headlines/sources',
        params,
      }),
    }),
    newsApiGetTopHeadlines: builder.query<NewsApiArticle, TopLineParams>({
      query: (params: TopLineParams) => ({
        url: '/top-headlines',
        params,
      }),
    }),
  }),
});
export const {
  useNewsApiGetAllNewsQuery,
  useNewsApiGetSourcesQuery,
  useNewsApiGetTopHeadlinesQuery,
} = newsApi;
