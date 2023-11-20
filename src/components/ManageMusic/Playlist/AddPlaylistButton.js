import React, { useState } from 'react';
import AddPlaylistModal from './AddPlaylistModal';

const AddPlaylistButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Adicionar Nova Playlist</button>
            {isModalOpen && <AddPlaylistModal closeModal={closeModal} />}
        </div>
    );
};

export default AddPlaylistButton;
