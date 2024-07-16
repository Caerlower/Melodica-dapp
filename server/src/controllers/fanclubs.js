const { AptosClient, Types } = require('aptos');
const { retrieveNFTMetadata } = require('../utils/web3Storage');

// Get fan club information
exports.getFanClubInfo = async (client, artistAddress) => {
    try {
        const resources = await client.getAccountResources(artistAddress);
        const fanClubResource = resources.find(
            (r) => r.type === `${artistAddress}::fan_club::FanClub` 
        );
        if (!fanClubResource) {
            return null; // Fan club not found
        }

        const fanClubData = fanClubResource.data;
        
        // Ensure the data has the required fields
        if (!fanClubData.name || !fanClubData.description || !fanClubData.nft_token) {
            throw new Error("Incomplete fan club data");
        }

        const nftInfo = await getNFTInfo(client, artistAddress, fanClubData.nft_token);

        return {
            name: fanClubData.name,
            description: fanClubData.description,
            nftToken: fanClubData.nft_token,
            nftInfo: nftInfo, 
            // ... (Other fields from your FanClub resource)
        };
    } catch (error) {
        console.error('Error fetching fan club info:', error);
        throw error;
    }
};

// Fetch NFT info by token ID and artist address
const getNFTInfo = async (client, artistAddress, nftTokenId) => {
    try {
        const resourceType = `${artistAddress}::music_nft::MusicNFT`;
        const nftResource = await client.getAccountResource(artistAddress, resourceType, {
            token_id: {
                token_data_id: {
                    creator: artistAddress,
                    collection: "MusicNFT", // Make sure this is your collection name
                    name: nftTokenId,           
                },
                property_version: "0",
            },
        });
        if (!nftResource) {
            return null; // NFT not found
        }

        const token = nftResource.data;
        const collectionData = await client.getTokenData(
            token.token_id.token_data_id.creator,
            token.token_id.token_data_id.collection,
            token.token_id.token_data_id.name
        );
        const metadataUri = collectionData.uri;
        const metadata = await retrieveNFTMetadata(metadataUri);

        return {
            tokenId: token.token_id.token_data_id.name,
            title: token.title,
            artist: token.artist,
            metadataUri: metadataUri,
            royalty: token.royalty,
            fractionalNFTId: token.fractional_nft_id,
            ...metadata
        };
    } catch (error) {
        console.error("Error fetching NFT by ID:", error);
        return null;
    }
};

// Get exclusive content for a fan club
exports.getExclusiveContent = async (client, artistAddress) => {
    try {
        const fanClubResource = await client.getAccountResource(
            artistAddress,
            `${artistAddress}::fan_club::FanClub`,
        );

        if (!fanClubResource) {
            return null; // Fan club not found
        }

        const exclusiveContentIds = fanClubResource.data.exclusive_content; // Assuming a list of content IDs

        // Fetch the content objects based on the IDs (replace with your implementation)
        const exclusiveContent = exclusiveContentIds.map(contentId => {
            // Fetch content from storage or wherever it's stored based on contentId
        });

        return exclusiveContent;
    } catch (error) {
        console.error('Error fetching exclusive content:', error);
        throw error;
    }
};

// Get messages for a fan club's chat
exports.getFanClubMessages = async (artistAddress, client) => {
    try {
        const storedMessages = await client.getTableItem(
            artistAddress,
            Types.MoveStructTag.fromString(`${artistAddress}::message_board::MessageBoard`),
            Types.MoveStructTag.fromString("0x1::string::String"),
            "messages"
        );
        if(storedMessages) {
            return JSON.parse(storedMessages);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error; 
    }
};

// Post a new message to a fan club's chat
exports.postFanClubMessage = async (artistAddress, message, client, senderAddress) => {
    try {
        const storedMessages = await client.getTableItem(
            artistAddress,
            Types.MoveStructTag.fromString(`${artistAddress}::message_board::MessageBoard`),
            Types.MoveStructTag.fromString("0x1::string::String"),
            "messages"
        );

        let newMessages = [];
        if (storedMessages) {
            newMessages = JSON.parse(storedMessages);
        }

        newMessages.push({ sender: senderAddress, content: message });

        const payload = {
            type: "entry_function_payload",
            function: `${artistAddress}::message_board::set_messages`, // Correct function name
            type_arguments: [],
            arguments: [JSON.stringify(newMessages)],
        };

        // Use the currently connected account 
        const txnHash = await client.signAndSubmitTransaction(senderAddress, payload);
        await client.waitForTransaction(txnHash);
    } catch (error) {
        console.error('Error posting message:', error);
        throw error;
    }
};
