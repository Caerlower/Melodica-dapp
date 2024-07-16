import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AptosClient, Types } from 'aptos'; // Make sure to install the Aptos SDK

const nodeUrl = 'https://fullnode.devnet.aptoslabs.com/v1';
const client = new AptosClient(nodeUrl);

const TipJar = ({ artistAddress }) => {
    const { connected, signAndSubmitTransaction, account } = useWallet();
    const [tipAmount, setTipAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTip = async () => {
        if (!connected) {
            toast.error('Please connect your wallet to tip.');
            return;
        }

        const amountInWei = parseInt(tipAmount, 10) * 10 ** 8; // Convert to Aptos wei (1 APT = 10^8 Octas)
        setIsLoading(true);

        try {
            const payload: Types.TransactionPayload = {
                type: "entry_function_payload",
                function: "0x1::coin::transfer",
                type_arguments: ["0x1::aptos_coin::AptosCoin"],
                arguments: [artistAddress, amountInWei],
            };
            const response = await signAndSubmitTransaction(payload);
            await client.waitForTransaction(response.hash); 
            toast.success(`Tipped ${tipAmount} APT!`);
        } catch (error) {
            console.error("Error tipping artist:", error);
            toast.error('Error tipping artist');
        } finally {
            setTipAmount('');
            setIsLoading(false);
        }
    };

    return (
        <div className="tip-jar">
            <h3>Tip Jar</h3>
            <input 
                type="number" 
                value={tipAmount} 
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="Enter tip amount in APT" 
            />
            <button onClick={handleTip} disabled={!tipAmount || isLoading}>
                {isLoading ? 'Tipping...' : 'Tip'}
            </button>
        </div>
    );
};

export default TipJar;
