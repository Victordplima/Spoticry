// SongMenu.js
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const MenuContainer = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #000000;
  z-index: 1;
`;

const MenuItem = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SongMenu = ({ closeMenu, playlistId, songId }) => {
    const handleRemoveSong = async () => {
        try {
            const apiUrl = `https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist/${playlistId}/song/${songId}`;
            const token = localStorage.getItem('token');

            await axios.delete(apiUrl, {
                headers: {
                    Authorization: token,
                },
            });

            toast.success('Música removida com sucesso!');
            closeMenu();
        } catch (error) {
            console.error('Erro ao remover música:', error);
            toast.error('Erro ao remover música. Tente novamente.');
        }
    };

    return (
        <MenuContainer>
            <MenuItem onClick={handleRemoveSong}>Remover música</MenuItem>
        </MenuContainer>
    );
};

export default SongMenu;
