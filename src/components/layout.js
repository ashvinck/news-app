import React from 'react';
import Header from './header';
import TopHeadlines from '../pages/top-headlines';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <TopHeadlines />
      </main>
    </>
  );
};

export default Layout;
