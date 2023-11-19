import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedPage from '../../pages/FeedPage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ManageMusicPage from '../../pages/ManageMusicPage';
import NotFound from '../../pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/manage-music" element={<ManageMusicPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
