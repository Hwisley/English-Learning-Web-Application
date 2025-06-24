import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => {
    return router.pathname === path ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          영어 학습 앱
        </Link>

        {/* 모바일 메뉴 토글 버튼 */}
        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="메뉴 토글"
        >
          <span className={styles.menuIcon}></span>
        </button>

        {/* 네비게이션 메뉴 */}
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={`${styles.navLink} ${isActive('/')}`}>
                홈
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/videos" className={`${styles.navLink} ${isActive('/videos')}`}>
                학습 비디오
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/Study" className={`${styles.navLink} ${isActive('/Study')}`}>
                학습하기
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/Main_Page" className={`${styles.navLink} ${isActive('/Main_Page')}`}>
                메인 페이지
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation; 