import React, { useState } from 'react';
import NFTCard from '../components/NFTCard';
import './Marketplace.scss';

// Define a type for the NFT data
interface NFT {
    id: string;
    image: string;
    title: string;
    artist: string;
    price: number;
    date: string;
    popularity: number;
}

const Marketplace: React.FC = () => {
    // Sample data for NFTs
    const allNFTs: NFT[] = [
        { id: '1', image: '/assets/image2.jpeg', title: 'Epic Melody', artist: 'DJ Beats', price: 10, date: '2024-09-01', popularity: 85 },
        { id: '2', image: '/assets/image3.png', title: 'Harmony', artist: 'Singer Star', price: 8, date: '2024-09-05', popularity: 92 },
        { id: '3', image: '/assets/image4.png', title: 'Synth Wave', artist: 'Electro Vibes', price: 12, date: '2024-08-25', popularity: 78 },
        { id: '4', image: '/assets/image7.jpg', title: 'Beat Drop', artist: 'Bass Master', price: 15, date: '2024-09-08', popularity: 88 },
    ];

    const [sortOption, setSortOption] = useState<string>('date');

    // Function to sort NFTs based on selected criteria
    const sortedNFTs = [...allNFTs].sort((a, b) => {
        switch (sortOption) {
            case 'price':
                return a.price - b.price; // Compare prices directly as numbers
            case 'popularity':
                return b.popularity - a.popularity;
            case 'date':
            default:
                return new Date(b.date).getTime() - new Date(a.date).getTime(); // Use getTime for date comparison
        }
    });

    return (
        <div className="marketplace">
            <h2>Marketplace</h2>
            <div className="marketplace__controls">
                <label htmlFor="sort">Sort by: </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="date">Date</option>
                    <option value="price">Price</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>
            
            <div className="marketplace__nft-list">
                {sortedNFTs.map(nft => (
                    <NFTCard key={nft.id} nft={nft} />
                ))}
            </div>
        </div>
    );
};

export default Marketplace;