import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AptosClient, Types } from 'aptos'; // Make sure to install the Aptos SDK

const nodeUrl = "https://fullnode.devnet.aptoslabs.com/v1"; // Use the correct node URL
const client = new AptosClient(nodeUrl);

const MusicNFTCard = ({ nft, onBuy, onTip }) => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setIsLoading(true);

      // Assuming you have a function to generate the transaction payload
      const payload = await generateBuyTransactionPayload(account?.address, nft);

      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      onBuy(nft); 
      toast.success('NFT purchased successfully!');
    } catch (error) {
      console.error("Error buying NFT:", error);
      toast.error('Error buying NFT'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleTip = async (amount) => {
    try {
      setIsLoading(true);
      // Assuming you have a function to generate the tip transaction payload
      const payload = await generateTipTransactionPayload(account?.address, nft.artist, amount);

      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash); 

      onTip(nft, amount);
      toast.success(`Tipped ${amount} APT!`);
    } catch (error) {
      console.error("Error tipping artist:", error);
      toast.error('Error tipping artist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-card">
      {/* Display NFT image, title, artist, price, etc. */}
      <img src={nft.metadata_uri} alt={nft.title} />
      <h2>{nft.title}</h2>
      <p>By: {nft.artist}</p>
      
      <button onClick={handleBuy} disabled={isLoading}>
        {isLoading ? 'Buying...' : 'Buy'}
      </button>

      <div>
        <input type="number" placeholder="Tip Amount (APT)" />
        <button onClick={() => handleTip(amount)}>Tip</button>
      </div>
    </div>
  );
};

export default MusicNFTCard;
