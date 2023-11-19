import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header'
import AddSongButton from '../components/ManageMusic/AddSongButton';
import RemoveSongButton from '../components/ManageMusic/RemoveSongButton';
import EditSongButton from '../components/ManageMusic/EditSongButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function ManageMusicPage() {
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
            <ToastContainer />
        </>
    );
}

export default ManageMusicPage;
