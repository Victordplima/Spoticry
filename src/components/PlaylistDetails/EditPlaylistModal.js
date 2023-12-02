import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

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
    const [playlist, setPlaylist] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const playlistIdFromUrl = location.pathname.split('/').pop();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (playlistIdFromUrl) {
                    const response = await axios.get(`https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistIdFromUrl}`, {
                        headers: {
                            Authorization: token
                        },
                    });
                    setPlaylist(response.data.playlist);
                }
            } catch (error) {
                console.error('Erro ao obter a playlist:', error);
                setError('Erro ao carregar a playlist. Tente novamente.');
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen, playlistIdFromUrl, token]);

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
            if (playlist) {
                setLoading(true);
                toast.info('Editando playlist, aguarde...');

                await axios.patch(
                    `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlist._id}`,
                    {
                        name: updatedName,
                    },
                    {
                        headers: {
                            Authorization: token
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
