import React, { useState, useEffect, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from '../components/Feed/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import defaultPlaylistImage from '../assets/playlists/2.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const PlaylistContainer = styled.div`
  text-align: center;
  margin: 0 25%;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PlaylistImage = styled.img`
  margin-right: 20px;
`;

const PlaylistInfo = styled.div`
  color: #888;
`;

const PlaylistTitle = styled.strong`
  color: white;
  font-size: 1.2em;
  display: block;
  margin-bottom: 4px;
`;

const SearchTitle = styled.h2`
  padding: 20px 0px 50px 0px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('term') || '';
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem('token');

    const searchPlaylists = useCallback(async (term) => {
        try {
            const response = await axios.get(`https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/search/${term}`, {
                headers: {
                    Authorization: token,
                },
            });

            setSearchResults(response.data.playlists);
        } catch (error) {
            console.error('Erro na pesquisa de playlists:', error);
            toast.error('Erro ao buscar playlists. Tente novamente.');
        }
    }, [token]);

    useEffect(() => {
        document.title = `Pesquisa - ${searchTerm} - Spoticry`;

        if (searchTerm) {
            // Realize a chamada à API de pesquisa de playlists
            searchPlaylists(searchTerm);
        }
    }, [searchTerm, searchPlaylists]);

    return (
        <>
            <GlobalStyle />
            <Header />

            <PlaylistContainer>
                <SearchTitle>Resultados da Pesquisa para "{searchTerm}"</SearchTitle>
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((playlist) => (
                            <StyledLink  key={playlist._id} to={`/playlist/${playlist._id}`}>
                                <PlaylistItem>
                                    <PlaylistImage
                                        src={playlist._songs.length > 0 ? `https://source.unsplash.com/random/100x100?sig=${playlist._songs[0]}` : defaultPlaylistImage}
                                        alt="Playlist"
                                    />
                                    <PlaylistInfo>
                                        <PlaylistTitle>{playlist._name}</PlaylistTitle>
                                        <p>{playlist._description}</p>
                                    </PlaylistInfo>
                                </PlaylistItem>
                            </StyledLink>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum resultado encontrado.</p>
                )}
            </PlaylistContainer>

            <ToastContainer />
        </>
    );
}

export default SearchPage;
