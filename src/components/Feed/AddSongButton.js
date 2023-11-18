import React, { useState } from 'react';
import AddMusicModal from './AddMusicModal';
import axios from 'axios';

const Content = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addMusic = async (title, artist, url) => {
        const token = localStorage.getItem('token'); // Obtem o token do localStorage

        try {
            const response = await axios.post(
                'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/song',
                {
                    title,
                    artist,
                    url,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('Música adicionada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao adicionar música:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Adicionar Nova Música</button>
            {isModalOpen && <AddMusicModal closeModal={closeModal} addMusic={addMusic} />}
        </div>
    );
};

export default Content;
