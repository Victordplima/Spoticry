import React, { useState } from 'react';
import styled from 'styled-components';
//import { useLocation } from 'react-router-dom';
import PlaylistPhoto1 from '../../assets/playlists/1.jpg';
import PlaylistPhoto2 from '../../assets/playlists/2.jpg';
import PlaylistPhoto3 from '../../assets/playlists/3.jpg';
import PlaylistPhoto4 from '../../assets/playlists/4.jpg';
import PlaylistPhoto5 from '../../assets/playlists/5.jpg';
import PlaylistPhoto6 from '../../assets/playlists/6.jpg';
import PlaylistPhoto7 from '../../assets/playlists/7.jpg';
import PlaylistPhoto8 from '../../assets/playlists/8.jpg';
import PlaylistPhoto9 from '../../assets/playlists/9.jpg';
import ThreeDotsIMG from '../../assets/btnTresPontos.png'
import PlaylistMenu from './PlaylistMenu';
import btnAdicionar from '../../assets/btnAdicionarAzul.png'
import AddSongToPlaylistModal from './AddSongToPlaylistModal';

const PlaylistContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0px;
  position: relative;

  @media (min-width: 768px) {
    margin: 0% 15%;
  }
`;

const PlaylistImage = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 20px;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistName = styled.h1`
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const PlaylistDescription = styled.p`
  font-size: 1em;
  color: #a9a9a9;
`;

const ThreeDots = styled.img`
  position: absolute;
  top: 28px;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const AddButton = styled.img`
  position: absolute;
  top: 18px;
  right: 60px;
  cursor: pointer;
  width: 48px;
  height: 48px;
`;


const playlistPhotos = [
    PlaylistPhoto1,
    PlaylistPhoto2,
    PlaylistPhoto3,
    PlaylistPhoto4,
    PlaylistPhoto5,
    PlaylistPhoto6,
    PlaylistPhoto7,
    PlaylistPhoto8,
    PlaylistPhoto9,
];

const getRandomPlaylistPhoto = () => {
    const randomIndex = Math.floor(Math.random() * playlistPhotos.length);
    return playlistPhotos[randomIndex];
};

const Playlist = ({ name, description }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [playlistImage] = useState(getRandomPlaylistPhoto());

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <PlaylistContainer>
            <PlaylistImage src={playlistImage} alt="Playlist" />
            <PlaylistInfo>
                <PlaylistName>{name}</PlaylistName>
                <PlaylistDescription>{description}</PlaylistDescription>
            </PlaylistInfo>
            <AddButton
                src={btnAdicionar}
                alt="Adicionar"
                onClick={openModal}
            />
            <ThreeDots
                src={ThreeDotsIMG}
                alt="Menu"
                onClick={toggleMenu}
            />
            {isMenuVisible && (
                <PlaylistMenu closeMenu={closeMenu} />
            )}
            {isModalOpen && (
                <AddSongToPlaylistModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    onAddTracks={() => {
                        console.log('Músicas adicionadas à playlist!');
                    }}
                />
            )}
        </PlaylistContainer>
    );
};

export default Playlist;