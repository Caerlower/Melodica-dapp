// src/pages/ArtistProfile.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NFTCard from '../components/NFTCard';
import './ArtistProfile.scss';

interface Artist {
    id: string;
    name: string;
    bio: string;
    image: string;
}

interface NFT {
    id: string;
    image: string;
    title: string;
    artist: string;
    price: number;
}

const ArtistProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the artist ID from the URL

    // Sample data for artist and their NFTs
    const artistData: Artist = {
        id: '1',
        name: 'DJ Beats',
        bio: 'DJ Beats is a renowned music producer known for epic melodies and chart-topping tracks. With a passion for electronic music, DJ Beats has been at the forefront of the industry for over a decade.',
        image: '/assets/image1.jpeg',
    };

    const artistNFTs: NFT[] = [
        { id: '1', image: '/assets/image2.jpeg', title: 'Epic Melody', artist: 'DJ Beats', price: 10 },
        { id: '2', image: '/assets/image3.png', title: 'Harmony', artist: 'DJ Beats', price: 8 },
    ];

    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // Implement follow logic here, e.g., updating the backend
    };

    return (
        <div className="artist-profile">
            <div className="artist-profile__header">
                <img 
                    src={artistData.image} 
                    alt={artistData.name} 
                    className="artist-profile__image" 
                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }} // Fixed image size and styling
                />
                <div className="artist-profile__info">
                    <h2 className="artist-profile__name">{artistData.name}</h2>
                    <p className="artist-profile__bio">{artistData.bio}</p>
                    <button className="artist-profile__follow-button" onClick={handleFollow}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>

            <section className="artist-profile__nfts">
                <h3>{artistData.name}'s Music NFTs</h3>
                <div className="artist-profile__nft-list">
                    {artistNFTs.map(nft => (
                        <NFTCard key={nft.id} nft={nft} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArtistProfile;
