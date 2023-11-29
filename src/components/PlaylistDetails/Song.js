import React, { useState } from 'react';
import styled from 'styled-components';
import btnPlay from '../../assets/btnPlay2.png';
import btnPause from '../../assets/btnPause.png';
import btnTresPontos from '../../assets/btnTresPontos.png';
import { useMusic } from '../../MusicContext';
import { createGlobalStyle } from 'styled-components';
import SongMenu from './SongMenu';
import { useParams } from 'react-router-dom';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #000000;
    color: #fff;
  }

  /* Personalização do scrollbar para navegadores WebKit (Chrome, Safari) */
  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #212121;
  }

  body::-webkit-scrollbar-track {
    background-color: #000000;
  }

  /* Personalização do scrollbar para navegadores mais recentes */
  body {
    scrollbar-width: thin;
    scrollbar-color: #212121 #000000;
  }
`;

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px groove #292929;
  margin-top: 10px;
  background-color: ${(props) => (props.isPlaying ? '#212121' : 'transparent')};

  @media (min-width: 768px) {
    margin: 0% 15%;
  }
`;

const SongImage = styled.img`
  width: 100px;
  height: 100px; 
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
  color: #a9a9a9;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
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
  width: 32px; 
  height: 32px;
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
  width: 24px;
  height: 24px;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const Song = ({ title, artist, url, id }) => {
    const { currentSong, playSong } = useMusic();
    const isPlaying = currentSong && currentSong.url === url;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { playlistId } = useParams();

    const playThisSong = () => {
        playSong({ title, artist, url });
    };

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const getYouTubeVideoId = (url) => {
        const match = url.match(
            // não tire o comentario abaixo
            // eslint-disable-next-line no-useless-escape
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
        );
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (url) => {
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
        <SongContainer isPlaying={isPlaying}>
            <GlobalStyle />
            <SongImage src={getYouTubeThumbnail(url)} alt="Thumbnail" />
            <SongInfo>
                <SongTitle>{title}</SongTitle>
                <SongArtist>{artist}</SongArtist>
            </SongInfo>
            <ControlsContainer>
                <PlayButton onClick={playThisSong}>
                    <PlayButtonIcon src={isPlaying ? btnPause : btnPlay} alt={isPlaying ? 'Pause' : 'Play'} />
                </PlayButton>
                <MoreButton onClick={toggleMenu}>
                    <MoreButtonIcon src={btnTresPontos} alt="Mais" />
                </MoreButton>
                {isMenuVisible && (
                    <MenuWrapper>
                        <SongMenu closeMenu={closeMenu} playlistId={playlistId} songId={id} />
                    </MenuWrapper>
                )}
            </ControlsContainer>
        </SongContainer>
    );
};

export default Song;