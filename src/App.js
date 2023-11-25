import React from 'react';
import AppRoutes from '../src/components/Rotas/Routes'
import { BrowserRouter as Router } from 'react-router-dom';
import { MusicProvider } from './MusicContext';

function App() {
  return (
    <MusicProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MusicProvider>
  );
}

export default App;