import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SongGridContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 50px;
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const SongCard = styled.div`
  box-sizing: border-box;
  padding: 10px;
  background-color: #0000;
`;

const SongImage = styled.img`
  width: 280px;
  height: 180px;
  object-fit: cover;
`;

const SongTitle = styled.strong`
  color: #fff;
  font-size: 18px;
`;

const ArtistName = styled.p`
  color: #a9a9a9;
  font-size: 14px;
`;

const Name = styled.h2`
  color: white;
  font-size: 32px;
  padding-left: 10px;
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


const ListSongs = () => {
    const [musicas, setMusicas] = useState([]);
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
                setMusicas(response.data.songs);
            } catch (error) {
                console.error('Erro ao obter músicas:', error);
            }
        };

        fetchData();
    }, [token]);

    const getYouTubeVideoId = (url) => {
        const match = url.match(
            // não tire o comentario abaixo
            // eslint-disable-next-line no-useless-escape
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
        );
        return match ? match[1] : null;
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = getYouTubeVideoId(url);

        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        return 'https://via.placeholder.com/150';
    };

    // Função para ordenar músicas com base no critério escolhido
    const ordenarMusicas = (criterio) => {
        const musicasOrdenadas = [...musicas].sort((a, b) => {
            if (a[criterio] < b[criterio]) return -1;
            if (a[criterio] > b[criterio]) return 1;
            return 0;
        });

        setMusicas(musicasOrdenadas);
    };

    return (
        <SongGridContainer>
            <div>
                <Name> 🔥 Músicas </Name>
                <OrderButton onClick={() => ordenarMusicas('title')}>Ordenar por Título</OrderButton>
                <OrderButton onClick={() => ordenarMusicas('artist')}>Ordenar por Artista</OrderButton>
                {/* Adicione mais botões conforme necessário para outros critérios */}
            </div>
            <SongGrid>
                {musicas.map((musica) => (
                    <SongCard key={musica.id}>
                        <SongImage src={getYouTubeThumbnail(musica.url)} alt="Thumbnail" />
                        <div>
                            <SongTitle>{musica.title}</SongTitle>
                            <ArtistName>{musica.artist}</ArtistName>
                        </div>
                    </SongCard>
                ))}
            </SongGrid>
        </SongGridContainer>
    );
};

export default ListSongs;
