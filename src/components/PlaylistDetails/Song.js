import React from 'react';
import styled from 'styled-components';
import btnPlay from '../../assets/btnPlay2.png'
import btnTresPontos from '../../assets/btnTresPontos.png'

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px groove #fff;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin: 0% 15%;
  }
`;

const SongImage = styled.img`
  width: 100px; /* Ajuste o tamanho conforme necessário */
  height: 100px; /* Ajuste o tamanho conforme necessário */
  margin-right: 20px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const SongArtist = styled.p`
  font-size: 1em;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PlayButtonIcon = styled.img`
  width: 32px; /* Ajuste o tamanho conforme necessário */
  height: 32px; /* Ajuste o tamanho conforme necessário */
  margin-right: 8px;
`;

const MoreButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MoreButtonIcon = styled.img`
  width: 24px; /* Ajuste o tamanho conforme necessário */
  height: 24px; /* Ajuste o tamanho conforme necessário */
`;


const Song = ({ title, artist, url }) => {

  const getYouTubeVideoId = (url) => {
    // não tire o comentario abaixo
    // eslint-disable-next-line no-useless-escape
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url) => {
    console.log("URL:", url)
    if (!url) {
      return 'https://via.placeholder.com/150';
    }

    const videoId = getYouTubeVideoId(url);

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return 'https://via.placeholder.com/150';
  };


  return (
    <SongContainer>
      <SongImage src={getYouTubeThumbnail(url)} alt="Thumbnail" />
      <SongInfo>
        <SongTitle>{title}</SongTitle>
        <SongArtist>{artist}</SongArtist>
      </SongInfo>
      <ControlsContainer>
        <PlayButton> <PlayButtonIcon src={btnPlay} alt="Play" /> </PlayButton>
        <MoreButton> <MoreButtonIcon src={btnTresPontos} alt="Mais" /> </MoreButton>
      </ControlsContainer>
    </SongContainer>
  );
};

export default Song;
