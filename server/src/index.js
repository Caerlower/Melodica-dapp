const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { AptosClient, Types } = require('aptos');
const errorHandler = require('./middleware/errorHandler'); // Custom error handling middleware

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const nodeUrl = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com/v1";
const client = new AptosClient(nodeUrl);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
const artistRoutes = require('./routes/artists');
const nftRoutes = require('./routes/nfts');
const fanclubRoutes = require('./routes/fanclubs');
const liveStreamRoutes = require('./routes/live-streams');
// const authRoutes = require('./routes/auth'); // Uncomment if using authentication

// Apply routes
app.use('/api/artists', artistRoutes(client));
app.use('/api/nfts', nftRoutes(client));
app.use('/api/fanclubs', fanclubRoutes(client));
app.use('/api/live-streams', liveStreamRoutes(client));
// app.use('/api/auth', authRoutes(client)); // Uncomment if using authentication

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
