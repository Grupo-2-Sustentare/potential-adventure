import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideMenu.module.css';
import {useNavigate} from "react-router-dom";

export default function SideMenu({ iconHome, iconEmployees, exit }) {

  const navigate = useNavigate()
  function deslogar(){
    sessionStorage.clear()
    navigate("/")
  }

  return (
      <>
      <div className={styles.filler}></div>
        <div className={styles.SideMenu}>
          <div className={styles.group}>
            <a href={"/DashboardGeral"}>
              <FontAwesomeIcon icon={iconHome} className={styles.icon} />
            </a>
            <a href={"/DashboardColaboradores"}>
              <FontAwesomeIcon icon={iconEmployees} className={styles.icon} />
            </a>
          </div>
          <a onClick={()=>deslogar()}>
            <FontAwesomeIcon icon={exit} className={styles.icon} />
          </a>
        </div>
      </>
  );
}

