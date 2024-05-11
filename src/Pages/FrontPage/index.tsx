import { useMemo } from 'react';
import { Grid } from '@mui/material';
import { useNewsApiGetAllNewsQuery } from 'src/services/NewsApi';
import Filter from 'src/components/Filter';
import NewsCard from 'src/components/NewsCard';
import Header from 'src/components/Header/Header';
import PageFrame from 'src/components/PageFrame';
import { useSearchParams } from 'react-router-dom';
import { useGetGuardianNewsQuery } from 'src/services/Guardian';
import exportData from 'src/Utils/exportDate';
import mapGuardinaParams from 'src/Utils/mapGuardinaParams';

export default function FrontPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;
  const date = searchParams.get('date') || undefined;
  const source = searchParams.get('source') || undefined;

  const apiNews = useNewsApiGetAllNewsQuery({ q, category, date, source });
  const guardian = useGetGuardianNewsQuery(
    mapGuardinaParams({ q, category, date, source }),
  );
  const guardianNews = useMemo(() => exportData(guardian.data), [guardian]);
  const allNews = useMemo(() => {
    return [
      ...(apiNews?.data?.articles || []),
      ...(guardianNews.articles || []),
    ];
  }, [guardianNews, apiNews.data]);
  return (
    <PageFrame>
      <Header />
      <Filter />
      <Grid container spacing={2} sx={{ my: 1 }}>
        {allNews.map((article) => (
          <Grid key={article.publishedAt} item xs={12} sm={12} md={6} lg={6}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
    </PageFrame>
  );
}
