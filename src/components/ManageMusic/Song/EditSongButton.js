import React, { useState } from 'react';
import styled from 'styled-components';
import EditSongModal from './EditSongModal';

const StyledButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const EditSongButton = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <StyledButton onClick={handleOpenModal}>Editar Músicas</StyledButton>
            {isModalOpen && <EditSongModal onClose={handleCloseModal} isOpen={isModalOpen} />}
        </>
    );
};

export default EditSongButton;
