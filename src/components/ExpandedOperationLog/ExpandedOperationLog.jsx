import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ExpandedOperationLog.module.css';

export default function ExpandedOperationLog({ imageAddress, descImage, name, iconInput, valueInput, iconTime, valueTime }) {
    let imagem = undefined
    if (imageAddress !== undefined) {
        imagem = <img src={imageAddress} alt={descImage} className={styles.image}/>
    }

    return (
        <div className={styles.ExpandedOperationLog}>
            <div className={styles.group}>
                {imagem}
                <span className={styles.name}>{name}</span>
            </div>
            <div className={styles.group}>
                <FontAwesomeIcon icon={iconInput} className={styles.icon} />
                <span>{valueInput}</span>
            </div>
            <div className={styles.group}>
                <FontAwesomeIcon icon={iconTime} className={styles.icon} />
                <span>{valueTime}</span>
            </div>
        </div>
    );
}
