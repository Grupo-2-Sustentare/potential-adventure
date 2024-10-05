import styles from './kpi.module.css';
import {EnumStatusKpis} from "./EnumStatusKpis";

const TIPOS_KPI = ["simples", "unidade", "textual", "monetária"]

function Kpi({
    type = "simples",
    name = "Nome do KPI",
    value = 0.0,
    auxiliaryTexts = ""||[""],
    status = EnumStatusKpis.NEUTRAL,
  }) {
  if (!TIPOS_KPI.includes(type)){
    throw new Error("Tipo de KPI inválido.")
  }
  if (!Object.values(EnumStatusKpis).includes(status)){
    throw new Error("Status de KPI inválido.")
  }

  let classeStatus = styles.loading
  let classeTipo = styles.desconsiderar
  let auxiliares = {
    "anterior": {"valor": ""},
    "posterior": {"valor": ""}
  }

  switch (status){
      case EnumStatusKpis.NEUTRAL:
          classeStatus = styles.loading
          break
      case EnumStatusKpis.BAD:
          classeStatus = styles.bad
          break
      case EnumStatusKpis.MEDIUM:
          classeStatus = styles.neutral
          break
      case EnumStatusKpis.GOOD:
          classeStatus = styles.good
          break
  }

  if (value === null){
    type = "sem dados"
  }

  switch (type){
      case "sem dados":
          classeTipo = styles.semDados
          value = "Sem dados"
          break
      case "unidade":
          classeTipo = styles.unidadeMedida
          auxiliares.posterior.valor = auxiliaryTexts
          break
      case "textual":
          classeTipo = styles.textual
          auxiliares.anterior.valor = auxiliaryTexts[0]
          auxiliares.posterior.valor = auxiliaryTexts[1]
          break
      case "monetária":
          classeTipo = styles.monetaria
          auxiliares.anterior.valor = "R$"
          value = `${value},`
          auxiliares.posterior.valor = "00"
  }


  return (
    <div className={`${styles.kpi} ${classeStatus}`}>
          <div className={styles.infoKpi + " " + classeTipo}>
            <span className={styles.textoAuxiliar + " " + auxiliares.anterior.classe}>
              {auxiliares.anterior.valor}
            </span>
            <span className={styles.valorKpi}>{value}</span>
            <span className={styles.textoAuxiliar + " " +auxiliares.posterior.classe}>
              {auxiliares.posterior.valor}
            </span>
          </div>
        <span className={styles.nomeKpi}>{name}</span>
    </div>
  );
}

export default Kpi;