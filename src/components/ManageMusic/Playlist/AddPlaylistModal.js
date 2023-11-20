// AddPlaylistModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

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

const PlaylistInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PlaylistTextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

const AddPlaylistModal = ({ closeModal }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddPlaylist = async () => {
        try {
            setLoading(true);
            toast.info('Adicionando playlist, aguarde...');

            const token = localStorage.getItem('token');

            const playlistData = {
                name: playlistName,
                description: playlistDescription, // A descrição é opcional, pode remover se não for necessário
                // Adicione outros campos conforme necessário
            };

            await axios.post(
                'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist',
                playlistData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            toast.success('Playlist adicionada com sucesso!');
            console.log('Playlist adicionada com sucesso!');
        } catch (error) {
            toast.error('Erro ao adicionar playlist. Tente novamente.');
            console.error('Erro ao adicionar playlist:', error);
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
                <Title>Adicionar Nova Playlist</Title>
                <PlaylistForm>
                    <PlaylistInput
                        type="text"
                        placeholder="Nome da Playlist"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        required
                    />
                    <PlaylistTextArea
                        placeholder="Descrição (opcional)"
                        value={playlistDescription}
                        onChange={(e) => setPlaylistDescription(e.target.value)}
                    />
                    <PlaylistButton type="button" onClick={handleAddPlaylist} disabled={loading}>
                        {loading ? 'Adicionando...' : 'Adicionar Playlist'}
                    </PlaylistButton>
                </PlaylistForm>
            </ModalWrapper>
        </Overlay>
    );
};

export default AddPlaylistModal;
