import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EditSongButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditSongModal = ({ isOpen, onClose  }) => {
    const [songs, setSongs] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({});
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
            fetchData();
        }
    }, [isOpen]);

    const handleToggleSelection = (songId) => {
        setSelectedSongId(songId === selectedSongId ? null : songId);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            // Se o clique ocorrer fora do modal (no overlay), feche o modal
            onClose();
        }
    };

    const handleEditSelected = async () => {
        try {
            if (selectedSongId) {
                setLoading(true);
                toast.info('Editando música, aguarde...');

                await axios.patch(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song/${selectedSongId}`,
                    {
                        title: updatedDetails.updatedTitle,
                        artist: updatedDetails.updatedArtist,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );

                setUpdatedDetails({});
                onClose();
                toast.success('Música editada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao editar música:', error);
            setError('Erro ao editar música. Tente novamente.');
            toast.error('Erro ao editar música. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay style={{ display: isOpen ? 'flex' : 'none' }} onClick={handleOverlayClick}>
            <ModalWrapper>
                <h2>EDITAR MÚSICA</h2>
                {isLoading && <p>Processando...</p>}
                {error && <p>{error}</p>}
                <SongList>
                    {songs.map((song) => (
                        <SongItem key={song.id}>
                            <input
                                type="radio"
                                checked={song.id === selectedSongId}
                                onChange={() => handleToggleSelection(song.id)}
                            />
                            {song.title} | {song.artist}
                        </SongItem>
                    ))}
                </SongList>
                <div>
                    <label htmlFor="updatedTitle">Novo Título: </label>
                    <input type="text" id="updatedTitle" name="updatedTitle" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="updatedArtist">Novo Artista: </label>
                    <input type="text" id="updatedArtist" name="updatedArtist" onChange={handleInputChange} />
                </div>
                <EditSongButton onClick={handleEditSelected} disabled={isLoading}>
                    Editar Selecionada
                </EditSongButton>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default EditSongModal;
