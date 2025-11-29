import React, { useState, useEffect } from 'react'
import "./header.css"
import NetflixLogo from "../../assets/images/NetflixLogo.jpg"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  // Track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header-outer-container ${isScrolled ? "header-black" : ""}`}>
      <div className="header-container">
        <div className='header-left'>
          <ul>
            <li><img src={NetflixLogo} alt="Netflix Logo" width="100" /></li>
            <li>Home</li>
            <li>Series</li>
            <li>Films</li>
            <li>Games</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Language</li>
          </ul>
        </div>

        <div className='header-right'>
          <ul>
            <li><SearchIcon/> </li>
            <li><NotificationsNoneIcon/> </li>
            <li><AccountBoxIcon/></li>
            <li><ArrowDropDownIcon/></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
