import React, { useState } from 'react';
import styled from 'styled-components';
import RemoveSongsModal from './RemoveSongsModal';

const StyledButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
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
        <>
            <StyledButton onClick={handleOpenModal}>Remover Músicas</StyledButton>
            <RemoveSongsModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </>
    );
};

export default RemoveSongsButton;
