import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MusicNFTCard from '../components/MusicNFTCard';
import LiveStreamPlayer from '../components/LiveStreamPlayer';
import { getAllNFTs, getTrendingArtists, getFeaturedLiveStream } from '../utils/aptos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Home = () => {
  const [nfts, setNFTs] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [featuredLiveStream, setFeaturedLiveStream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNFTs = await getAllNFTs();
        setNFTs(fetchedNFTs);

        const fetchedTrendingArtists = await getTrendingArtists();
        setTrendingArtists(fetchedTrendingArtists);

        const fetchedFeaturedLiveStream = await getFeaturedLiveStream();
        setFeaturedLiveStream(fetchedFeaturedLiveStream);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNFTPurchase = (nft) => {
    // Handle NFT purchase logic here
    console.log('NFT purchased:', nft);
  };

  return (
    <div className="home-page">
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <>
          {featuredLiveStream && (
            <div className="featured-live-stream">
              <h3>Featured Live: {featuredLiveStream.artistName}</h3>
              <LiveStreamPlayer artistAddress={featuredLiveStream.artistAddress} />
            </div>
          )}

          <div className="trending-artists">
            <h3>Trending Artists</h3>
            <ul>
              {trendingArtists.map((artist) => (
                <li key={artist.address}>
                  <Link to={`/artist/${artist.address}`}>{artist.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nft-feed">
            <h3>Explore Music NFTs</h3>
            <div className="nft-grid">
              {nfts.map((nft) => (
                <MusicNFTCard key={nft.tokenId} nft={nft} onBuy={handleNFTPurchase} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
