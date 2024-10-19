import styles from "./periodModal.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import Calendar from "react-calendar";

export default function PeriodModal({abrir=false, setAbrir}){
    let classesContainer = styles.container
    if (abrir) classesContainer += ` ${styles.aberto}`

    return (<div className={classesContainer}>
        <div className={styles.modal}>
            <FontAwesomeIcon
                icon={"x"} className={styles.fechar}
                onClick={()=>setAbrir(false)}
            />
            <Calendar/>
        </div>
    </div>)
}