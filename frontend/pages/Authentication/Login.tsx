// src/pages/authentication/Login.tsx

import React, { useState } from 'react';
import './Login.scss';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isWeb3Login, setIsWeb3Login] = useState<boolean>(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement the login logic here (e.g., API call to authenticate the user)
        console.log('Logging in with email and password:', email, password);
    };

    const handleWeb3Login = () => {
        // Implement Web3 wallet login logic here (e.g., MetaMask)
        console.log('Logging in with Web3 Wallet');
        setIsWeb3Login(true);
    };

    return (
        <div className="login">
            <h2>Login</h2>

            {!isWeb3Login && (
                <form onSubmit={handleLogin} className="login__form">
                    <div className="login__form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div className="login__form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login__button">Login</button>
                </form>
            )}

            <div className="login__divider">
                <span>or</span>
            </div>

            <button onClick={handleWeb3Login} className="login__web3-button">
                Login with Web3 Wallet
            </button>
        </div>
    );
};

export default Login;
