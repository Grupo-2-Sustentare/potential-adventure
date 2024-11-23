import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "./calendar.css"
import styles from "./periodModal.module.css"

export default function PeriodModal(
    {
        abertura=false, controleAbertura,
        valor, controleValor,
        dataMin=null
    }){
    let classesContainer = styles.container
    if (abertura) classesContainer += ` ${styles.aberto}`

    function atualizarData(d){
        controleValor(d)
        fechar()
    }

    function fechar(){controleAbertura(false)}

    return (
        <div className={classesContainer}>
            <div className={styles.modal}>
                <FontAwesomeIcon icon={"x"} className={styles.fechar} onClick={() => fechar()}/>
                <p>Selecione um mês os dados naquele momento</p>
                <Calendar
                    minDetail={"year"} view={"year"} minDate={dataMin} maxDate={new Date()}
                    value={valor} onClickMonth={atualizarData}
                />
            </div>
        </div>
    )
}