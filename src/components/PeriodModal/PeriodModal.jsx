import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "./calendar.css"
import styles from "./periodModal.module.css"
import {useEffect, useState} from "react";
import {dateToString, ESTADOS_MODAL} from "./ModalDefinitions";
import Button from "../Button/Button";


export default function PeriodModal(
    { estado=ESTADOS_MODAL.FECHADA, controleEstado, valor, controleValor}){

    const [classes, setClasses] = useState(ESTADOS_MODAL.FECHADA.estilo)
    const [texto, setTexto] = useState(ESTADOS_MODAL.FECHADA.texto)
    const [primeiroDia, setPrimeiroDia] = useState(null)
    useEffect(() => {
        if(!Object.values(ESTADOS_MODAL).includes(estado)) {
            throw new Error(`Estado "${estado}" inválido para a modal de calendário.`)
            console.log(estado)
        }
        setClasses(estado.estilo)
        setTexto(estado.texto)
        setPrimeiroDia(null)
    }, [estado]);


    function selecionarMes(d){
        controleValor(d)
        fechar()
    }
    function selecionarDia(d){
        if (primeiroDia === null){
            setTexto("Para um período iniciado em " + dateToString(d) + ", selecione a data de fim")
            setPrimeiroDia(d)
        }
        else {
            setPrimeiroDia(null)
            // TODO - Enviar ambas as datas
            controleValor(d)
            fechar()
        }
    }

    function fechar(){controleEstado(ESTADOS_MODAL.FECHADA)}

    return (
        <div className={classes}>
            <div className={styles.modal}>
                <p>{texto}</p>
                <FontAwesomeIcon icon={"x"} className={styles.fechar} onClick={() => fechar()}/>

                {(estado !== ESTADOS_MODAL.SELECAO) &&
                    <FontAwesomeIcon
                        icon={"arrow-left-long"} className={styles.voltar}
                        onClick={() => controleEstado(ESTADOS_MODAL.SELECAO)}
                    />
                }

                {(estado === ESTADOS_MODAL.SELECAO) &&
                    <div className={styles.selecaoMetodo}>
                        <p>
                            Você pode visualizar os dados em um <u>mês inteiro</u>, ou em um <u>período entre duas datas
                            </u> escolhidas por você.
                        </p>
                        <span>
                            <Button insideText={"Mês"} onClick={()=>controleEstado(ESTADOS_MODAL.MENSAL)}/>
                            <Button insideText={"Período de Datas"} onClick={()=>controleEstado(ESTADOS_MODAL.DIARIO)}/>
                        </span>
                    </div>
                }
                {(estado === ESTADOS_MODAL.MENSAL) &&
                    <Calendar
                        minDetail={"year"} view={"year"} maxDate={new Date()}
                        value={valor} onClickMonth={selecionarMes}
                    />
                }
                {(estado === ESTADOS_MODAL.DIARIO) &&
                    <Calendar
                        minDetail={"month"} view={"month"} minDate={primeiroDia} maxDate={new Date()}
                        value={valor} onClickDay={selecionarDia}
                    />
                }
            </div>
        </div>
    )
}