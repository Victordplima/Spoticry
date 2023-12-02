import React, { useState } from 'react';
import styled from 'styled-components';
import EditPlaylistModal from './EditPlaylistModal';

const PlaylistMenuContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 130px;  // Corrigindo a propriedade bottom
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
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <PlaylistMenuContainer>
            <PlaylistMenuItem onClick={handleOpenModal}>Editar Playlists</PlaylistMenuItem>
            {/* Adicione mais itens do menu conforme necessário */}
            {isModalOpen && <EditPlaylistModal onClose={handleCloseModal} isOpen={isModalOpen} />}
        </PlaylistMenuContainer>
    );
};

export default PlaylistMenu;
