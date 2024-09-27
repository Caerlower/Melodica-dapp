// src/components/NFTCard.js

// src/components/NFTCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './NFTCard.scss';

interface NFT {
    id: string;
    image: string;
    title: string;
    artist: string;
    price: number;
}

interface NFTCardProps {
    nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    return (
        <div className="nft-card">
            <div className="nft-card__image">
                <img src={nft.image} alt={`${nft.title} cover`} />
            </div>
            <div className="nft-card__details">
                <h4 className="nft-card__title">{nft.title}</h4>
                <p className="nft-card__artist">By {nft.artist}</p>
                <p className="nft-card__price">{nft.price} APT</p>
                <div className="nft-card__actions">
                    <Link to={`/nft/${nft.id}`} className="nft-card__view-details">
                        <FontAwesomeIcon icon={faMusic} /> View Details
                    </Link>
                    <button className="nft-card__buy-now">
                        <FontAwesomeIcon icon={faCartPlus} /> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;

