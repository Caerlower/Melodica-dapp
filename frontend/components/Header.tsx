import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMusic, faHome, faSearch, faPlusCircle, faShoppingCart, 
    faChartPie, faBroadcastTower, faUserShield, faHeadphones, 
    faUserCircle, faCrown 
} from '@fortawesome/free-solid-svg-icons';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import './Header.scss';

const Header: React.FC = () => {
    const { } = useWallet();

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <FontAwesomeIcon icon={faMusic} className="header__logo-icon" />
                    <span className="header__logo-text">Melodica</span>
                </Link>
            </div>
            <nav className="header__nav">
                <ul>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHome} className="header__nav-icon" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/explore">
                            <FontAwesomeIcon icon={faSearch} className="header__nav-icon" />
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Link to="/create-nft">
                            <FontAwesomeIcon icon={faPlusCircle} className="header__nav-icon" />
                            Create NFT
                        </Link>
                    </li>
                    <li>
                        <Link to="/marketplace">
                            <FontAwesomeIcon icon={faShoppingCart} className="header__nav-icon" />
                            Marketplace
                        </Link>
                    </li>
                    <li>
                        <Link to="/fractional-ownership">
                            <FontAwesomeIcon icon={faChartPie} className="header__nav-icon" />
                            Fractional Ownership
                        </Link>
                    </li>
                    <li>
                        <Link to="/fan-club">
                            <FontAwesomeIcon icon={faCrown} className="header__nav-icon" />
                            Fan Club
                        </Link>
                    </li>
                    {/* More dropdown */}
                    <li className="moredrop">
                        <details>
                            {/* summary is where "More" is displayed */}
                            <summary>
                                <span>More</span>
                            </summary>
                            <ul className="dropchange">
                                <li>
                                    <Link to="/live-streams">
                                        <FontAwesomeIcon icon={faBroadcastTower} className="header__nav-icon" />
                                        Live Streams
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/governance">
                                        <FontAwesomeIcon icon={faUserShield} className="header__nav-icon" />
                                        Governance
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/artist-dashboard">
                                        <FontAwesomeIcon icon={faHeadphones} className="header__nav-icon" />
                                        Artist Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/fan-dashboard">
                                        <FontAwesomeIcon icon={faUserCircle} className="header__nav-icon" />
                                        Fan Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>

            <div className="input-group wallet-connect">
                {/* WalletConnector component */}
                <WalletConnector />
            </div>
        </header>
    );
};

export default Header;
