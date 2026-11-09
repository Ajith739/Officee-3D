import { useState } from 'react';

export default function Header() {
  const [activeItem, setActiveItem] = useState('HOME');
  const navItems = ['HOME', 'ABOUT', 'SERVICES', 'WORK', 'CONTACT'];

  return (
    <header className="hero-header">
      {/* Brand Logo & Name */}
      <a href="#home" className="brand-logo-link" onClick={(e) => e.preventDefault()}>
        <div className="brand-symbol">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Diamond */}
            <path
              d="M20 2L38 20L20 38L2 20L20 2Z"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Inner Core */}
            <rect
              x="15"
              y="15"
              width="10"
              height="10"
              transform="rotate(45 20 20)"
              fill="#d4af37"
            />
            <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
            <defs>
              <linearGradient id="goldGradient" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fcedc5" />
                <stop offset="0.5" stopColor="#d4af37" />
                <stop offset="1" stopColor="#8c6d1d" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="brand-text-group">
          <span className="brand-name">GRACEWELL</span>
          <span className="brand-subtitle">TECHNOLOGIES</span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="hero-nav">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`nav-link ${activeItem === item ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveItem(item);
            }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
