// src/components/TipButton.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import './TipButton.scss';

interface TipButtonProps {
    artistId: string;
    onTip: (artistId: string, amount: number) => void;
}

const TipButton: React.FC<TipButtonProps> = ({ artistId, onTip }) => {
    const [amount, setAmount] = useState<string>(''); // Track amount as a string for easier input handling

    const handleTip = () => {
        const tipAmount = parseFloat(amount); // Convert string to a number
        if (tipAmount > 0) {
            onTip(artistId, tipAmount);
            setAmount(''); // Reset input after tipping
        }
    };

    return (
        <div className="tip-button">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="tip-button__input"
            />
            <button onClick={handleTip} className="tip-button__send">
                <FontAwesomeIcon icon={faCoins} /> Tip
            </button>
        </div>
    );
};

export default TipButton;
