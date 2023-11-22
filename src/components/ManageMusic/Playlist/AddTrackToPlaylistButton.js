import React, { useState } from 'react';
import styled from 'styled-components';
import AddTrackToPlaylistModal from './AddTrackToPlaylistModal';

const AddTrackToPlaylistButtonStyled = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const AddTrackToPlaylistButton = ({ onAddTracks }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <AddTrackToPlaylistButtonStyled onClick={handleOpenModal}>
                Adicionar Música à Playlist
            </AddTrackToPlaylistButtonStyled>
            {isModalOpen && (
                <AddTrackToPlaylistModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onAddTracks={onAddTracks}
                />
            )}
        </>
    );
};

export default AddTrackToPlaylistButton;
