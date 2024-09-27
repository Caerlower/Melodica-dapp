// src/pages/Governance.tsx

import React, { useState } from 'react';
import './Governance.scss';

interface Proposal {
    id: string;
    title: string;
    description: string;
    options: string[];
    votes: number[];
}

const Governance: React.FC = () => {
    const proposals: Proposal[] = [
        {
            id: '1',
            title: 'Proposal 1: Introduce New Genre',
            description: 'Should we introduce a new genre category for ambient music?',
            options: ['Yes', 'No', 'Abstain'],
            votes: [120, 30, 10],
        },
        {
            id: '2',
            title: 'Proposal 2: Increase NFT Royalty Percentage',
            description: 'Should we increase the default royalty percentage for music NFTs from 5% to 7%?',
            options: ['Yes', 'No', 'Abstain'],
            votes: [80, 50, 15],
        },
    ];

    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleSelectProposal = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setSelectedOption(null); // Reset selected option
    };

    const handleVote = () => {
        if (selectedOption === null) {
            alert('Please select an option to vote.');
            return;
        }
        if (selectedProposal) {
            console.log(`Voted ${selectedProposal.options[selectedOption]} on ${selectedProposal.title}`);
        }
        setSelectedProposal(null);
        setSelectedOption(null); // Reset after voting
    };

    return (
        <div className="governance">
            <h2>Governance</h2>

            <div className="governance__list">
                {proposals.map((proposal) => (
                    <div key={proposal.id} className="governance__item" onClick={() => handleSelectProposal(proposal)}>
                        <h3>{proposal.title}</h3>
                        <p>{proposal.description}</p>
                        <p>Total Votes: {proposal.votes.reduce((acc, vote) => acc + vote, 0)}</p>
                    </div>
                ))}
            </div>

            {selectedProposal && (
                <div className="governance__details">
                    <h3>{selectedProposal.title}</h3>
                    <p>{selectedProposal.description}</p>

                    <div className="governance__options">
                        {selectedProposal.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="voteOption"
                                    value={index}
                                    checked={selectedOption === index}
                                    onChange={() => setSelectedOption(index)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>

                    <button onClick={handleVote}>Cast Vote</button>
                </div>
            )}
        </div>
    );
};

export default Governance;
