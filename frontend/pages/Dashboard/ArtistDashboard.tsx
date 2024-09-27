// src/pages/dashboard/ArtistDashboard.tsx

import React from 'react';
import './ArtistDashboard.scss';

interface Stats {
    totalNFTs: number;
    totalRevenue: number; // In APT
    upcomingStreams: number;
    followers: number;
}

interface RecentNFT {
    id: string;
    title: string;
    price: number;
    date: string;
}

interface UpcomingStream {
    id: string;
    title: string;
    date: string;
    time: string;
}

const ArtistDashboard: React.FC = () => {
    // Sample data for the artist's statistics
    const stats: Stats = {
        totalNFTs: 12,
        totalRevenue: 340.5, // In APT
        upcomingStreams: 2,
        followers: 1200,
    };

    // Sample data for the artist's recent NFTs
    const recentNFTs: RecentNFT[] = [
        { id: '1', title: 'Epic Melody', price: 10, date: '2024-09-01' },
        { id: '2', title: 'Harmony', price: 8, date: '2024-08-28' },
        { id: '3', title: 'Synth Wave', price: 12, date: '2024-08-20' },
    ];

    // Sample data for upcoming live streams
    const upcomingStreams: UpcomingStream[] = [
        { id: '1', title: 'Live DJ Set', date: '2024-09-20', time: '20:00' },
        { id: '2', title: 'Behind the Scenes', date: '2024-09-22', time: '18:00' },
    ];

    return (
        <div className="artist-dashboard">
            <h2>Artist Dashboard</h2>

            <div className="artist-dashboard__stats">
                <div className="stat">
                    <h3>{stats.totalNFTs}</h3>
                    <p>Total NFTs</p>
                </div>
                <div className="stat">
                    <h3>{stats.totalRevenue} APT</h3>
                    <p>Total Revenue</p>
                </div>
                <div className="stat">
                    <h3>{stats.upcomingStreams}</h3>
                    <p>Upcoming Streams</p>
                </div>
                <div className="stat">
                    <h3>{stats.followers}</h3>
                    <p>Followers</p>
                </div>
            </div>

            <section className="artist-dashboard__recent-nfts">
                <h3>Recent NFTs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price (APT)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentNFTs.map((nft) => (
                            <tr key={nft.id}>
                                <td>{nft.title}</td>
                                <td>{nft.price}</td>
                                <td>{nft.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="artist-dashboard__upcoming-streams">
                <h3>Upcoming Live Streams</h3>
                <ul>
                    {upcomingStreams.map((stream) => (
                        <li key={stream.id}>
                            <strong>{stream.title}</strong> - {stream.date} at {stream.time}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ArtistDashboard;
