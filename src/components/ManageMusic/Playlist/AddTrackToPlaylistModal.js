import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  background-color: #1d1d1d;
  padding: 20px;
  border-radius: 8px;
`;

const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const PlaylistButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SongList = styled.div`
  margin-top: 20px;
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const AddTrackToPlaylistModal = ({ isOpen, onClose, onAddTracks }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [songsToAdd, setSongsToAdd] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/user/${userId}/playlists`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.error('Erro ao obter playlists:', error);
                toast.error('Erro ao carregar playlists. Tente novamente.');
            }
        };

        if (isOpen && userId) {
            fetchData();
        }
    }, [isOpen, userId]);

    useEffect(() => {
        const fetchSongsToAdd = async () => {
            try {
                const response = await axios.get(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${selectedPlaylistId}/songs`
                );

                const playlistSongs = response.data.songs.map((song) => song._id);
                const allSongsResponse = await axios.get(
                    'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/songs'
                );

                const allSongs = allSongsResponse.data.songs.map((song) => song._id);

                const songsNotInPlaylist = allSongs.filter((song) => !playlistSongs.includes(song));
                setSongsToAdd(songsNotInPlaylist);
            } catch (error) {
                console.error('Erro ao obter músicas para adicionar:', error);
                toast.error('Erro ao carregar músicas. Tente novamente.');
            }
        };

        if (selectedPlaylistId) {
            fetchSongsToAdd();
        }
    }, [selectedPlaylistId]);

    const handleToggleSelection = (playlistId) => {
        setSelectedPlaylistId(playlistId === selectedPlaylistId ? null : playlistId);
        setSelectedSongs([]);
    };

    const handleSongToggle = (songId) => {
        setSelectedSongs((prevSelectedSongs) => {
            if (prevSelectedSongs.includes(songId)) {
                return prevSelectedSongs.filter((id) => id !== songId);
            } else {
                return [...prevSelectedSongs, songId];
            }
        });
    };

    const handleAddTracks = async () => {
        try {
            setLoading(true);
            toast.info('Adicionando músicas à playlist, aguarde...');

            const token = localStorage.getItem('token');

            await axios.post(
                `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${selectedPlaylistId}/song`,
                {
                    songIds: selectedSongs,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success('Músicas adicionadas à playlist com sucesso!');
            console.log('Músicas adicionadas à playlist com sucesso!');
            onAddTracks(); // Disparar ação após adicionar músicas
        } catch (error) {
            toast.error('Erro ao adicionar músicas à playlist. Tente novamente.');
            console.error('Erro ao adicionar músicas à playlist:', error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <ModalOverlay onClick={handleOverlayClick}>
                    <ModalWrapper>
                        <h2>Adicionar Músicas à Playlist</h2>
                        {loading && <p>Processando...</p>}
                        <PlaylistList>
                            {playlists.map((playlist) => (
                                <PlaylistItem key={playlist._id}>
                                    <input
                                        type="radio"
                                        checked={playlist._id === selectedPlaylistId}
                                        onChange={() => handleToggleSelection(playlist._id)}
                                    />
                                    {playlist._name} | {playlist._description}
                                </PlaylistItem>
                            ))}
                        </PlaylistList>
                        {selectedPlaylistId && (
                            <>
                                <h3>Selecione as Músicas:</h3>
                                <SongList>
                                    {songsToAdd.map((songId) => (
                                        <SongItem key={songId}>
                                            <input
                                                type="checkbox"
                                                checked={selectedSongs.includes(songId)}
                                                onChange={() => handleSongToggle(songId)}
                                            />
                                            {songId} {/* Exibir outras informações da música se necessário */}
                                        </SongItem>
                                    ))}
                                </SongList>
                                <PlaylistButton onClick={handleAddTracks} disabled={loading}>
                                    Adicionar Músicas à Playlist
                                </PlaylistButton>
                            </>
                        )}
                        <CloseButton onClick={onClose}>Fechar</CloseButton>
                    </ModalWrapper>
                </ModalOverlay>
            )}
        </>
    );
};

export default AddTrackToPlaylistModal;
