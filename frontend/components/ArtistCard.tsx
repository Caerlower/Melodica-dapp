// src/components/ArtistCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import './ArtistCard.scss';

interface Artist {
    id: string;
    name: string;
    bio: string;
    image: string;
}

interface ArtistCardProps {
    artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    return (
        <div className="artist-card">
            <div className="artist-card__image">
                <img src={artist.image} alt={`${artist.name} profile`} />
            </div>
            <div className="artist-card__details">
                <h4 className="artist-card__name">{artist.name}</h4>
                <p className="artist-card__bio">{artist.bio}</p>
                <div className="artist-card__actions">
                    <Link to={`/artist/${artist.id}`} className="artist-card__view-profile">
                        <FontAwesomeIcon icon={faEye} /> View Profile
                    </Link>
                    <button className="artist-card__follow">
                        <FontAwesomeIcon icon={faHeart} /> Follow
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtistCard;
