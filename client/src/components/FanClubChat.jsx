import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const FanClubChat = ({ artistAddress }) => {
    const { connected, account } = useWallet();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Fetch initial messages from the backend
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/fanclubs/${artistAddress}/messages`);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();

        // Set up real-time updates (e.g., WebSockets, polling)
        // ... (Implementation depends on your backend/chat service)
    }, [artistAddress]);

    useEffect(() => {
        // Auto-scroll to the bottom when new messages arrive
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!connected || !account) {
            alert('Please connect your wallet to join the chat.');
            return;
        }

        try {
            const response = await fetch(`/api/fanclubs/${artistAddress}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: account.address,
                    content: newMessage
                })
            });

            if (response.ok) {
                setNewMessage('');
                // Fetch updated messages (or update via real-time updates)
            } else {
                console.error('Error sending message:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="fan-club-chat">
            <div className="chat-messages" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === account?.address ? 'sent' : 'received'}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default FanClubChat;
