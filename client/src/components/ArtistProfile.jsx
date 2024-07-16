import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, Types } from 'aptos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MusicNFTCard from './MusicNFTCard';
import FanClubChat from './FanClubChat';
import { getArtistProfile, getNFTsByArtist } from '../utils/aptos'; // Assuming you have these utility functions

const nodeUrl = 'https://fullnode.devnet.aptoslabs.com/v1';
const client = new AptosClient(nodeUrl);

const ArtistProfile = () => {
    const { artistAddress } = useParams();
    const { account } = useWallet();
    const navigate = useNavigate();
    const [artistNFTs, setArtistNFTs] = useState([]);
    const [artistProfile, setArtistProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getArtistProfile(client, artistAddress);
                if (profile) {
                    setArtistProfile(profile);
                } else {
                    toast.error('Artist profile not found.');
                    navigate('/'); // Redirect to home if profile doesn't exist
                }

                const nfts = await getNFTsByArtist(client, artistAddress);
                setArtistNFTs(nfts);
            } catch (error) {
                console.error('Error fetching artist data:', error);
                toast.error('Error fetching artist data.');
            }
        };
        fetchData();
    }, [artistAddress, navigate]); 

    // ... (handleNFTPurchase and generateTransactionPayload functions remain the same)

    return (
        <div className="artist-profile">
            {artistProfile ? (
                <>
                    {/* ... (artist profile display) */}
                </>
            ) : (
                <p>Loading artist profile...</p> // Display loading message
            )}

            <h3>NFTs</h3>
            {!artistNFTs.length ? (
                <p>No NFTs found for this artist.</p>
            ) : (
                <div className="nft-grid">
                    {artistNFTs.map((nft) => (
                        <MusicNFTCard 
                            key={nft.tokenId} 
                            nft={nft} 
                            onBuy={handleNFTPurchase} 
                            connectedWalletAddress={account?.address} 
                            />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistProfile;
