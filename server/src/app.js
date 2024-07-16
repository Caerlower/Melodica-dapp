const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { AptosClient, Types } = require('aptos');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // You can change this port

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Aptos Client (connect to Aptos fullnode)
const nodeUrl = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com/v1";
const client = new AptosClient(nodeUrl);

// Routes
const artistRoutes = require('./routes/artists');
const nftRoutes = require('./routes/nfts');
const fanclubRoutes = require('./routes/fanclubs');
const liveStreamRoutes = require('./routes/live-streams');
// const authRoutes = require('./routes/auth'); // Uncomment if you have authentication

app.use('/api/artists', artistRoutes(client));
app.use('/api/nfts', nftRoutes(client));
app.use('/api/fanclubs', fanclubRoutes(client));
app.use('/api/live-streams', liveStreamRoutes(client));
// app.use('/api/auth', authRoutes(client)); 

// Error handling middleware (example)
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
