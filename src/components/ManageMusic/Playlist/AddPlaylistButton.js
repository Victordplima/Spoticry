import React, { useState } from 'react';
import styled from 'styled-components';
import AddPlaylistModal from './AddPlaylistModal';
import btnAdicionar from '../../../assets/btnAdicionar.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  font-family: 'Roboto', sans-serif;
`;

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #212121;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  height: 45px;

  &:hover {
    background-color: #333;
  }
`;

const ButtonImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ButtonText = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const AddPlaylistButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <CustomButton onClick={openModal}>
                <ButtonImage src={btnAdicionar} alt="Ícone do Botão" />
                <ButtonText>Nova Playlist</ButtonText>
            </CustomButton>
            {isModalOpen && <AddPlaylistModal closeModal={closeModal} />}
        </Container>
    );
};

export default AddPlaylistButton;
