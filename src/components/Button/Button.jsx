import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./button.module.css";

export default function Button({ insideText, onClick, icon}) {
    return (
        <button onClick={onClick} className={styles.button}>
            {insideText}
            <FontAwesomeIcon icon={icon} className={styles.icon} /> 
        </button>
    );
}