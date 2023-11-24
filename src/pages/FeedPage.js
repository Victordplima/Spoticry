import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header'
import ListSongs from '../components/Feed/ListSongs';
//import ListsPlaylists from '../components/Feed/ListPlaylists';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListPlaylists from '../components/Feed/ListPlaylists';

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

  /* Personalização do scrollbar para navegadores WebKit (Chrome, Safari) */
  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #212121;
    //border-radius: 6px;
  }

  body::-webkit-scrollbar-track {
    background-color: #000000;
  }

  /* Personalização do scrollbar para navegadores mais recentes */
  body {
    scrollbar-width: thin;
    scrollbar-color: #212121 #000000;
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
            <ListPlaylists />
            <ListSongs />
            
            <ToastContainer />
        </>
    );
}

export default FeedPage;
