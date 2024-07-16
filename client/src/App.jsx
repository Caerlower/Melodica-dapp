import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet, MartianWallet } from 'petra-plugin-wallet-adapter'; 
import { createTheme, ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ArtistPage from './pages/ArtistPage';
import FanClubPage from './pages/FanClubPage';
import Navbar from './components/Navbar';

// Custom theme for Material UI
const theme = createTheme({
  // ... your custom theme settings 
});

function AppContent() {
  const { connected, connect } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        await connect();
        setIsLoading(false);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        toast.error('Could not connect wallet'); // Display error message to user
      }
    };

    if (!connected) {
      connectWallet(); 
    } else {
      setIsLoading(false); // If already connected, remove loading state
    }
  }, [connected]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <ToastContainer />
        {isLoading ? ( // Show loading indicator until wallet is connected
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/artist/:artistAddress" element={<ArtistPage />} />
            <Route path="/fanclub/:artistAddress" element={<FanClubPage />} />
            {/* ... other routes as needed */}
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

function App() {
  const wallets = [
    new PetraWallet(),
    new MartianWallet()
  ]; 

  return (
    <WalletProvider
      wallets={wallets}
      autoConnect={true}
    >
      <AppContent />
    </WalletProvider>
  );
}

export default App;
