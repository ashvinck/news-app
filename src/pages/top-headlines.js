import React, { useEffect, useState } from 'react';
import NewsList from '../components/newsList';
import axiosInstance from '../api/axiosInstance';

const TopHeadlines = () => {
  const [getNews, setGetNews] = useState([]);

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

  return <NewsList news={getNews} />;
};

export default TopHeadlines;
