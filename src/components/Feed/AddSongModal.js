import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const AddSongModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song',
        {
          title,
          artist,
          url,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Notificação de sucesso
      toast.success('Música adicionada com sucesso!');

      console.log('Música adicionada com sucesso:', response.data);
    } catch (error) {
      // Notificação de erro
      toast.error('Erro ao adicionar música. Tente novamente.');

      console.error('Erro ao adicionar música:', error);
    } finally {
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
        <Title>Adicionar Nova Música</Title>
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
        <ToastContainer />
      </ModalWrapper>
    </Overlay>
  );
};

export default AddSongModal;