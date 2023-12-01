import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ModalWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #1d1d1d;
  padding: 20px;
  border-radius: 8px;
  z-index: 3;
`;

const PlaylistForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PlaylistButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #037dfa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h2`
  padding-bottom: 12px;
`;

const AddSongToPlaylistModal = ({ closeModal }) => {
    const [loading, setLoading] = useState(false);
    const [availableSongs, setAvailableSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const playlistId = location.pathname.split('/').pop();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                if (!token) {
                    // Adicione lógica aqui para tratar a ausência do token
                    return;
                }

                const response = await axios.get('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song', {
                    headers: {
                        Authorization: token,
                    },
                });
                setAvailableSongs(response.data.songs);
            } catch (error) {
                console.error('Erro ao obter músicas:', error);
                toast.error('Erro ao carregar músicas. Tente novamente.');
            }
        };

        fetchSongs();
    }, [token]);

    const handleAddSongToPlaylist = async () => {
        try {
            setLoading(true);
            toast.info('Adicionando música à playlist, aguarde...');

            const songId = selectedSong.id;

            await axios.post(
                `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistId}/song`,
                { songId },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success('Música adicionada à playlist com sucesso!');
            console.log('Música adicionada à playlist com sucesso!');
        } catch (error) {
            toast.error('Erro ao adicionar música à playlist. Tente novamente.');
            console.error('Erro ao adicionar música à playlist:', error);
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalWrapper>
                <Title>Adicionar Música à Playlist</Title>
                <PlaylistForm>
                    <h3>Músicas Disponíveis:</h3>
                    {availableSongs.map((song) => (
                        <div key={song.id}>
                            <input
                                type="radio"
                                checked={selectedSong?.id === song.id}
                                onChange={() => setSelectedSong(song)}
                            />
                            {song.title} - {song.artist}
                        </div>
                    ))}
                    <PlaylistButton type="button" onClick={handleAddSongToPlaylist} disabled={loading}>
                        {loading ? 'Adicionando...' : 'Adicionar Música à Playlist'}
                    </PlaylistButton>
                </PlaylistForm>
            </ModalWrapper>
        </Overlay>
    );
};

export default AddSongToPlaylistModal;
