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

const MusicForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const MusicInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const MusicButton = styled.button`
  padding: 10px 20px;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddMusicModal = ({ closeModal, addMusic }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addMusic(title, artist, url);
        closeModal();
    };

    return (
        <ModalWrapper>
            <h2>Adicionar Nova Música</h2>
            <MusicForm onSubmit={handleSubmit}>
                <MusicInput
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <MusicInput
                    type="text"
                    placeholder="Artista"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
                <MusicInput
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <MusicButton type="submit">Adicionar Música</MusicButton>
            </MusicForm>
        </ModalWrapper>
    );
};

export default AddMusicModal;
