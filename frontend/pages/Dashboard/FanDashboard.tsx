// src/pages/dashboard/FanDashboard.tsx

import React from 'react';
import './FanDashboard.scss';

interface Artist {
    id: string;
    name: string;
    genre: string;
    image: string;
}

interface NFT {
    id: string;
    title: string;
    artist: string;
    price: number;
    date: string;
}

interface Stream {
    id: string;
    title: string;
    artist: string;
    date: string;
    time: string;
}

const FanDashboard: React.FC = () => {
    // Sample data for the fan's favorite artists
    const favoriteArtists: Artist[] = [
        { id: '1', name: 'DJ Beats', genre: 'Electronic', image: '/assets/image1.jpeg' },
        { id: '2', name: 'Singer Star', genre: 'Pop', image: '/assets/image5.jpg' },
    ];

    // Sample data for the fan's owned NFTs
    const ownedNFTs: NFT[] = [
        { id: '1', title: 'Epic Melody', artist: 'DJ Beats', price: 10, date: '2024-09-01' },
        { id: '2', title: 'Harmony', artist: 'Singer Star', price: 8, date: '2024-08-28' },
    ];

    // Sample data for the fan's upcoming streams
    const subscribedStreams: Stream[] = [
        { id: '1', title: 'Live DJ Set', artist: 'DJ Beats', date: '2024-09-20', time: '20:00' },
        { id: '2', title: 'Behind the Scenes', artist: 'Singer Star', date: '2024-09-22', time: '18:00' },
    ];

    return (
        <div className="fan-dashboard">
            <h2>Fan Dashboard</h2>

            <section className="fan-dashboard__favorite-artists">
                <h3>Favorite Artists</h3>
                <div className="fan-dashboard__artist-list">
                    {favoriteArtists.map((artist) => (
                        <div key={artist.id} className="fan-dashboard__artist">
                            <img 
                                src={artist.image} 
                                alt={artist.name} 
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}  // Fixed image size
                            />
                            <h4>{artist.name}</h4>
                            <p>{artist.genre}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="fan-dashboard__owned-nfts">
                <h3>Owned NFTs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Price (APT)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownedNFTs.map((nft) => (
                            <tr key={nft.id}>
                                <td>{nft.title}</td>
                                <td>{nft.artist}</td>
                                <td>{nft.price}</td>
                                <td>{nft.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="fan-dashboard__upcoming-streams">
                <h3>Subscribed Live Streams</h3>
                <ul>
                    {subscribedStreams.map((stream) => (
                        <li key={stream.id}>
                            <strong>{stream.title}</strong> by {stream.artist} - {stream.date} at {stream.time}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default FanDashboard;
