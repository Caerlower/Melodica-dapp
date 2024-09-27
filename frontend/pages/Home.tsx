// src/pages/Home.tsx

import React from 'react';
import NFTCard from '../components/NFTCard';
import ArtistCard from '../components/ArtistCard';
import MusicPlayer from '../components/MusicPlayer';
import './Home.scss';

// Define types for the data structures used
interface NFT {
    id: string;
    image: string;
    title: string;
    artist: string;
    price: number;
}

interface Artist {
    id: string;
    image: string;
    name: string;
    bio: string;
}

interface MusicTrack {
    title: string;
    artist: string;
    url: string;
}

const Home: React.FC = () => {
    // Sample data for NFTs, artists, and music tracks
    const featuredNFTs: NFT[] = [
        { id: '1', image: '/assets/image2.jpeg', title: 'Epic Melody', artist: 'DJ Beats', price: 10 },
        { id: '2', image: '/assets/image3.png', title: 'Harmony', artist: 'Singer Star', price: 8 },
        { id: '3', image: '/assets/image4.png', title: 'Synth Wave', artist: 'Electro Vibes', price: 12 },
    ];

    const popularArtists: Artist[] = [
        { id: '1', image: '/assets/image1.jpeg', name: 'DJ Beats', bio: 'Master of epic melodies.' },
        { id: '2', image: '/assets/image5.jpg', name: 'Singer Star', bio: 'Voice of a generation.' },
        { id: '3', image: '/assets/image6.jpg', name: 'Electro Vibes', bio: 'Creator of synth waves.' },
    ];

    const musicTracks: MusicTrack[] = [
        { title: 'Epic Melody', artist: 'DJ Beats', url: '/music/epic-melody.mp3' },
        { title: 'Harmony', artist: 'Singer Star', url: '/music/harmony.mp3' },
        { title: 'Synth Wave', artist: 'Electro Vibes', url: '/music/synth-wave.mp3' },
    ];

    return (
        <div className="home">
            <section className="home__featured-nfts">
                <h2>Featured NFTs</h2>
                <div className="home__nft-list">
                    {featuredNFTs.map(nft => (
                        <NFTCard key={nft.id} nft={nft} />
                    ))}
                </div>
            </section>

            <section className="home__popular-artists">
                <h2>Popular Artists</h2>
                <div className="home__artist-list">
                    {popularArtists.map(artist => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>
            </section>

            <section className="home__music-player">
                <h2>Now Playing</h2>
                <MusicPlayer trackList={musicTracks} />
            </section>
        </div>
    );
};

export default Home;
