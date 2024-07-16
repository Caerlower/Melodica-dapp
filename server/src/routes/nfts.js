const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nfts');
const { Types } = require("aptos");

// Get all NFTs in the marketplace (with pagination/filtering options if needed)
router.get('/', async (req, res, next) => {
    try {
        const { creatorAddress } = req.query;
        
        if (creatorAddress) {
            const account = creatorAddress; 
            const resources = await req.app.locals.aptosClient.getAccountResources(account);

            const nftResources = resources.filter(
                (r) => r.type.startsWith(`${creatorAddress}::music_nft::MusicNFT`)
            );

            const nfts = await Promise.all(
                nftResources.map(async (resource) => {
                    const token = resource.data;
                    const collectionData = await req.app.locals.aptosClient.getTokenData(
                        token.token_id.token_data_id.creator,
                        token.token_id.token_data_id.collection,
                        token.token_id.token_data_id.name
                    );
                    const metadataUri = collectionData.uri;
                    const metadata = await req.app.locals.aptosClient.getTableItem(
                        token.token_id.token_data_id.creator,
                        Types.MoveStructTag.fromString(`${creatorAddress}::music_nft::NFTData`),
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
            return res.json(nfts);
        } else {
            // Fetch all NFTs logic when creatorAddress is not specified
            const nfts = await nftController.getAllNFTs(req.app.locals.aptosClient, req.query);
            res.json(nfts);
        }
    } catch (error) {
        next(error);
    }
});

// Get a specific NFT by its ID (along with its owner's address)
router.get('/:nftId', async (req, res, next) => {
    const { nftId } = req.params;

    try {
        const nft = await nftController.getNFTById(req.app.locals.aptosClient, nftId);
        if (!nft) {
            return res.status(404).json({ error: 'NFT not found' });
        }
        res.json(nft);
    } catch (error) {
        next(error);
    }
});

// Get all buy events for an NFT
router.get('/:nftId/buy-events', async (req, res, next) => {
    const { nftId } = req.params;

    try {
        const buyEvents = await nftController.getNFTBuyEvents(req.app.locals.aptosClient, nftId);
        res.json(buyEvents);
    } catch (error) {
        next(error);
    }
});


// ... other NFT-related routes (e.g., get royalty info, etc.)

module.exports = (client) => {
    router.use((req, res, next) => {
        req.app.locals.aptosClient = client;
        next();
    });
    return router;
};
