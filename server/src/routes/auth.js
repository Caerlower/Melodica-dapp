const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); // Assuming you have an auth controller

// Sign up route
router.post('/signup', async (req, res, next) => {
    try {
        const { address, signature } = req.body;
        const token = await authController.signup(address, signature); // Implement in your controller
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

// Log in route
router.post('/login', async (req, res, next) => {
    try {
        const { address, signature } = req.body;
        const token = await authController.login(address, signature); // Implement in your controller
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = (client) => {
    router.use((req, res, next) => {
        req.app.locals.aptosClient = client; // Attach Aptos client
        next();
    });
    return router;
};
