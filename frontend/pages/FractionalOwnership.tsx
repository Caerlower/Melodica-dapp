// src/pages/FractionalOwnership.tsx

import React, { useState } from 'react';
import './FractionalOwnership.scss';

interface FractionalNFT {
    id: string;
    title: string;
    artist: string;
    totalShares: number;
    availableShares: number;
    pricePerShare: number;
    image: string;
}

const FractionalOwnership: React.FC = () => {
    // Sample data for fractional NFTs
    const fractionalNFTs: FractionalNFT[] = [
        {
            id: '1',
            title: 'Epic Melody',
            artist: 'DJ Beats',
            totalShares: 1000,
            availableShares: 400,
            pricePerShare: 0.1,
            image: '/assets/image2.jpeg',
        },
        {
            id: '2',
            title: 'Harmony',
            artist: 'Singer Star',
            totalShares: 500,
            availableShares: 100,
            pricePerShare: 0.2,
            image: '/assets/image3.png',
        },
    ];

    const [selectedNFT, setSelectedNFT] = useState<FractionalNFT | null>(null);
    const [sharesToBuy, setSharesToBuy] = useState<string>('');

    const handleSelectNFT = (nft: FractionalNFT) => {
        setSelectedNFT(nft);
        setSharesToBuy('');
    };

    const handleBuyShares = () => {
        if (!sharesToBuy || Number(sharesToBuy) <= 0 || Number(sharesToBuy) > selectedNFT!.availableShares) {
            alert('Please enter a valid number of shares.');
            return;
        }

        // Implement the logic to handle buying shares here
        console.log(`Buying ${sharesToBuy} shares of ${selectedNFT!.title}`);

        // Reset after purchase
        setSelectedNFT(null);
        setSharesToBuy('');
    };

    return (
        <div className="fractional-ownership">
            <h2>Fractional Ownership</h2>

            <div className="fractional-ownership__list">
                {fractionalNFTs.map((nft) => (
                    <div key={nft.id} className="fractional-ownership__item" onClick={() => handleSelectNFT(nft)}>
                        <img src={nft.image} alt={nft.title} />
                        <h3>{nft.title}</h3>
                        <p>Artist: {nft.artist}</p>
                        <p>Price per Share: {nft.pricePerShare} APT</p>
                        <p>Available Shares: {nft.availableShares}/{nft.totalShares}</p>
                    </div>
                ))}
            </div>

            {selectedNFT && (
                <div className="fractional-ownership__details">
                    <h3>Invest in {selectedNFT.title}</h3>
                    <p>Price per Share: {selectedNFT.pricePerShare} APT</p>
                    <p>Available Shares: {selectedNFT.availableShares}/{selectedNFT.totalShares}</p>
                    <input
                        type="number"
                        placeholder="Enter number of shares"
                        value={sharesToBuy}
                        onChange={(e) => setSharesToBuy(e.target.value)}
                    />
                    <button onClick={handleBuyShares}>Buy Shares</button>
                </div>
            )}
        </div>
    );
};

export default FractionalOwnership;
