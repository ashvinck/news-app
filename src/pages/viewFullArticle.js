import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectArticleDetails } from '../features/articles/articleDetailsSlice';
import FormatDate from '../utilities/formatDate';
import Noimage from '../assets/images/No-Image.jpg';
import { db } from '../config/firebase/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { selectUser } from '../features/users/userSlice';
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
  flexDirection: 'row',
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
  marginLeft: theme.spacing(2),
  width: 'fit-content',
  fontWeight: 'bold',
}));

const ViewFullArticle = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Pass the 'title' parameter to the useSelector function
  const article = useSelector((state) => selectArticleDetails(state, title));
  const user = useSelector(selectUser);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch user's favorite articles from Firebase Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritesCollection = collection(db, 'favorites');
        const q = query(
          favoritesCollection,
          where('userId', '==', user.uid),
          where('articleId', '==', article) // Use article.id or a unique identifier for articles
        );
        const querySnapshot = await getDocs(q);
        setIsFavorite(querySnapshot.size > 0);
      }
    };

    fetchFavorites();
  }, [user, article]);

  // to send favorites to Firebase Firestore
  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);

    // Check if the article is already a favorite for the user
    const favoritesCollection = collection(db, 'favorites');
    const q = query(
      favoritesCollection,
      where('userId', '==', user.uid),
      where('articleId', '==', article)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      // If it's not a favorite, add it to Firebase
      await addDoc(favoritesCollection, {
        userId: user.uid,
        articleId: article,
      });
    } else {
      // If it's already a favorite, remove it from Firebase
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  };

  return (
    <Container maxWidth='xxl'>
      <Item>
        <Box sx={{ margin: '5px' }}>
          <Button
            onClick={() => navigate(-1)}
            variant='text'
            startIcon={<ArrowBackIcon />}
          >
            BACK
          </Button>
        </Box>
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
          <IconButton onClick={handleFavoriteClick} size='large'>
            {isFavorite ? (
              <FavoriteIcon color='error' />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
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
