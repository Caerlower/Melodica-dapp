const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artists'); // Assuming this file exists

// Get artist profile (including basic info, NFTs, etc.)
router.get('/:artistAddress', async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const artistProfile = await artistController.getArtistProfile(req.app.locals.aptosClient, artistAddress);
        if (!artistProfile) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.json(artistProfile); 
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});

// Get all NFTs created by an artist
router.get('/:artistAddress/nfts', async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const artistNFTs = await artistController.getArtistNFTs(req.app.locals.aptosClient, artistAddress);
        res.json(artistNFTs);
    } catch (error) {
        next(error);
    }
});

// Get live stream status of an artist (you need to implement this in the controller)
router.get('/:artistAddress/live', async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const isLive = await artistController.isArtistLive(artistAddress);
        res.json({ isLive });
    } catch (error) {
        next(error);
    }
});

module.exports = (client) => {
    // Make the Aptos client available to all routes in this file
    router.use((req, res, next) => {
        req.app.locals.aptosClient = client;
        next();
    });
    return router;
};
