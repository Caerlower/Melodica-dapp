const express = require('express');
const router = express.Router();
const liveStreamController = require('../controllers/live-streams'); // Assuming this file exists

// Get live stream status of an artist (could be based on blockchain events or external API)
router.get('/:artistAddress', async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const isLive = await liveStreamController.isArtistLive(req.app.locals.aptosClient, artistAddress); 
        res.json({ isLive });
    } catch (error) {
        next(error);
    }
});

// Get the stream URL for an artist (if live and authorized)
router.get('/:artistAddress/stream', async (req, res, next) => {
    const { artistAddress } = req.params;
    
    try {
        const streamUrl = await liveStreamController.getStreamUrl(req.app.locals.aptosClient, artistAddress);
        if (!streamUrl) {
            return res.status(404).json({ error: 'Stream not found or not live' });
        }
        res.json({ streamUrl });
    } catch (error) {
        next(error);
    }
});


// Get a featured live stream (e.g., most popular/recent)
router.get('/featured', async (req, res, next) => {
    try {
        const featuredStream = await liveStreamController.getFeaturedLiveStream(req.app.locals.aptosClient);
        res.json(featuredStream);
    } catch (error) {
        next(error);
    }
});


// ... other live stream related routes (e.g., start/stop stream, etc.)

module.exports = (client) => {
    router.use((req, res, next) => {
        req.app.locals.aptosClient = client; // Attach Aptos client
        next();
    });
    return router;
};
