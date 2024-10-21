import React from 'react';
import Link from 'next/link';
import styles from './Layout.module.css'; // Assuming you have a CSS module for styling

const Layout = ({ children }) => (
  <div className={styles.layoutContainer}>
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navLink}>Home</Link>
      <Link href="/tasks/new" className={styles.navLink}>Create Task</Link>
      <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
    </nav>
    <main className={styles.mainContent}>{children}</main>
  </div>
);

export default Layout;
