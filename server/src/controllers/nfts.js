const { AptosClient, Types } = require('aptos');
const { retrieveNFTMetadata } = require('../utils/web3Storage');

exports.getAllNFTs = async (client, query) => {
    try {
        const { creatorAddress } = query;

        if (creatorAddress) {
            const account = creatorAddress;
            const resources = await client.getAccountResources(account);
            const nftResources = resources.filter(
                (r) => r.type.startsWith(`${creatorAddress}::music_nft::MusicNFT`)
            );
            const nfts = await Promise.all(nftResources.map(processNFTResource(client)));
            return nfts.filter(nft => nft !== null); // Remove null (invalid) NFTs
        } else {
            // Implement logic to fetch ALL NFTs if creatorAddress is not provided
            // This would likely involve querying across multiple artist addresses
            // or using a different method to aggregate NFT data on your backend.
            throw new Error("Fetching all NFTs without a creator address is not currently supported.");
        }
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw new Error("Failed to fetch NFTs."); // Generic error for higher layers
    }
};

// helper function to process an NFT resource
async function processNFTResource(client, resource) {
    const token = resource.data;
    try {
        const collectionData = await client.getTokenData(
            token.token_id.token_data_id.creator,
            token.token_id.token_data_id.collection,
            token.token_id.token_data_id.name
        );

        if (!collectionData) {
            console.error(`Token data not found for NFT: ${token.token_id.token_data_id.name}`);
            return null;
        }

        const metadataUri = collectionData.uri;
        const metadata = await retrieveNFTMetadata(metadataUri);

        if (!metadata) {
            console.error(`Metadata not found for NFT: ${token.token_id.token_data_id.name}`);
            return null; 
        }

        return {
            tokenId: token.token_id.token_data_id.name,
            title: token.title,
            artist: token.artist,
            metadataUri: metadataUri,
            royalty: token.royalty,
            fractionalNFTId: token.fractional_nft_id,
            ...metadata,
        };
    } catch (error) {
        console.error(`Error processing NFT resource: ${resource.type}`, error);
        return null; 
    }
}


exports.getNFTById = async (client, nftId, artistAddress) => {
    try {
        const resourceType = `${artistAddress}::music_nft::MusicNFT`; 
        const nftResource = await client.getAccountResource(artistAddress, resourceType, {
            token_id: {
              token_data_id: {
                creator: artistAddress,
                collection: "MusicNFT", // collection name
                name: nftId,           // token name
              },
              property_version: "0",
            },
        });

        if (!nftResource) {
            return null; // NFT not found
        }
        return processNFTResource(client, nftResource);
    } catch (error) {
        console.error("Error fetching NFT by ID:", error);
        throw error;
    }
};

// Function to get buy events for an NFT (implement based on your smart contract)
exports.getNFTBuyEvents = async (client, nftId) => {
    try {
      const events = await client.getEventsByEventHandle(
        "0x1", // Replace with the address where your contract is deployed
        "0x1::music_nft::BuyEvents",
        nftId // Pass the token ID as the field name
      );
      return events;
    } catch (error) {
      console.error("Error getting NFT buy events:", error);
      throw error;
    }
};
