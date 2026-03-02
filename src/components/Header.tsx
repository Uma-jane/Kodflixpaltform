import { useState, useEffect } from 'react'
import './Header.css'

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-left">
        <div className="header-logo">KODFLIX</div>
        <nav className="header-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">TV Shows</a>
          <a href="#" className="nav-link">Movies</a>
          <a href="#" className="nav-link">New & Popular</a>
          <a href="#" className="nav-link">My List</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="header-icon search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="header-icon notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="header-profile">
          <div className="profile-avatar">
            <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <div className="dropdown-menu">
            <span className="user-name">{user?.full_name}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
