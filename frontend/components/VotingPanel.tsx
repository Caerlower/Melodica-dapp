// src/components/VotingPanel.tsx

import React, { useState } from 'react';
import './VotingPanel.scss';

interface Proposal {
    id: string;
    title: string;
    description: string;
    options: string[];
}

interface VotingPanelProps {
    proposal: Proposal;
    onVote: (proposalId: string, selectedOption: number) => void;
}

const VotingPanel: React.FC<VotingPanelProps> = ({ proposal, onVote }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // Use number or null for the selected option

    const handleVote = () => {
        if (selectedOption !== null) {
            onVote(proposal.id, selectedOption);
            setSelectedOption(null); // Reset the selected option after voting
        }
    };

    return (
        <div className="voting-panel">
            <h3 className="voting-panel__title">{proposal.title}</h3>
            <p className="voting-panel__description">{proposal.description}</p>
            <div className="voting-panel__options">
                {proposal.options.map((option, index) => (
                    <label key={index} className="voting-panel__option">
                        <input
                            type="radio"
                            name="vote-option"
                            value={index}
                            checked={selectedOption === index}
                            onChange={() => setSelectedOption(index)}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <button onClick={handleVote} className="voting-panel__vote-button">
                Cast Vote
            </button>
        </div>
    );
};

export default VotingPanel;
