import React from 'react';
import styled from 'styled-components';

const PlaylistMenuContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: -200;
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

const PlaylistMenu = ({ closeMenu }) => {
    const handleMenuItemClick = () => {
        closeMenu();
    };

    return (
        <PlaylistMenuContainer>
            <PlaylistMenuItem onClick={handleMenuItemClick}>Excluir playlist</PlaylistMenuItem>
            <PlaylistMenuItem onClick={handleMenuItemClick}>Editar playlist</PlaylistMenuItem>
            {/* Adicione mais itens do menu conforme necessário */}
        </PlaylistMenuContainer>
    );
};

export default PlaylistMenu;
