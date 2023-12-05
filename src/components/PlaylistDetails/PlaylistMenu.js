import React, { useState } from 'react';
import styled from 'styled-components';
import EditPlaylistModal from './EditPlaylistModal';
import RemovePlaylistModal from './RemovePlaylistModal';

const PlaylistMenuContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 130px;
  right: 0;
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #000000;
  z-index: 1;
`;

const PlaylistMenuItem = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


const PlaylistMenu = () => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

    const handleOpenEditModal = () => {
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleOpenRemoveModal = () => {
        setRemoveModalOpen(true);
    };

    const handleCloseRemoveModal = () => {
        setRemoveModalOpen(false);
    };

    return (
        <PlaylistMenuContainer>
            <PlaylistMenuItem onClick={handleOpenEditModal}>Editar Playlists</PlaylistMenuItem>
            <PlaylistMenuItem onClick={handleOpenRemoveModal}>Remover Playlist</PlaylistMenuItem>
            {/* Adicione mais itens do menu conforme necessário */}
            {isEditModalOpen && <EditPlaylistModal onClose={handleCloseEditModal} isOpen={isEditModalOpen} />}
            {isRemoveModalOpen && (
                <RemovePlaylistModal onClose={handleCloseRemoveModal} isOpen={isRemoveModalOpen} />
            )}
        </PlaylistMenuContainer>
    );
};

export default PlaylistMenu;
