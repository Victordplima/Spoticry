import React from 'react';
import styled from 'styled-components';
import PlaylistPhoto from '../../assets/playlist.jpg'

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
`;

const Playlist = ({ name, description }) => (
    <PlaylistContainer>
        <PlaylistImage
            src={PlaylistPhoto}
            alt="Playlist"
        />
        <PlaylistInfo>
            <PlaylistName>{name}</PlaylistName>
            <PlaylistDescription>{description}</PlaylistDescription>
        </PlaylistInfo>
    </PlaylistContainer>
);

export default Playlist;
