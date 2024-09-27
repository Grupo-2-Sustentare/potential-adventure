import stylesKpi from './kpi.module.css';

function CreateKpi({
  onClick = null,
  name = "Nome do KPI",
  value = "215",
  unit = "",
  status = "medio",
  icon = null,
  optionalDescrition = ""
}) {
  return (
    <div className={`${stylesKpi.kpi} ${stylesKpi[status]}`} onClick={onClick}>
      <div className={stylesKpi.kpiContainer}>
        <div className={stylesKpi.kpiContainerDiv}>
          {icon && <img src={icon} alt="" />}
        </div>
        <div className={stylesKpi.kpiValue}>
          {value && <span id={stylesKpi.spanKpiValueH1}>{value}</span>}
          {unit && <span id={stylesKpi.spanKpiValueH3}>{unit}</span>}
        </div>
        <div className={stylesKpi.kpiContainerDiv}></div>
      </div>
        <div className={stylesKpi.kpiDescription}>
          {name && <span id={stylesKpi.spanP}>{name}</span>}
          {optionalDescrition && <span id={stylesKpi.spanBold}>{optionalDescrition}</span>}
        </div>
    </div>
  );
}

export default CreateKpi;