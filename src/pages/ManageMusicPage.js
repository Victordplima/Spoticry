import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Musicas
import AddSongButton from '../components/ManageMusic/Song/AddSongButton';
import RemoveSongButton from '../components/ManageMusic/Song/RemoveSongButton';
import EditSongButton from '../components/ManageMusic/Song/EditSongButton';
// Playlists
import AddPlaylistButton from '../components/ManageMusic/Playlist/AddPlaylistButton';
import EditPlaylistButton from '../components/ManageMusic/Playlist/EditPlaylistButton';
import AddTrackToPlaylistButton from '../components/ManageMusic/Playlist/AddTrackToPlaylistButton';


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
            <AddPlaylistButton />
            <EditPlaylistButton />
            <AddTrackToPlaylistButton />
            <ToastContainer />
        </>
    );
}

export default ManageMusicPage;
