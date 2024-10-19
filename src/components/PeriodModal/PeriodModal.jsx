import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "./calendar.css"
import styles from "./periodModal.module.css"

export default function PeriodModal(
    {
        abertura=false, controleAbertura,
        controleValor, dataMin=null,
    }){
    let classesContainer = styles.container
    if (abertura) classesContainer += ` ${styles.aberto}`

    function atualizarData(d){
        let mes = d.toLocaleString('pt-BR', {"month": "long"})
        controleValor(mes)
        fechar()
    }

    function fechar(){controleAbertura(false)}

    return (
        <div className={classesContainer}>
            <div className={styles.modal}>
                <FontAwesomeIcon icon={"x"} className={styles.fechar} onClick={() => fechar()}/>
                <Calendar
                    minDetail={"year"} view={"year"} minDate={dataMin} maxDate={new Date()} onClickMonth={atualizarData}
                />
            </div>
        </div>
    )
}