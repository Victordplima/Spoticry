import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedPage from '../../pages/FeedPage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import PlaylistDetails from '../../pages/PlaylistDetails';
import SearchPage from '../../pages/SearchPage';
import NotFound from '../../pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
