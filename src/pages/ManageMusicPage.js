import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header'
import AddSongButton from '../components/Feed/AddSongButton';
//import ListSongs from '../components/Feed/ListSongs';
import RemoveSongButton from '../components/Feed/RemoveSongButton';
import EditSongButton from '../components/Feed/EditSongButton';

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
    document.title = "Gerenciar músicas - Spoticry";
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <h2>Músicas</h2>
      <AddSongButton />
      <RemoveSongButton />
      <EditSongButton />
      <h2>Playlists</h2>
    </>
  );
}

export default FeedPage;
