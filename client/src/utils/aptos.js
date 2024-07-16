import { AptosClient, Types } from 'aptos';
import { NODE_URL } from '../config'; 

const client = new AptosClient(NODE_URL);

// --- Artist Profile ---

export const getArtistProfile = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        const profileResource = resources.find(
            (r) => r.type === '0x1::Coin::CoinStore<0x1::aptos_coin::AptosCoin>'
        ); 
        if (!profileResource) {
            console.warn("Artist profile resource not found.");
            return null;
        }

        const profileData = profileResource.data; 
        if (!profileData.name || !profileData.bio || !profileData.profile_image_url) {
            console.error("Incomplete artist profile data.");
            return null;
        }

        return {
            name: profileData.name,
            bio: profileData.bio,
            profileImage: profileData.profile_image_url,
            // ... (Other fields from your Artist profile resource)
        };
    } catch (error) {
        console.error("Error fetching artist profile:", error);
        throw error;  // Re-throw the error for handling in the component
    }
};

// --- NFTs ---

export const getAllNFTs = async () => {
    try {
        const response = await fetch(`/api/nfts`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching all NFTs:', error);
        throw error;
    }
};

export const getNFTsByArtist = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        // Ensure the resources are actually an array
        if (!Array.isArray(resources)) {
            console.error("Unexpected response format: resources is not an array");
            return [];
        }

        const nftResources = resources.filter(r => 
            r.type.startsWith("0x3::token::TokenStore") // adjust if using a different token standard
        );

        const nfts = await Promise.all(
            nftResources.map(async (resource) => {
                const tokenDataId = resource.data.token_data_id;
                const tokenData = await client.getTokenData(
                    tokenDataId.creator,
                    tokenDataId.collection,
                    tokenDataId.name
                );

                return {
                    tokenId: tokenDataId.name, // Assuming this is how you identify NFTs
                    title: tokenData.name,
                    artist: tokenDataId.creator,
                    metadata_uri: tokenData.uri,
                    // ... other fields from your NFT resource
                };
            })
        );

        return nfts;
    } catch (error) {
        console.error("Error fetching artist's NFTs:", error);
        throw error;
    }
};

// --- Live Stream ---

export const isArtistLive = async (artistAddress) => {
    try {
        const response = await fetch(`/api/artists/${artistAddress}/live`); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.isLive || false; // Default to false if the field is missing
    } catch (error) {
        console.error("Error checking live status:", error);
        return false;
    }
};

// --- Fan Club ---

export const getFanClubInfo = async (client, artistAddress) => {
    // ... Fetch fan club info from the blockchain or your backend API
    // Example using blockchain (assuming you have a fan club resource in your Move module):
    try {
        const resources = await client.getAccountResources(artistAddress);
        const fanClubResource = resources.find(r => r.type === "0x42::fan_club::FanClub"); 
        if (fanClubResource) {
            return fanClubResource.data; 
        } else {
            return null; // Fan club not found
        }
    } catch (error) {
        console.error("Error fetching fan club info:", error);
        return null;
    }
};

export const getExclusiveContent = async (artistAddress) => {
    // ... Fetch exclusive content from your backend API
    const response = await fetch(`/api/fanclubs/${artistAddress}/exclusive-content`);
    return response.json(); 
};

export const checkFanClubMembership = async (client, userAddress, artistAddress) => {
    // ... Check if the user owns the required NFT or token
    const nftResources = await client.getAccountResources(userAddress);
    // check for a specific NFT
    return nftResources.some(resource => 
        resource.type === "0x1::token::TokenStore" &&
        resource.data.token_data_id.creator === artistAddress
    );
};


// --- Trending Artists and Genres ---
export const getTrendingArtists = async () => {
    // ... Fetch trending artists from your backend API
    const response = await fetch(`/api/trending-artists`);
    return response.json();
};

export const getFeaturedGenres = async () => {
    // ... Fetch featured genres from your backend API
    const response = await fetch(`/api/featured-genres`);
    return response.json();
};

export const getFeaturedLiveStream = async () => {
    // ... Fetch the currently featured live stream from your backend API
    const response = await fetch('/api/live-streams/featured');
    return response.json();
};