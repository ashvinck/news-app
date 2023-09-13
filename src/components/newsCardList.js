import React from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import FormatDate from '../utilities/formatDate';
import Noimage from '../assets/images/No-Image.jpg';

const NewsCardList = ({ article }) => {
  // Item or Card Styles
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  }));

  // Details source and author
  const ArticleDetails = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    ...theme.typography.subtitle2,
    ':first-of-type': {
      marginRight: '10px',
      color: theme.palette.text.primary,
    },
    ':last-of-type': {
      marginLeft: '10px',
    },
  }));

  // News Article Title
  const ArticleTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  }));

  // News Article Image
  const NewsImage = styled(CardMedia)(() => ({
    borderRadius: '10px',
    minHeight: '150px',
    maxHeight: '400px',
    objectFit: 'cover',
  }));

  // Date
  const ArticleDate = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
  }));

  return (
    <Item>
      <Grid container spacing={2}>
        {/* --------- First Row ------- */}
        <Grid xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              justifyContent: 'start',
            }}
          >
            <ArticleDetails>{article.source.name}</ArticleDetails>
            <Divider orientation='vertical' flexItem />
            <ArticleDetails>
              {article.author ? article.author : 'Anonymous'}
            </ArticleDetails>
          </Box>
        </Grid>
        {/* ----------  Second Row --------- */}
        <Grid xs={7} md={8} lg={9}>
          <ArticleTitle>{article.title}</ArticleTitle>
        </Grid>
        <Grid xs={5} md={4} lg={3}>
          <NewsImage
            component='img'
            image={article.urlToImage || Noimage}
            title='news-img'
          />
        </Grid>
        {/* ------------  Third Row ----------- */}
        <Grid xs={12}>
          <ArticleDate>
            <FormatDate dateString={article.publishedAt} />
          </ArticleDate>
        </Grid>
      </Grid>
    </Item>
  );
};

export default NewsCardList;
