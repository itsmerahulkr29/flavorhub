import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Header component with navigation, branding, and theme toggle
 * Shows back button when on recipe detail page
 */
const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { toggleTheme, isDark } = useTheme();

    return (
        <header className="header">
            <div className="header-content">
                <NavLink to="/" className="logo">
                    <span className="logo-icon">🍳</span>
                    <span className="logo-text">Flavor<span className="logo-accent">Hub</span></span>
                </NavLink>

                <div className="header-actions">
                    {!isHomePage && (
                        <NavLink to="/" className="back-btn">
                            <span className="back-arrow">←</span>
                            Back to Recipes
                        </NavLink>
                    )}

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    >
                        <span className="theme-icon">
                            {isDark ? '☀️' : '🌙'}
                        </span>
                        <span className="theme-text">
                            {isDark ? 'Light' : 'Dark'}
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
