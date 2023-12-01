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

const EditPlaylistButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditPlaylistModal = ({ isOpen, onClose }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.error('Erro ao obter playlists:', error);
                setError('Erro ao carregar playlists. Tente novamente.');
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const handleToggleSelection = (playlistId) => {
        setSelectedPlaylistId(playlistId === selectedPlaylistId ? null : playlistId);
    };

    const handleInputChange = (e) => {
        setUpdatedName(e.target.value);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEditSelected = async () => {
        try {
            if (selectedPlaylistId) {
                setLoading(true);
                toast.info('Editando playlist, aguarde...');

                await axios.patch(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${selectedPlaylistId}`,
                    {
                        name: updatedName,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );

                setUpdatedName('');
                onClose();
                toast.success('Nome da playlist editado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao editar playlist:', error);
            setError('Erro ao editar playlist. Tente novamente.');
            toast.error('Erro ao editar playlist. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay style={{ display: isOpen ? 'flex' : 'none' }} onClick={handleOverlayClick}>
            <ModalWrapper>
                <h2>EDITAR PLAYLIST</h2>
                {isLoading && <p>Processando...</p>}
                {error && <p>{error}</p>}
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
                <div>
                    <label htmlFor="updatedName">Novo Nome: </label>
                    <input type="text" id="updatedName" name="updatedName" value={updatedName} onChange={handleInputChange} />
                </div>
                <EditPlaylistButton onClick={handleEditSelected} disabled={isLoading}>
                    Editar Nome da Playlist
                </EditPlaylistButton>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default EditPlaylistModal;
