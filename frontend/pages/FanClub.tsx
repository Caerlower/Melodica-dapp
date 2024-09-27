// src/pages/FanClub.tsx

import React, { useState } from 'react';
import './FanClub.scss';

interface ExclusiveContent {
    id: string;
    title: string;
    description: string;
    date: string;
}

interface Comment {
    id: string;
    user: string;
    text: string;
}

const FanClub: React.FC = () => {
    // Sample data for exclusive content and comments
    const exclusiveContent: ExclusiveContent[] = [
        { id: '1', title: 'Behind the Scenes of Epic Melody', description: 'An exclusive look into the making of the hit track Epic Melody.', date: 'Sept 12, 2024' },
        { id: '2', title: 'Live Q&A with DJ Beats', description: 'Join DJ Beats for a live Q&A session to discuss music production and more.', date: 'Sept 15, 2024' },
    ];

    const [comments, setComments] = useState<Comment[]>([
        { id: '1', user: 'FanUser1', text: 'Loved the behind-the-scenes content! So insightful.' },
        { id: '2', user: 'FanUser2', text: 'Can’t wait for the live Q&A session!' },
    ]);

    const [newComment, setNewComment] = useState<string>('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { id: Date.now().toString(), user: 'CurrentFanUser', text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <div className="fan-club">
            <h2>DJ Beats Fan Club</h2>
            
            <section className="fan-club__exclusive-content">
                <h3>Exclusive Content</h3>
                <ul>
                    {exclusiveContent.map(content => (
                        <li key={content.id} className="fan-club__content-item">
                            <h4>{content.title}</h4>
                            <p>{content.description}</p>
                            <span>{content.date}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="fan-club__comments">
                <h3>Fan Interactions</h3>
                <div className="fan-club__comments-list">
                    {comments.map(comment => (
                        <div key={comment.id} className="fan-club__comment">
                            <strong>{comment.user}:</strong>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
                <div className="fan-club__add-comment">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Post</button>
                </div>
            </section>
        </div>
    );
};

export default FanClub;
