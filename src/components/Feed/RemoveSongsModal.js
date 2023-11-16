import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const SongList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const RemoveSongButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const RemoveSongsModal = ({ isOpen, onRequestClose, removeSong }) => {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setSongs(response.data.songs);
            } catch (error) {
                console.error('Erro ao obter músicas:', error);
                setError('Erro ao carregar músicas. Tente novamente.');
            }
        };

        if (isOpen) {
            fetchData(); // Carrega músicas apenas quando o modal é aberto
        }
    }, [isOpen]);

    const handleToggleSelection = (songId) => {
        setSelectedSongs((prevSelected) => {
            if (prevSelected.includes(songId)) {
                return prevSelected.filter((id) => id !== songId);
            } else {
                return [...prevSelected, songId];
            }
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            // Se o clique ocorrer fora do modal (no overlay), feche o modal
            onRequestClose();
        }
    };

    const handleRemoveSelected = async () => {
        try {
            // Certifique-se de que há músicas selecionadas para remover
            if (selectedSongs.length > 0) {
                setLoading(true);

                // Para cada música selecionada, envie uma solicitação DELETE
                for (const songId of selectedSongs) {
                    await axios.delete(`https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${songId}`, {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    });
                }

                // Atualize a lista de músicas após a remoção
                setSongs((prevSongs) => prevSongs.filter((song) => !selectedSongs.includes(song.id)));
                // Limpe a seleção após remover
                setSelectedSongs([]);
                // Feche o modal
                onRequestClose();
            }
        } catch (error) {
            console.error('Erro ao remover músicas:', error);
            setError('Erro ao remover músicas. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay style={{ display: isOpen ? 'flex' : 'none' }} onClick={handleOverlayClick}>
            <ModalWrapper>
                <h2>REMOVER MÚSICAS</h2>
                {isLoading && <p>Removendo músicas...</p>}
                {error && <p>{error}</p>}
                <SongList>
                    {songs.map((song) => (
                        <SongItem key={song.id}>
                            <input
                                type="checkbox"
                                checked={selectedSongs.includes(song.id)}
                                onChange={() => handleToggleSelection(song.id)}
                            />
                            {song.title} | {song.artist}
                        </SongItem>
                    ))}
                </SongList>
                <RemoveSongButton onClick={handleRemoveSelected} disabled={isLoading}>
                    Remover Selecionadas
                </RemoveSongButton>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default RemoveSongsModal;