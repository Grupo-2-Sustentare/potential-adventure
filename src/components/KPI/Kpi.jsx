import styles from './kpi.module.css';
import {EnumStatusKpis} from "./EnumStatusKpis";

const TIPOS_KPI = ["simples", "unidade", "textual", "monetária"]

function Kpi({
    type = "simples",
    name = "Nome do KPI",
    value = 0.0,
    auxiliaryTexts = ""||[""],
    status = EnumStatusKpis.LOADING,
  }) {
  if (!TIPOS_KPI.includes(type)){
    throw new Error("Tipo de KPI inválido.")
  }
  if (!Object.values(EnumStatusKpis).includes(status)){
    throw new Error("Status de KPI inválido.")
  }

  let classeTipo = styles.desconsiderar
  let auxiliares = {
    "anterior": {"valor": ""},
    "posterior": {"valor": ""}
  }

  switch (type){
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
    <div className={styles.kpi}>
      <div className={styles.infoKpi + " " + classeTipo}>
        <span className={styles.textoAuxiliar + " " + auxiliares.anterior.classe}>
          {auxiliares.anterior.valor}
        </span>
        <span className={styles.valorKpi}>{value}</span>
        <span className={styles.textoAuxiliar + " " +auxiliares.posterior.classe}>
          {auxiliares.posterior.valor}
        </span>
      </div>
    </div>
  );
}

export default Kpi;