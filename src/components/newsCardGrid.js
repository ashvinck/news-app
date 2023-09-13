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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setArticleDetails } from '../features/articles/articleDetailsSlice';

// Item or Card Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  minWidth: '200px',
}));

// News Article Image
const NewsImage = styled(CardMedia)(() => ({
  borderRadius: '10px',
  height: '200px',
  objectFit: 'cover',
}));

// News Article Title
const ArticleTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 'bold',
  height: '160px',
  [theme.breakpoints.down('sm')]: {
    height: '120px',
  },
}));

// Date
const ArticleDate = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  width: 'fit-content',
  marginRight: theme.spacing(2),
}));

// Details source and author
const ArticleDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2),
  width: 'fit-content',
  fontWeight: 'bold',
}));

const NewsCardGrid = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleArticleClick = () => {
    dispatch(setArticleDetails({ title: article.title, details: article }));
    navigate(`/article/${encodeURIComponent(article.title)}`);
  };

  return (
    <Item>
      <Grid container spacing={2}>
        {/* --------- First Row ------- */}
        <Grid xs={12} sx={{ height: '210px' }}>
          <NewsImage
            component='img'
            image={article.urlToImage || Noimage}
            title='news-img'
          />
        </Grid>
        {/* ----------  Second Row --------- */}
        <Grid xs={12}>
          <ArticleTitle onClick={handleArticleClick}>
            {article.title}
          </ArticleTitle>
        </Grid>
        {/* ----------- Third Row ------------ */}
        <Grid xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ArticleDate>
              <FormatDate dateString={article.publishedAt} />
            </ArticleDate>
            <Divider orientation='vertical' flexItem />
            <ArticleDetails>{article.source.name}</ArticleDetails>
          </Box>
        </Grid>
      </Grid>
    </Item>
  );
};

export default NewsCardGrid;
