import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Hls from 'hls.js'; // HLS (HTTP Live Streaming) library 

const LiveStreamPlayer = () => {
    const { artistAddress } = useParams(); // Get artist address from route
    const { connected } = useWallet();
    const videoRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    const [hls, setHls] = useState(null);

    useEffect(() => {
        // Check if the artist is live (e.g., fetch from backend)
        const checkLiveStatus = async () => {
            try {
                const response = await fetch(`/api/artists/${artistAddress}/live`); // Example API call
                const data = await response.json();
                setIsLive(data.isLive);
            } catch (error) {
                console.error('Error checking live status:', error);
            }
        };
        
        checkLiveStatus();

        // Clean up HLS instance on unmount
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [artistAddress]);

    useEffect(() => {
        if (isLive && videoRef.current && Hls.isSupported()) {
            const newHls = new Hls();
            newHls.loadSource(`/api/artists/${artistAddress}/stream`); // Example stream URL
            newHls.attachMedia(videoRef.current);
            newHls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });
            setHls(newHls);
        }
    }, [isLive, artistAddress]);

    return (
        <div className="live-stream-player">
            {isLive ? (
                <>
                    {connected ? ( // Only show video if connected
                        <video ref={videoRef} controls />
                    ) : (
                        <p>Connect your wallet to watch the live stream.</p>
                    )}
                </>
            ) : (
                <p>This artist is not currently live.</p>
            )}
        </div>
    );
};

export default LiveStreamPlayer;
