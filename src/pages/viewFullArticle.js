import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { selectArticleDetails } from '../features/articles/articleDetailsSlice';
import FormatDate from '../utilities/formatDate';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Noimage from '../assets/images/No-Image.jpg';
import CardMedia from '@mui/material/CardMedia';

// Item or Card Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(2),
  margin: theme.spacing(3),
}));

// News Article Image
const NewsImage = styled(CardMedia)(({ theme }) => ({
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  [theme.breakpoints.only('md')]: {
    height: '350px',
  },
  [theme.breakpoints.up('md')]: {
    height: '550px',
  },
  objectFit: 'cover',
}));

// Styled Box
const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
}));

// Styled Button Box
const ButtonBox = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
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

const ViewFullArticle = () => {
  const { title } = useParams();

  // Pass the 'title' parameter to the useSelector function
  const article = useSelector((state) => selectArticleDetails(state, title));

  return (
    <Container maxWidth='xxl'>
      <Item>
        {/* ------------- Image ----------- */}
        <NewsImage
          component='img'
          image={article?.urlToImage || Noimage}
          title='news-img'
        />
        {/* --------------- Title ------------- */}
        <StyledBox>
          <Typography variant='h5'>{article?.title}</Typography>
        </StyledBox>
        {/* -------------- Description ------------- */}
        <StyledBox>
          <Typography variant='body1'>{article?.description}</Typography>
        </StyledBox>
        {/* ----------------- Content -------------- */}
        <StyledBox>
          <Typography variant='body2'>{article?.content}</Typography>
        </StyledBox>
        {/* -------------- External Link Button ----------- */}
        <ButtonBox>
          <Button variant='contained' target='_blank' href={article?.url}>
            More Details
          </Button>
        </ButtonBox>
        {/* -------------------- News Details -------------- */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ArticleDate>
            <FormatDate dateString={article?.publishedAt} />
          </ArticleDate>
          <Divider orientation='vertical' flexItem />
          <ArticleDetails>{article?.source?.name}</ArticleDetails>
        </Box>
      </Item>
    </Container>
  );
};

export default ViewFullArticle;
