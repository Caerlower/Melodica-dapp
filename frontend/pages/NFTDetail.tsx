// src/pages/NFTDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import './NFTDetail.scss';

// Define a type for the NFT data
interface NFTData {
    id: string;
    image: string;
    title: string;
    artist: string;
    price: string;
    description: string;
    owner: string;
}

const NFTDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the NFT ID from the URL and specify its type

    // Sample data for the NFT details (ideally this should come from a data source)
    const nftData: NFTData = {
        id: '1',
        image: '/assets/image2.jpeg',
        title: 'Epic Melody',
        artist: 'DJ Beats',
        price: '10',
        description: 'Epic Melody is a unique digital track created by DJ Beats, featuring an intense and captivating soundscape.',
        owner: '0x1234...5678',
    };

    const handleBuyNFT = () => {
        // Implement the purchase logic here
        console.log(`Buying NFT with ID: ${nftData.id}`);
    };

    return (
        <div className="nft-detail">
            <div className="nft-detail__image">
                <img src={nftData.image} alt={nftData.title} />
            </div>
            <div className="nft-detail__info">
                <h2 className="nft-detail__title">{nftData.title}</h2>
                <p className="nft-detail__artist">By: {nftData.artist}</p>
                <p className="nft-detail__description">{nftData.description}</p>
                <p className="nft-detail__price">{nftData.price} APT</p>
                <p className="nft-detail__owner">Owned by: {nftData.owner}</p>
                <button onClick={handleBuyNFT} className="nft-detail__buy-button">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default NFTDetail;
