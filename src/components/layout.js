import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './header';
import TopHeadlines from '../pages/top-headlines';
import ViewFullArticle from '../pages/viewFullArticle';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<TopHeadlines />} />
          <Route path='/article/:title' element={<ViewFullArticle />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
