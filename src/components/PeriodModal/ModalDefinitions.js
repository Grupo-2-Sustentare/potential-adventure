import styles from "./periodModal.module.css";

const ESTADOS_MODAL = Object.freeze({
    FECHADA: {
        "estilo": styles.container, "texto": ""
    },
    SELECAO: {
        "estilo": `${styles.container} ${styles.aberto}`, "texto": "Tipo de filtro por data"
    },
    MENSAL: {
        "estilo": `${styles.container} ${styles.aberto}`,
        "texto": "Selecione um mês para visualizar os dados naquele momento"
    },
    DIARIO: {
        "estilo": `${styles.container} ${styles.aberto}`,
        "texto": "Selecione o dia de início de período"
    }
})

function dateToString(data){
    let dia = data.getDate().toString().padStart(2, '0')
    let mes = data.getMonth().toString().padStart(2, '0')
    let ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
}

export {ESTADOS_MODAL, dateToString}