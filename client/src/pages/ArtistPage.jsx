import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getArtistProfile, getNFTsByArtist, isArtistLive } from '../utils/aptos';
import { AptosClient, Types } from 'aptos'; 
import MusicNFTCard from '../components/MusicNFTCard';
import TipJar from '../components/TipJar';
import LiveStreamPlayer from '../components/LiveStreamPlayer';
import FanClubChat from '../components/FanClubChat';

const nodeUrl = "https://fullnode.devnet.aptoslabs.com/v1"; // Use the correct node URL
const client = new AptosClient(nodeUrl);

const ArtistPage = () => {
  const { artistAddress } = useParams();
  const [artistProfile, setArtistProfile] = useState(null);
  const [nfts, setNFTs] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getArtistProfile(client, artistAddress);
        if (profile) {
            setArtistProfile(profile);
        } else {
            toast.error('Artist profile not found.');
            // Handle artist not found (e.g., redirect)
        }

        const nftData = await getNFTsByArtist(client, artistAddress);
        setNFTs(nftData);

        const liveStatus = await isArtistLive(artistAddress);
        setIsLive(liveStatus);
      } catch (error) {
        console.error('Error fetching artist data:', error);
        toast.error('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [artistAddress]);

  const handleNFTPurchase = (nft) => {
    // Handle NFT purchase logic
    console.log('NFT purchased:', nft);
  };

  return (
    <div className="artist-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {artistProfile && (
            <div className="artist-info">
              <h2>{artistProfile.name}</h2>
              <p>{artistProfile.bio}</p>
              <TipJar artistAddress={artistAddress} />
            </div>
          )}

          {isLive && <LiveStreamPlayer artistAddress={artistAddress} />}

          <div className="nft-gallery">
            <h3>Music NFTs</h3>
            <div className="nft-grid">
              {nfts.map((nft) => (
                <MusicNFTCard key={nft.tokenId} nft={nft} onBuy={handleNFTPurchase} />
              ))}
            </div>
          </div>
           {/* Optionally, display other content like:
              <FanClubChat artistAddress={artistAddress} /> 
          */}
        </>
      )}
    </div>
  );
};

export default ArtistPage;
