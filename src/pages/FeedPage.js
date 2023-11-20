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
