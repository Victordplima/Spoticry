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

    return (
        <SongGridContainer>
            <Name> 🔥 Músicas </Name>
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
