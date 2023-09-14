import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../config/api/axiosInstance';
import { selectToggleCardsView } from '../features/theme/themeSlice';
import NewsList from '../components/newsList';
import NewsGrid from '../components/newsGrid';

const TopHeadlines = () => {
  const [getNews, setGetNews] = useState([]);
  const gridView = useSelector(selectToggleCardsView);

  const params = {
    country: 'in',
  };

  const getNewsFromAPI = () => {
    axiosInstance
      .get('/top-headlines', {
        params: {
          ...params,
        },
      })
      .then((response) => {
        setGetNews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => getNewsFromAPI(), []);
  return gridView ? <NewsGrid news={getNews} /> : <NewsList news={getNews} />;
};

export default TopHeadlines;
