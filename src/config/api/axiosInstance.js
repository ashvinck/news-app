import axios from 'axios';

// Config Axios
const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: '4081b914b2834edbb2e3f7556fc0b20c',
  },
});

export default axiosInstance;
