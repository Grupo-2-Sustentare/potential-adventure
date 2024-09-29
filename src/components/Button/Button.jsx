import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./button.module.css";

export default function Button({ insideText, onClick, icon}) {
    let icone = null
    if (icon !== undefined) {
        icone = <FontAwesomeIcon icon={icon} />
    }

    return (
        <button onClick={onClick} className={styles.button}>{insideText}{icone}</button>
    );
}