// src/components/MusicPlayer.tsx

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import './MusicPlayer.scss';

interface Track {
    title: string;
    artist: string;
    url: string;
}

interface MusicPlayerProps {
    trackList: Track[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trackList }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = trackList[currentTrackIndex];

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % trackList.length);
        setIsPlaying(false);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + trackList.length) % trackList.length);
        setIsPlaying(false);
    };

    const handleEnded = () => {
        handleNext();
    };

    return (
        <div className="music-player">
            <audio
                ref={audioRef}
                src={currentTrack.url}
                onEnded={handleEnded}
            ></audio>
            <div className="music-player__details">
                <h4>{currentTrack.title}</h4>
                <p>{currentTrack.artist}</p>
            </div>
            <div className="music-player__controls">
                <button onClick={handlePrev} className="music-player__button">
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <button onClick={handlePlayPause} className="music-player__button">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button onClick={handleNext} className="music-player__button">
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
