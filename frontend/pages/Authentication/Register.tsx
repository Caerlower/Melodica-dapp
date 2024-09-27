// src/pages/authentication/Register.tsx

import React, { useState } from 'react';
import './Register.scss';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isWeb3Register, setIsWeb3Register] = useState<boolean>(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement the registration logic here (e.g., API call to register the user)
        console.log('Registering with email:', username, email, password);
    };

    const handleWeb3Register = () => {
        // Implement Web3 wallet registration logic here (e.g., MetaMask)
        console.log('Registering with Web3 Wallet');
        setIsWeb3Register(true);
    };

    return (
        <div className="register">
            <h2>Register</h2>

            {!isWeb3Register && (
                <form onSubmit={handleRegister} className="register__form">
                    <div className="register__form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>

                    <div className="register__form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div className="register__form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <button type="submit" className="register__button">Register</button>
                </form>
            )}

            <div className="register__divider">
                <span>or</span>
            </div>

            <button onClick={handleWeb3Register} className="register__web3-button">
                Register with Web3 Wallet
            </button>
        </div>
    );
};

export default Register;
