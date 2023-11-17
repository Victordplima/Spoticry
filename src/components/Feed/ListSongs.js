import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import btnDireita from '../../assets/btnDireita.png';
import btnEsquerda from '../../assets/btnEsquerda.png';

const CarouselContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    max-width: 30px;
  }
`;

const LeftButton = styled(StyledButton)`
  margin-right: 0px;  // Ajuste a distância à direita
`;

const RightButton = styled(StyledButton)`
  margin-left: 10px;   // Ajuste a distância à esquerda
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
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
            <CarouselHeader>
                <h2>Em alta</h2>
                <ControlsContainer>
                    <LeftButton onClick={() => scrollCarousel('prev')} disabled={carouselPosition === 0}>
                        <img src={btnEsquerda} alt="Seta para a esquerda" />
                    </LeftButton>
                    <RightButton onClick={() => scrollCarousel('next')} disabled={carouselPosition >= cardWidth * (musicas.length - 3)}>
                        <img src={btnDireita} alt="Seta para a direita" />
                    </RightButton>
                </ControlsContainer>
            </CarouselHeader>
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
