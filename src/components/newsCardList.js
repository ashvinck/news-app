import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import FormatDate from '../utilities/formatDate';
import Noimage from '../assets/images/No-Image.jpg';
import { setArticleDetails } from '../features/articles/articleDetailsSlice';
import { selectUser } from '../features/users/userSlice';
import { db } from '../config/firebase/firebase';

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

const NewsCardList = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleArticleClick = () => {
    dispatch(setArticleDetails({ title: article.title, details: article }));
    navigate(`/news/article/${encodeURIComponent(article.title)}`);
  };

  return (
    <Item>
      <Grid container spacing={2}>
        {/* --------- First Row ------- */}
        <Grid xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* ---------- Article source --------- */}
            <ArticleDetails>{article.source.name}</ArticleDetails>
            <Divider orientation='vertical' flexItem />

            {/* --------- Author  ------ */}
            <ArticleDetails>
              {article.author ? article.author : 'Anonymous'}
            </ArticleDetails>
            <IconButton onClick={handleFavoriteClick}>
              {isFavorite ? (
                <FavoriteIcon color='error' />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
        </Grid>
        {/* ----------  Second Row --------- */}
        <Grid xs={7} md={8} lg={9}>
          <ArticleTitle onClick={handleArticleClick}>
            {article.title}
          </ArticleTitle>
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
