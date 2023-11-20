import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import btnDireita from '../../assets/btnDireita.png';
import btnEsquerda from '../../assets/btnEsquerda.png';

const PlaylistContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const PlaylistHeader = styled.div`
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
  margin-right: 0px;
`;

const RightButton = styled(StyledButton)`
  margin-left: 10px;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const PlaylistCard = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
`;

const PlaylistImage = styled.img`
  width: 260px;
  height: 180px;
`;

const PlaylistDetails = styled.div`
  margin-top: 10px;
  color: #fff;
`;

const PlaylistTitle = styled.strong`
  font-size: 18px;
  color: #fff;
`;

const PlaylistDescription = styled.p`
  color: #a9a9a9;
  font-size: 14px;
`;

const CarouselName = styled.h2`
  color: white;
  font-size: 32px;
`;

const ListPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const token = localStorage.getItem('token');
    const [carouselPosition, setCarouselPosition] = useState(0);

    const cardWidth = 320;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist',
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                console.log('Dados da API de playlists:', response.data);

                // Mapeia os dados para o formato desejado
                const playlistsWithImages = response.data.playlists.map((playlist) => ({
                    id: playlist._id,
                    name: playlist._name,
                    description: playlist._description,
                    imageUrl: `https://picsum.photos/300/180?random=${Math.random()}`,
                }));

                setPlaylists(playlistsWithImages);
            } catch (error) {
                console.error('Erro ao obter playlists:', error);
            }
        };

        fetchData();
    }, [token]);

    const scrollCarousel = (direction) => {
        const newPosition = direction === 'next' ? carouselPosition + cardWidth : carouselPosition - cardWidth;

        if (newPosition >= 0 && newPosition <= cardWidth * (playlists.length - 3)) {
            setCarouselPosition(newPosition);
        }
    };

    return (
        <PlaylistContainer>
            <PlaylistHeader>
                <CarouselName>🎵 Playlists</CarouselName>
                <ControlsContainer>
                    <LeftButton onClick={() => scrollCarousel('prev')} disabled={carouselPosition === 0}>
                        <img src={btnEsquerda} alt="Seta para a esquerda" />
                    </LeftButton>
                    <RightButton onClick={() => scrollCarousel('next')} disabled={carouselPosition >= cardWidth * (playlists.length - 3)}>
                        <img src={btnDireita} alt="Seta para a direita" />
                    </RightButton>
                </ControlsContainer>
            </PlaylistHeader>
            <PlaylistWrapper style={{ transform: `translateX(-${carouselPosition}px)` }}>
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id}>
                        <PlaylistImage src={playlist.imageUrl} alt="Playlist" />
                        <PlaylistDetails>
                            <PlaylistTitle>{playlist.name}</PlaylistTitle>
                            <PlaylistDescription>{playlist.description}</PlaylistDescription>
                            {/* Adicione outros detalhes da playlist conforme necessário */}
                        </PlaylistDetails>
                    </PlaylistCard>
                ))}
            </PlaylistWrapper>
        </PlaylistContainer>
    );
};

export default ListPlaylists;
