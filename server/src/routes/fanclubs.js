const express = require('express');
const router = express.Router();
const fanclubController = require('../controllers/fanclubs'); // Assuming this file exists
const { Types } = require("aptos");
const { authenticate, authorizeFanClubMember } = require('../middleware/auth'); // Add your auth middleware

// Get fan club information by artist address
router.get('/:artistAddress', async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const fanClubInfo = await fanclubController.getFanClubInfo(req.app.locals.aptosClient, artistAddress);
        if (!fanClubInfo) {
            return res.status(404).json({ error: 'Fan club not found' });
        }
        res.json(fanClubInfo);
    } catch (error) {
        next(error);
    }
});

// Get exclusive content for a fan club 
router.get('/:artistAddress/exclusive-content', authenticate, authorizeFanClubMember, async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const exclusiveContent = await fanclubController.getExclusiveContent(req.app.locals.aptosClient, artistAddress);
        res.json(exclusiveContent);
    } catch (error) {
        next(error);
    }
});

// Get messages for a fan club's chat
router.get('/:artistAddress/messages', authenticate, authorizeFanClubMember, async (req, res, next) => {
    const { artistAddress } = req.params;

    try {
        const messages = await fanclubController.getFanClubMessages(artistAddress, req.app.locals.aptosClient);
        res.json(messages);
    } catch (error) {
        next(error);
    }
});

// Post a new message to a fan club's chat
router.post('/:artistAddress/messages', authenticate, authorizeFanClubMember, async (req, res, next) => {
    const { artistAddress } = req.params;
    const { message } = req.body;

    try {
        await fanclubController.postFanClubMessage(artistAddress, message, req.app.locals.aptosClient, req.user.address);
        res.sendStatus(201); // Created
    } catch (error) {
        next(error);
    }
});

module.exports = (client) => {
    router.use((req, res, next) => {
        req.app.locals.aptosClient = client;
        next();
    });
    return router;
};
