import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

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
  text-align: center;
`;

const RemovePlaylistButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const RemovePlaylistModal = ({ isOpen, onClose }) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const playlistId = location.pathname.split('/').pop();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRemovePlaylist = async () => {
        try {
            setLoading(true);
            toast.info('Removendo playlist, aguarde...');

            await axios.delete(
                `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistId}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            onClose();
            toast.success('Playlist removida com sucesso!');
            navigate('/feed');
        } catch (error) {
            console.error('Erro ao remover playlist:', error);
            setError('Erro ao remover playlist. Tente novamente.');
            toast.error('Erro ao remover playlist. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay style={{ display: isOpen ? 'flex' : 'none' }} onClick={handleOverlayClick}>
            <ModalWrapper>
                <h2>REMOVER PLAYLIST</h2>
                {isLoading && <p>Processando...</p>}
                {error && <p>{error}</p>}
                <p>Deseja realmente remover esta playlist?</p>
                <RemovePlaylistButton onClick={handleRemovePlaylist} disabled={isLoading}>
                    Remover Playlist
                </RemovePlaylistButton>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default RemovePlaylistModal;
