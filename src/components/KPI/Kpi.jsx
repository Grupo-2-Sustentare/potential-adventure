import styles from './kpi.module.css';
import {EnumStatusKpis} from "./EnumStatusKpis";

const TIPOS_KPI = ["simples", "unidade", "textual", "monetária"]

function Kpi({
    type = "simples",
    name = "Nome do KPI",
    value = 0,
    auxiliaryTexts = ""||[""],
    status = EnumStatusKpis.LOADING,
  }) {
  if (!TIPOS_KPI.includes(type)){
    throw new Error("Tipo de KPI inválido.")
  }
  if (!Object.values(EnumStatusKpis).includes(status)){
    throw new Error("Status de KPI inválido.")
  }

  let auxiliares = {
    "anterior": {"valor": "", "classe": styles.desconsiderar},
    "posterior": {"valor": "", "classe": styles.desconsiderar}
  }

  switch (type){
    case "unidade":
      auxiliares.posterior.valor = styles.unidadeMedida
      auxiliares.posterior.valor = auxiliaryTexts
  }


  return (
    <div className={styles.kpi}>
      <div>
        <span className={styles.textoAuxiliar + "" + auxiliares.anterior.classe}>
          {auxiliares.anterior.valor}
        </span>
        <span className={styles.valorKpi}>{value}</span>
        <span className={styles.textoAuxiliar + "" +auxiliares.posterior.classe}>
          {auxiliares.posterior.valor}
        </span>
      </div>
    </div>
  );
}

export default Kpi;