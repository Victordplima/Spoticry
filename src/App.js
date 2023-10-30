import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Link to="/">Ir para o Home  |  </Link>
      <Link to="/feed">Ir para o Feed  |  </Link>
      <Link to="/login">Ir para o Login</Link>
      <Link to="/register">Ir para o Registro</Link>
    </Router>
  );
}

export default App;

