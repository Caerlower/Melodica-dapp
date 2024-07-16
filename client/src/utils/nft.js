import { NFTStorage, File } from 'nft.storage';
import { toast } from 'react-toastify';
import { NODE_URL } from '../config';
import { AptosClient, Types } from 'aptos';

const client = new AptosClient(NODE_URL);

const NFT_STORAGE_API_KEY = process.env.REACT_APP_NFT_STORAGE_API_KEY;

// Function to store NFT data and media on IPFS
export async function storeNFT(nft) {
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

    try {
        // File Preparation (assuming Base64 encoded audio and image)
        const musicFile = new File([convertBase64ToUint8Array(nft.audio)], 'music.mp3', {
            type: 'audio/mpeg', // Adjust if using a different audio format
        });
        const imageFile = new File([convertBase64ToUint8Array(nft.image)], 'cover.jpg', {
            type: 'image/jpeg', 
        });

        // Storing on IPFS with Metadata
        const metadata = await client.store({
            name: nft.title,
            description: nft.description,
            image: imageFile,
            properties: {
                artist: nft.artist,
                genre: nft.genre, // Add more properties as needed
            },
            animation_url: musicFile, // Optional: include the music file itself
        });
        
        toast.success('NFT metadata stored successfully on IPFS!');
        return metadata.url;
    } catch (error) {
        console.error('Error storing NFT on IPFS:', error);
        toast.error('Error storing NFT. Please try again later.');
        throw error;  // Re-throw for handling in the component
    }
}

// Helper Functions

function convertBase64ToUint8Array(base64String) {
    const base64Data = base64String.replace(/^data:.*,/, ''); // Remove data URI prefix
    const binaryString = atob(base64Data);
    const array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        array[i] = binaryString.charCodeAt(i);
    }
    return array;
}

// Store NFT data and media on IPFS
export async function storeNFT(nft) {
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  
    try {
      // File Preparation
      const musicFile = new File([convertBase64ToUint8Array(nft.audio)], 'music.mp3', { type: 'audio/mpeg' });
      const imageFile = new File([convertBase64ToUint8Array(nft.image)], 'cover.jpg', { type: 'image/jpeg' });
  
      // Storing on IPFS with Metadata
      const metadata = await client.store({
        name: nft.title,
        description: nft.description,
        image: imageFile,
        properties: {
          artist: nft.artist,
          genre: nft.genre,
          royaltyPercentage: nft.royaltyPercentage, // Example: '10' for 10%
          // Add more NFT-specific properties as needed
        },
        animation_url: musicFile, 
      });
      toast.success('NFT metadata stored successfully on IPFS!');
      return metadata.url;
    } catch (error) {
      console.error('Error storing NFT on IPFS:', error);
      toast.error('Error storing NFT. Please try again later.');
      throw error;
    }
  }
  
  // Check if a user owns a specific NFT
  export async function checkNFTOwnership(userAddress, nftTokenId, artistAddress) {
      const resourceType = `${artistAddress}::music_nft::MusicNFT`; 
      try {
          const resources = await client.getAccountResources(userAddress);
          return resources.some(resource => resource.type === resourceType &&
              resource.data.token_id.token_data_id.name === nftTokenId
          );
      } catch (error) {
          console.error('Error checking NFT ownership:', error);
          return false;
      }
  }
  
  
  // Fetch the royalty percentage for a specific NFT
  export async function getNFTRoyaltyPercentage(nftTokenId, artistAddress) {
      const resourceType = `${artistAddress}::music_nft::MusicNFT`; 
      try {
          const nftResource = await client.getAccountResource(artistAddress, resourceType);
          if(nftResource) {
              return nftResource.data.royalty;
          } else {
              throw new Error(`Could not find NFT resource with type ${resourceType}`);
          }
      } catch (error) {
          console.error('Error getting NFT royalty percentage:', error);
          throw error;
      }
  }