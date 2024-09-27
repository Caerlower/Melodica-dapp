// src/components/Footer.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__section">
                    <h4>About Melodica</h4>
                    <p>Melodica is a revolutionary SocialFi platform redefining the music industry through decentralized music creation, distribution, and engagement.</p>
                </div>
                <div className="footer__section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/explore">Explore</a></li>
                        <li><a href="/create-nft">Create NFT</a></li>
                        <li><a href="/marketplace">Marketplace</a></li>
                        <li><a href="/profile">My Profile</a></li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h4>Contact Us</h4>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className="footer__icon" />
                            support@melodica.com
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhoneAlt} className="footer__icon" />
                            +1 234 567 890
                        </li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h4>Follow Us</h4>
                    <div className="footer__socials">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} className="footer__social-icon" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="footer__social-icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="footer__social-icon" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} className="footer__social-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; 2024 Melodica. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
