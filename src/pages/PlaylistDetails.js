import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../components/Feed/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingImage from '../assets/loading.gif';
import Playlist from '../components/PlaylistDetails/Playlist'
import Song from '../components/PlaylistDetails/Song'

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

function PlaylistDetail() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                console.log('Playlist ID:', playlistId);
                const token = localStorage.getItem('token');

                toast.info('Carregando detalhes da playlist, aguarde...');

                const playlistResponse = await axios.get(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                const fetchedPlaylist = playlistResponse.data.playlist; // Ajuste aqui para refletir a estrutura dos dados

                setPlaylist(fetchedPlaylist);

                const songsResponse = await axios.get(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistId}/song`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                const songIds = songsResponse.data.songs || []; // Ajuste aqui para refletir a estrutura dos dados
                const fetchedSongs = await Promise.all(
                    songIds.map(async (songId) => {
                        const songDetailsResponse = await axios.get(
                            `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${songId}`,
                            {
                                headers: {
                                    Authorization: token,
                                },
                            }
                        );
                        return songDetailsResponse.data.song;
                    })
                );

                setSongs(fetchedSongs);

                toast.success('Detalhes da playlist carregados com sucesso!');
            } catch (error) {
                toast.error('Erro ao obter detalhes da playlist. Tente novamente.');
                console.error('Erro ao obter detalhes da playlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    useEffect(() => {
        document.title = playlist ? `Playlist - ${playlist._name}` : 'Playlist - Spoticry'; // Ajuste aqui para refletir a estrutura dos dados
    }, [playlist]);

    return (
        <>
            <GlobalStyle />
            <Header />
            <ToastContainer />

            {loading ? (
                <img src={LoadingImage} alt="Carregando..." />
            ) : (
                playlist && (
                    <div>
                        <Playlist name={playlist._name} description={playlist._description} />

                        <ul>
                            {Array.isArray(songs) &&
                                songs.map((song) => (
                                    <li key={song.id}>
                                        <Song title={song.title} artist={song.artist} url={song.url} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                )
            )}
        </>
    );
}

export default PlaylistDetail;
