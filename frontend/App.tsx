import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CreateNFT from './pages/CreateNFT';
import Marketplace from './pages/Marketplace';
import LiveStream from './pages/LiveStream';
import FractionalOwnership from './pages/FractionalOwnership';
import Governance from './pages/Governance';
import ArtistDashboard from './pages/Dashboard/ArtistDashboard';
import FanDashboard from './pages/Dashboard/FanDashboard';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import NFTDetail from './pages/NFTDetail';
import ArtistProfile from './pages/ArtistProfile';
import Profile from './pages/Profile';
import FanClub from './pages/FanClub';
import './App.scss';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const wallets = [
    new PetraWallet(),
    //new FewchaWalletAdapter(), // Include other wallet adapters as needed
  ];

const App: React.FC = () => {
    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect>
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/create-nft" element={<CreateNFT />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/live-streams" element={<LiveStream />} />
                    <Route path="/fractional-ownership" element={<FractionalOwnership />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/artist-dashboard" element={<ArtistDashboard />} />
                    <Route path="/fan-dashboard" element={<FanDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/nft/:id" element={<NFTDetail />} />
                    <Route path="/artist/:id" element={<ArtistProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/fan-club" element={<FanClub />} />
                </Routes>
            </main>
            <Footer />
        </Router>
        </AptosWalletAdapterProvider>
    );
};

export default App;