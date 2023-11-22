import React, { useState } from 'react';
import styled from 'styled-components';
import EditPlaylistModal from './EditPlaylistModal';

const StyledButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const EditPlaylistButton = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <StyledButton onClick={handleOpenModal}>Editar Playlists</StyledButton>
            {isModalOpen && <EditPlaylistModal onClose={handleCloseModal} isOpen={isModalOpen} />}
        </>
    );
};

export default EditPlaylistButton;
