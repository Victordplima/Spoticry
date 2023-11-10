import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
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

const PlaylistButton = styled.button`
  padding: 10px 20px;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CreatePlaylistModal = ({ closeModal, createPlaylist }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createPlaylist(playlistName, playlistDescription);
        closeModal();
    };

    return (
        <ModalWrapper>
            <h2>Criar Nova Playlist</h2>
            <PlaylistForm onSubmit={handleSubmit}>
                <PlaylistInput
                    type="text"
                    placeholder="Nome da Playlist"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    required
                />
                <PlaylistInput
                    type="text"
                    placeholder="Descrição (Opcional)"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                />
                <PlaylistButton type="submit">Criar Playlist</PlaylistButton>
            </PlaylistForm>
        </ModalWrapper>
    );
};

export default CreatePlaylistModal;