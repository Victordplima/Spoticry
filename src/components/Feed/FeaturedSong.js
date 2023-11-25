import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #000000;
    color: #fff;
  }
`;

const FeaturedSongContainer = styled.div`
  max-width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 32px 0px;
  background: rgb(122, 180, 58);
  background: linear-gradient(
    90deg,
    rgba(122, 180, 58, 1) 0%,
    rgba(29, 112, 253, 1) 50%,
    rgba(252, 69, 189, 1) 100%
  );
    z-index: -2;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;  // Adicione essa propriedade z-index para garantir que fique no fundo
  }

  &::before {
    background: inherit;
    filter: blur(50px);  // Ajuste o valor do desfoque conforme necessário
  }

  &::after {
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    mix-blend-mode: multiply;  // Use a mistura de modos conforme necessário para o efeito desejado
  }
`;

const FullBackgroundStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(11,168,252);
  background: linear-gradient(90deg, rgba(11,168,252,1) 0%, rgba(250,5,203,1) 100%);
  z-index: -1;
  animation: rotateHue 10s infinite;

  @keyframes rotateHue {
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

const FeaturedSongWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7); /* Cor de fundo com opacidade */
  border-radius: 10px; /* Borda arredondada para um efeito mais suave */
  backdrop-filter: blur(10px); /* Desfoque aplicado ao plano de fundo */
  padding: 15px 15px;
`;

const SongCard = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
`;

const SongImage = styled.img`
  width: 300px;
  height: 250px;
`;

const SongTitle = styled.strong`
  color: #fff;
  font-size: 18px;
`;

const ArtistName = styled.p`
  color: #a9a9a9;
  font-size: 14px;
`;

const FeaturedSongTitle = styled.h2`
    padding-bottom: 15px;
    font-size: 32px;
`;

const FeaturedSong = () => {
    const [featuredSong, setFeaturedSong] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song',
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                const songs = response.data.songs;

                if (songs.length > 0) {
                    const randomIndex = Math.floor(Math.random() * songs.length);
                    setFeaturedSong(songs[randomIndex]);
                }
            } catch (error) {
                console.error('Erro ao obter a música em destaque:', error);
            }
        };

        fetchData();
    }, [token]);

    const getYouTubeVideoId = (url) => {
        // não tire o comentario abaixo
        // eslint-disable-next-line no-useless-escape
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = getYouTubeVideoId(url);

        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        return 'https://via.placeholder.com/150';
    };

    return (
        <FeaturedSongContainer>
            <GlobalStyle />
            <FeaturedSongTitle>Música em Destaque</FeaturedSongTitle>
            <FeaturedSongWrapper>
                {featuredSong && (
                    <SongCard>
                        <SongImage src={getYouTubeThumbnail(featuredSong.url)} alt="Thumbnail" />
                        <div>
                            <SongTitle>{featuredSong.title}</SongTitle>
                            <ArtistName>{featuredSong.artist}</ArtistName>
                        </div>
                    </SongCard>
                )}
            </FeaturedSongWrapper>
            <FullBackgroundStyle />
        </FeaturedSongContainer>
    );
};

export default FeaturedSong;
