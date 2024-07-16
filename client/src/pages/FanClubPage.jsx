import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, Types } from 'aptos'; 
import { getFanClubInfo, getExclusiveContent, checkFanClubMembership } from '../utils/aptos';
import FanClubChat from '../components/FanClubChat';

const nodeUrl = 'https://fullnode.devnet.aptoslabs.com/v1'; // or your custom node URL
const client = new AptosClient(nodeUrl);

const FanClubPage = () => {
    const { artistAddress } = useParams();
    const { account } = useWallet();
    const navigate = useNavigate();
    const [fanClubInfo, setFanClubInfo] = useState(null);
    const [exclusiveContent, setExclusiveContent] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getFanClubInfo(client, artistAddress);
                if (info) {
                    setFanClubInfo(info);
                } else {
                    toast.error('Fan club not found.');
                    navigate('/'); // Redirect if fan club doesn't exist
                }

                // Fetch exclusive content regardless of membership status
                const content = await getExclusiveContent(artistAddress);
                setExclusiveContent(content);

                // Check if the user is a member (only if the account is connected)
                if (account) {
                    const membershipStatus = await checkFanClubMembership(client, account.address, artistAddress);
                    setIsMember(membershipStatus);
                }
            } catch (error) {
                console.error('Error fetching fan club data:', error);
                toast.error('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [artistAddress, account]); // Re-fetch data when artistAddress or account changes

    return (
        <div className="fan-club-page">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {fanClubInfo && (
                        <>
                            <h2>{fanClubInfo.name}</h2>
                            <p>{fanClubInfo.description}</p>

                            {/* Display exclusive content if the user is a member */}
                            {isMember ? (
                                <div className="exclusive-content">
                                    <h3>Exclusive Content</h3>
                                    {/* ... map over exclusiveContent and display each item ... */}
                                </div>
                            ) : (
                                <p>Join the fan club to access exclusive content!</p>
                            )}

                            <FanClubChat artistAddress={artistAddress} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default FanClubPage;
