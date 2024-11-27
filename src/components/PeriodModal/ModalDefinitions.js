import styles from "./periodModal.module.css";

const ESTADOS_MODAL = Object.freeze({
    FECHADA: {
        "estilo": styles.container, "texto": ""
    },
    SELECAO: {
        "estilo": `${styles.container} ${styles.aberto}`, "texto": "MENSAL OU DIARIO"
    },
    MENSAL: {
        "estilo": `${styles.container} ${styles.aberto}`, "texto": "Selecione um mês os dados naquele momento"
    },
    DIARIO: {
        "estilo": `${styles.container} ${styles.aberto}`, "texto": "Diário"
    }
})

export {ESTADOS_MODAL}