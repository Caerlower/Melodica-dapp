const { AptosClient, Types } = require("aptos");

// Function to get artist profile from the blockchain
exports.getArtistProfile = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        const profileResource = resources.find(
            (r) => r.type === '0x1::Coin::CoinStore<0x1::aptos_coin::AptosCoin>'
        );
        if (!profileResource) {
            return null; // Artist profile not found
        }

        const profileData = profileResource.data;

        // Ensure the data has the required fields
        if (!profileData.name || !profileData.bio || !profileData.profile_image_url) {
            throw new Error("Incomplete artist profile data");
        }

        return {
            address: artistAddress,
            name: profileData.name,
            bio: profileData.bio,
            profileImage: profileData.profile_image_url,
            // ... (Other fields from your Artist profile resource)
        };

    } catch (error) {
        console.error("Error fetching artist profile:", error);
        throw error;  // Re-throw for the error handler middleware
    }
};

// Function to get an artist's NFTs
exports.getArtistNFTs = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        const nftResources = resources.filter(
            (r) => r.type.startsWith(`${artistAddress}::music_nft::MusicNFT`)
        );

        const nfts = await Promise.all(
            nftResources.map(async (resource) => {
                const token = resource.data;
                const collectionData = await client.getTokenData(
                    token.token_id.token_data_id.creator,
                    token.token_id.token_data_id.collection,
                    token.token_id.token_data_id.name
                );
                const metadataUri = collectionData.uri;
                const metadata = await client.getTableItem(
                    token.token_id.token_data_id.creator,
                    Types.MoveStructTag.fromString(`${artistAddress}::music_nft::NFTData`),
                    Types.MoveStructTag.fromString("0x1::string::String"), // Key Type
                    metadataUri                                    // Value
                );
                return {
                    tokenId: token.token_id.token_data_id.name,
                    title: token.title,
                    artist: token.artist,
                    metadataUri: metadataUri,
                    royalty: token.royalty,
                    fractionalNFTId: token.fractional_nft_id,
                    ...metadata
                };
            })
        );
        return nfts;
    } catch (error) {
        console.error("Error fetching artist's NFTs:", error);
        throw error;
    }
};

// Function to check if an artist is live streaming (you'll need to implement this based on your project's requirements)
exports.isArtistLive = async (client, artistAddress) => {
    const resourceType = `${artistAddress}::live_stream::LiveStream`;
    try {
        const resources = await client.getAccountResources(artistAddress);
        return resources.some(r => r.type === resourceType);
    } catch (error) {
        console.error("Error checking live status:", error);
        throw error;
    }
};

// ... (You can add more artist-related functions here as needed)
