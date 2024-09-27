import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideMenu.module.css';

export default function RefactoredSideMenu({ iconHome, iconEmployees, exit }) {
  return (
    <div className={styles.SideMenu}>
      <div className={styles.group}>
        <a href={"/DashboardGeral"}>
          <FontAwesomeIcon icon={iconHome} className={styles.icon} />
        </a>
        <a href={"/DashboardColaboradores"}>
          <FontAwesomeIcon icon={iconEmployees} className={styles.icon} />
        </a>
      </div>
      <a href="/login">
        <FontAwesomeIcon icon={exit} className={styles.icon} />
      </a>
    </div>
  );
}

