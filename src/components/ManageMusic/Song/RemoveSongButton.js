import React, { useState } from 'react';
import styled from 'styled-components';
import RemoveSongsModal from './RemoveSongsModal';
import btnRemove from '../../../assets/btnRemover.png'

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
  background-color: red;
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

const RemoveSongsButton = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <CustomButton onClick={handleOpenModal}>
                <ButtonImage src={btnRemove} alt="Ícone do Botão" />
                <ButtonText>Remover música</ButtonText>
            </CustomButton>
            <RemoveSongsModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </Container>
    );
};

export default RemoveSongsButton;
