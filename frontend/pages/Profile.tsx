// src/pages/Profile.tsx

import React, { useState } from 'react';
import './Profile.scss';

const Profile: React.FC = () => {
    // Sample user data
    const [username, setUsername] = useState<string>('User123');
    const [email, setEmail] = useState<string>('user@example.com');
    const [profilePicture, setProfilePicture] = useState<string>('/images/default-profile.png');

    // State for editing profile
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>(username);
    const [newEmail, setNewEmail] = useState<string>(email);
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        setUsername(newUsername);
        setEmail(newEmail);
        if (newProfilePicture) {
            setProfilePicture(URL.createObjectURL(newProfilePicture));
        }
        setIsEditing(false);
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewProfilePicture(e.target.files[0]);
        }
    };

    return (
        <div className="profile">
            <h2>Profile</h2>
            <div className="profile__content">
                <div className="profile__picture">
                    <img src={profilePicture} alt="Profile" />
                    {isEditing && (
                        <input type="file" onChange={handleProfilePictureChange} />
                    )}
                </div>
                <div className="profile__info">
                    {isEditing ? (
                        <>
                            <div className="profile__form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </div>
                            <div className="profile__form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </div>
                            <button onClick={handleSaveProfile} className="profile__save-button">
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>{username}</h3>
                            <p>{email}</p>
                            <button onClick={handleEditProfile} className="profile__edit-button">
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
