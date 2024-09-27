import React, { useState, useMemo } from 'react';
import './LiveStream.scss';

// Define a type for the live stream data
interface LiveStream {
    id: string;
    title: string;
    artist: string;
    date: string;
    time: string;
    description: string;
    thumbnail: string;
    link: string;
    isLive: boolean;
}

const LiveStream: React.FC = () => {
    // Sample data for live streams (memoized for better performance)
    const liveStreams: LiveStream[] = useMemo(() => [
        {
            id: '1',
            title: 'Live DJ Set with DJ Beats',
            artist: 'DJ Beats',
            date: '2024-09-20',
            time: '20:00',
            description: 'Join DJ Beats for an exclusive live DJ set featuring the latest tracks and mixes.',
            thumbnail: '/assets/image1.jpeg',
            link: 'https://example.com/livestream1',
            isLive: true,
        },
        {
            id: '2',
            title: 'Behind the Scenes with Singer Star',
            artist: 'Singer Star',
            date: '2024-09-22',
            time: '18:00',
            description: 'Get a behind-the-scenes look at Singer Star’s latest recording session.',
            thumbnail: '/assets/image5.jpg',
            link: 'https://example.com/livestream2',
            isLive: false,
        },
    ], []);

    const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);

    const handleSelectStream = (stream: LiveStream) => {
        setSelectedStream(stream);
    };

    return (
        <div className="live-stream">
            <h2>Live Streams</h2>

            <section className="live-stream__list" aria-label="Available live streams">
                {liveStreams.map(({ id, title, artist, date, time, description, thumbnail, link, isLive }) => (
                    <article 
                        key={id} 
                        className="live-stream__item" 
                        onClick={() => handleSelectStream({ id, title, artist, date, time, description, thumbnail, link, isLive })} 
                        role="button" 
                        aria-pressed="false"
                        tabIndex={0} // Updated to use number instead of string
                    >
                        <img 
                            src={thumbnail} 
                            alt={`${title} thumbnail`} 
                            loading="lazy"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }} // Fixed image size
                        />
                        <div className="live-stream__info">
                            <h3>{title}</h3>
                            <p>Artist: {artist}</p>
                            <p>Date: {date}</p>
                            <p>Time: {time}</p>
                            {isLive && <span className="live-stream__badge" aria-label="Live stream ongoing">LIVE</span>}
                        </div>
                    </article>
                ))}
            </section>

            {selectedStream && (
                <div className="live-stream__details">
                    <h3>{selectedStream.title}</h3>
                    <p>{selectedStream.description}</p>
                    <a href={selectedStream.link} target="_blank" rel="noopener noreferrer">
                        Join Stream
                    </a>
                    <button onClick={() => setSelectedStream(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default LiveStream;