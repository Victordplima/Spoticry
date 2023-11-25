import React from 'react';
import styled from 'styled-components';
import PlaylistPhoto1 from '../../assets/playlists/1.jpg';
import PlaylistPhoto2 from '../../assets/playlists/2.jpg';
import PlaylistPhoto3 from '../../assets/playlists/3.jpg';
import PlaylistPhoto4 from '../../assets/playlists/4.jpg';
import PlaylistPhoto5 from '../../assets/playlists/5.jpg';
import PlaylistPhoto6 from '../../assets/playlists/6.jpg';
import PlaylistPhoto7 from '../../assets/playlists/7.jpg';
import PlaylistPhoto8 from '../../assets/playlists/8.jpg';
import PlaylistPhoto9 from '../../assets/playlists/9.jpg';

const PlaylistContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0px;

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

const Playlist = ({ name, description }) => (
  <PlaylistContainer>
    <PlaylistImage src={getRandomPlaylistPhoto()} alt="Playlist" />
    <PlaylistInfo>
      <PlaylistName>{name}</PlaylistName>
      <PlaylistDescription>{description}</PlaylistDescription>
    </PlaylistInfo>
  </PlaylistContainer>
);

export default Playlist;
