import axios from 'axios';

// Config Axios
const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_API_KEY,
  },
});

export default axiosInstance;
