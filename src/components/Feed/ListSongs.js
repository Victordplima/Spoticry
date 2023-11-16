import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import btnDireita from '../../assets/btnDireita.png';
import btnEsquerda from '../../assets/btnEsquerda.png';

const CarouselContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const SongCard = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 300px;
  margin-right: 20px;
  //border: 1px solid #ccc;
  padding: 10px;
`;

const SongImage = styled.img`
  width: 260px;
  height: 180px;
  //margin-bottom: 5px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;

  img {
    max-width: 30px;
  }
`;

const SongTitle = styled.strong`
  color: #fff;
  font-size: 18px;
`;

const ArtistName = styled.p`
  color: #a9a9a9;
  font-size: 14px;
`;

const ListSongs = () => {
    const [musicas, setMusicas] = useState([]);
    const token = localStorage.getItem('token');
    const [carouselPosition, setCarouselPosition] = useState(0);

    const cardWidth = 320;

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
                setMusicas(response.data.songs);
            } catch (error) {
                console.error('Erro ao obter músicas:', error);
            }
        };

        fetchData();
    }, [token]);


    const getYouTubeVideoId = (url) => {
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


    const scrollCarousel = (direction) => {
        const newPosition = direction === 'next' ? carouselPosition + cardWidth : carouselPosition - cardWidth;

        if (newPosition >= 0 && newPosition <= cardWidth * (musicas.length - 3)) {
            setCarouselPosition(newPosition);
        }
    };

    return (
        <CarouselContainer>
            <h2>Carrossel de Músicas</h2>
            <StyledButton onClick={() => scrollCarousel('prev')} disabled={carouselPosition === 0}>
                <img src={btnEsquerda} alt="Seta para a esquerda" />
                Anterior
            </StyledButton>
            <StyledButton onClick={() => scrollCarousel('next')} disabled={carouselPosition >= cardWidth * (musicas.length - 3)}>
                Próximo
                <img src={btnDireita} alt="Seta para a direita" />
            </StyledButton>
            <CarouselWrapper style={{ transform: `translateX(-${carouselPosition}px)` }}>
                {musicas.map((musica) => (
                    <SongCard key={musica.id}>
                        <SongImage src={getYouTubeThumbnail(musica.url)} alt="Thumbnail" />
                        <div>
                            <SongTitle>{musica.title}</SongTitle>
                            <ArtistName>{musica.artist}</ArtistName>
                        </div>
                    </SongCard>
                ))}
            </CarouselWrapper>
        </CarouselContainer>
    );
};

export default ListSongs;
