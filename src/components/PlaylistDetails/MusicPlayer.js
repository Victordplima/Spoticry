import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import btnPlay from '../../assets/btnPlay.png';
import btnPause from '../../assets/btnPause.png';
import btnPrevious from '../../assets/btnAnterior.png';
import btnNext from '../../assets/btnProximo.png';
import volumeIcon from '../../assets/btnVolume.png';
import { useMusic } from '../../MusicContext';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #212121;
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

const PlayButtonIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const PreviousButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

const PreviousButtonIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const NextButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

const NextButtonIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SongTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const SongArtist = styled.p`
  font-size: 1em;
  color: #a9a9a9;
`;

const TimeDisplay = styled.p`
  font-size: 0.8em;
  margin-top: 5px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 10px;
`;

const ProgressBar = styled.input`
  width: 100%;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const VolumeSlider = styled.input`
  width: 80px;
`;

const MusicPlayer = () => {
    const { currentSong } = useMusic();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
        if (currentSong) {
            setIsPlaying(true);
            setVolume(0.5);
            setPlayed(0);
        } else {
            setIsPlaying(false);
            setVolume(0);
            setPlayed(0);
        }
    }, [currentSong]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleReady = () => {
        if (currentSong) {
            playerRef.current.seekTo(0);
        }
    };


    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleProgress = (progress) => {
        setPlayed(progress.played);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSeekChange = (e) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = () => {
        playerRef.current.seekTo(played);
    };

    return (
        <PlayerContainer>
            <TimeDisplay>{formatTime(duration * played)}</TimeDisplay>
            <PlayerControls>
                <PreviousButton onClick={() => console.log('Previous')}>
                    <PreviousButtonIcon src={btnPrevious} alt="Previous" />
                </PreviousButton>
                <PlayButton onClick={handlePlayPause}>
                    <PlayButtonIcon
                        src={isPlaying ? btnPause : btnPlay}
                        alt={isPlaying ? 'Pause' : 'Play'}
                    />
                </PlayButton>
                <NextButton onClick={() => console.log('Next')}>
                    <NextButtonIcon src={btnNext} alt="Next" />
                </NextButton>
            </PlayerControls>
            {currentSong && (
                <SongInfo>
                    <SongTitle>{currentSong.title}</SongTitle>
                    <SongArtist>{currentSong.artist}</SongArtist>
                </SongInfo>
            )}
            <ProgressContainer>
                <ProgressBar
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
            </ProgressContainer>
            <VolumeContainer>
                <VolumeIcon src={volumeIcon} alt="Volume" />
                <VolumeSlider
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </VolumeContainer>
            <ReactPlayer
                url={currentSong ? currentSong.url : ''}
                playing={isPlaying}
                volume={volume}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onReady={handleReady}
                config={{ youtube: { playerVars: { start: 0 } } }}
                ref={playerRef}
                width="0"
                height="0"
            />
        </PlayerContainer>
    );
};

export default MusicPlayer;