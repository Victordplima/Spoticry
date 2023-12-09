import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  text-decoration: none;
`;

const PlaylistDescription = styled.p`
  color: #a9a9a9;
  font-size: 14px;
  text-decoration: none;
`;

const CarouselName = styled.h2`
  color: white;
  font-size: 32px;
`;


const OrderButton = styled.button`
  background-color: #212121;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #037dfa;
  }
`;

const ListPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [ordenacao, setOrdenacao] = useState('asc'); // Estado para rastrear a ordenação
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

    // Função para ordenar playlists com base no critério escolhido
    const ordenarPlaylists = (criterio) => {
        const playlistsOrdenadas = [...playlists].sort((a, b) => {
            if (ordenacao === 'asc') {
                return a[criterio].localeCompare(b[criterio]);
            } else {
                return b[criterio].localeCompare(a[criterio]);
            }
        });

        setPlaylists(playlistsOrdenadas);
        setOrdenacao(ordenacao === 'asc' ? 'desc' : 'asc'); // Inverte a ordenação
    };

    return (
        <PlaylistContainer>
            <PlaylistHeader>
                <CarouselName>🎵 Playlists</CarouselName>
                <ControlsContainer>
                    <LeftButton onClick={() => scrollCarousel('prev')} disabled={carouselPosition === 0}>
                        <img src={btnEsquerda} alt="Seta para a esquerda" />
                    </LeftButton>
                    <RightButton
                        onClick={() => scrollCarousel('next')}
                        disabled={carouselPosition >= cardWidth * (playlists.length - 3)}
                    >
                        <img src={btnDireita} alt="Seta para a direita" />
                    </RightButton>
                </ControlsContainer>
            </PlaylistHeader>
            <div>
                {/* Adicione botões para ordenação */}
                <OrderButton onClick={() => ordenarPlaylists('name')}>Ordenar por Nome (Asc)</OrderButton>
                <OrderButton onClick={() => ordenarPlaylists('name')}>Ordenar por Nome (Desc)</OrderButton>
            </div>
            <PlaylistWrapper style={{ transform: `translateX(-${carouselPosition}px)` }}>
                {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id}>
                        <Link to={`/playlist/${playlist.id}`} style={{ textDecoration: 'none' }}>
                            <PlaylistImage src={playlist.imageUrl} alt="Playlist" />
                            <PlaylistDetails>
                                <PlaylistTitle>{playlist.name}</PlaylistTitle>
                                <PlaylistDescription>{playlist.description}</PlaylistDescription>
                            </PlaylistDetails>
                        </Link>
                    </PlaylistCard>
                ))}
            </PlaylistWrapper>
        </PlaylistContainer>
    );
};

export default ListPlaylists;
