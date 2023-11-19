import React, { useState } from 'react';
import AddSongModal from './AddSongModal';

const AddSongButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Adicionar Nova Música</button>
            {isModalOpen && <AddSongModal closeModal={closeModal} />}
        </div>
    );
};

export default AddSongButton;
