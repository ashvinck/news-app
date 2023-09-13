import React from 'react';
import Box from '@mui/material/Box';
import NewsCardGrid from './newsCardGrid';

const NewsGrid = ({ news }) => {
  // Retrieving articles to populate cards
  const articles = news?.articles;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
            xl: '1fr 1fr 1fr 1fr 1fr',
          },
        }}
      >
        {articles?.map((article) => (
          <NewsCardGrid article={article} key={article.title} />
        ))}
      </Box>
    </Box>
  );
};

export default NewsGrid;
