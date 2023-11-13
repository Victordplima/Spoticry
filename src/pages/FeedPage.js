import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header'
import Content from '../components/Feed/Content';
import ListSongs from '../components/Feed/ListSongs';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #000000;
    color: #fff;
  }
`;

function FeedPage() {
  useEffect(() => {
    document.title = "Feed - Spoticry";
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Content />
      <ListSongs />
    </>
  );
}

export default FeedPage;
