// src/pages/Explore.tsx

import React, { useState } from 'react';
import NFTCard from '../components/NFTCard';
import ArtistCard from '../components/ArtistCard';
import './Explore.scss';

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

const Explore: React.FC = () => {
    // Sample data for NFTs and artists
    const allNFTs: NFT[] = [
        { id: '1', image: '/assets/image2.jpeg', title: 'Epic Melody', artist: 'DJ Beats', price: 10 },
        { id: '2', image: '/assets/image3.png', title: 'Harmony', artist: 'Singer Star', price: 8 },
        { id: '3', image: '/assets/image4.png', title: 'Synth Wave', artist: 'Electro Vibes', price: 12 },
        { id: '4', image: '/assets/image7.jpg', title: 'Beat Drop', artist: 'Bass Master', price: 15 },
    ];

    const allArtists: Artist[] = [
        { id: '1', image: '/assets/image1.jpeg', name: 'DJ Beats', bio: 'Master of epic melodies.' },
        { id: '2', image: '/assets/image5.jpg', name: 'Singer Star', bio: 'Voice of a generation.' },
        { id: '3', image: '/assets/image6.jpg', name: 'Electro Vibes', bio: 'Creator of synth waves.' },
        { id: '4', image: '/assets/image8.jpg', name: 'Bass Master', bio: 'The king of deep bass drops.' },
    ];

    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filter NFTs and artists based on the search term
    const filteredNFTs = allNFTs.filter(nft =>
        nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredArtists = allArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="explore">
            <h2>Explore Music NFTs & Artists</h2>
            <div className="explore__search">
                <input
                    type="text"
                    placeholder="Search NFTs or Artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <section className="explore__nfts">
                <h3>Music NFTs</h3>
                <div className="explore__nft-list">
                    {filteredNFTs.map(nft => (
                        <NFTCard key={nft.id} nft={nft} />
                    ))}
                </div>
            </section>

            <section className="explore__artists">
                <h3>Artists</h3>
                <div className="explore__artist-list">
                    {filteredArtists.map(artist => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Explore;
