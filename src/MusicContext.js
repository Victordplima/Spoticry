import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <MusicContext.Provider value={{ currentSong, playSong }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};
