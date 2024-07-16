const jwt = require('jsonwebtoken');
const { checkFanClubMembership } = require('../utils/aptos'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Replace with your actual secret

// Middleware to authenticate users based on JWT token
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to authorize access to fan club-specific resources
exports.authorizeFanClubMember = async (req, res, next) => {
    try {
        const { artistAddress } = req.params;
        const userAddress = req.user.address; // Assuming you attached user info in 'authenticate' middleware

        // Check if the user is a member of the fan club
        const isMember = await checkFanClubMembership(req.app.locals.aptosClient, userAddress, artistAddress);

        if (!isMember) {
            return res.status(403).json({ error: 'Not a fan club member' });
        }

        next();
    } catch (error) {
        next(error);
    }
};
