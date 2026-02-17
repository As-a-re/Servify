import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Navigation.module.css';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/health', label: 'Health', icon: '💚' },
  { path: '/emergency', label: 'Emergency', icon: '🚨' },
  { path: '/messages', label: 'Messages', icon: '💬' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${styles.navItem} ${
            location.pathname === item.path ? styles.active : ''
          }`}
          title={item.label}
        >
          <span className={styles.navIcon}>{item.icon}</span>
          <span className={styles.navLabel}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
