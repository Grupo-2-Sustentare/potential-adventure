import React, {useCallback, useEffect, useState} from "react";
import Navbar from "../../components/SideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardColaboradores.module.css';
import BarChart from "../../components/BarChart/BarChart"
import ExpandedOperationLog from "../../components/ExpandedOperationLog/ExpandedOperationLog"
import CheckableList from "../../components/CheckableList/CheckableList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    carregarColaboradores,
    carregarGrafico,
    carregarLogs
} from "./DashColaboradoresFormatter";
import {useNavigate} from "react-router-dom";
import PeriodModal from "../../components/PeriodModal/PeriodModal";

const DashboardColaboradores = () => {
    // == Constantes
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const FORMAT_DATA_MES  = Intl.DateTimeFormat("pt-BR", {month: "long"})
    const [periodoDados, setPeriodoDados] = useState("Carregando...")
    const [tempoReal, setTempoReal] = useState(false)

    // === Filtros
    let [colaboradores, setColaboradores] = useState([])

    // === Modal de período
    const [modalAberta, setModalAberta] = useState(false)
    const [dataAtual, setDataAtual] = useState(new Date())

    // === Logs
    const [logsOperacao, setLogsOperacao] = useState([])

    // === Dados dos gráficos
    // Interações por colaboradores
    const [interacoesPorColab, setInteracoesPorColab] = useState(null)
    const [colsInteracoes, setColsInteracoes] = useState([])
    const TITULO_INTERACOES_POR_COLAB = "Ações de cada colaborador"

    // === Mét-odo que puxa do back
    async function carregarDados(){
        let colaboradores = await carregarColaboradores()
        setColaboradores(colaboradores)

        let logs = await carregarLogs()
        setLogsOperacao(logs)

        let interacoesPorColab = await carregarGrafico()
        setInteracoesPorColab(interacoesPorColab.valores)
        setColsInteracoes(interacoesPorColab.colunas)
    }

    function atualizarFiltros(valor, nome_filtro) {
        switch (nome_filtro){
            case "mês":
                setDataAtual(valor)
                setPeriodoDados(`${FORMAT_DATA_MES.format(valor)} de ${valor.getFullYear()}`)

                let agora = new Date()
                if ((agora.getFullYear() === valor.getFullYear()) &&
                    (agora.getMonth() === valor.getMonth())){
                    setTempoReal(true)
                } else{
                    setTempoReal(false)
                }

                salvarFiltroPeriodo(valor)
                break
            case "colaboradores":
                sessionStorage.setItem("filtroColaboradores",JSON.stringify(valor))
                break
        }
        atualizarDashboard().catch(console.error)
    }

    function validarSessao(){
        let sessao = sessionStorage.getItem("usuario")
        if (sessao === null) navigate("/")
    }

    // Mét-odo de formatação específica do filtro de período.
    function salvarFiltroPeriodo(data){
        // Pegando a data atual + 1 mês, dia 0 (último dia do mês atual)
        let fimPeriodo = new Date(data.getFullYear(), data.getMonth()+1, 0)

        function formatarData(data){
            let ano = data.getFullYear()
            let mes = String(data.getMonth()+1).padStart(2,"0")
            let dia = String(data.getDate()).padStart(2,"0")
            return `${ano}-${mes}-${dia}`
        }

        // Mandando filtro de período como esperado pelo back.
        sessionStorage.setItem(
            "filtroMes", JSON.stringify({"dataInicio": formatarData(data), "dataFim": formatarData(fimPeriodo)})
        )
    }

    // ===  Mét-odo de atualização progressiva
    let atualizando = false
    const [lastUpdateText, setUpdateText] = useState("")
    const [loadingClass, setLoadingClass] = useState(null)
    const atualizarDashboard = useCallback(async () =>{
        // Evita atualizar de novo se já estiver no meio de uma atualização.
        if(atualizando){ return }
        validarSessao()

        /* Realiza animação do ícone e atualiza o texto do hoŕario da última atualização. */
        setUpdateText("atualizando...")
        setLoadingClass(styles.loading)
        atualizando = true

        carregarDados().then(()=>{
            // Texto da última atualização
            let agora =  new Date()
            let horas = agora.getHours().toString().padStart(2, "0")
            let minutos = agora.getMinutes().toString().padStart(2, "0")
            let horarioFormat = `${horas}:${minutos}`

            setUpdateText(`atualizado pela última vez às ${horarioFormat}`)
            setLoadingClass(null)
            atualizando = false
        })

    }, [])
    useEffect( () => {
        atualizarDashboard().catch(console.error)

        // Limpando os session storages, preservando a de usuário.
        let sessUsuario = sessionStorage.getItem("usuario")
        sessionStorage.clear()
        sessionStorage.setItem("usuario", sessUsuario)

        let agora = new Date()
        setPeriodoDados(`${FORMAT_DATA_MES.format(agora)} de ${agora.getFullYear()}`)
        setTempoReal(true)
        salvarFiltroPeriodo(new Date(agora.getFullYear(), agora.getMonth(), 1))

        setInterval(atualizarDashboard, 30000) /*Executar à cada 30 seg*/
    }, []); /*Executar 1 vez, no carregamento*/

    return (
        <>
            <PeriodModal
                abertura={modalAberta} controleAbertura={setModalAberta}
                valor={dataAtual} controleValor={(v)=>atualizarFiltros(v,"mês" )}
            />
            <Navbar iconHome={"house"} iconEmployees={"users"} exit={"arrow-right-from-bracket"} />
            <div className={styles.group}>
                <div className={styles.Global}>
                    <div className={styles.NavTop}>
                        <span className={styles.titulo}>Painel dos colaboradores</span>
                        <div className={styles.filters}>
                            <CheckableList
                                getOpcoes={(v) => atualizarFiltros(v, "colaboradores")} textoBase={"Nome"}
                                opcoes={colaboradores}
                            />
                            <Button insideText={"Alterar período"} onClick={()=>setModalAberta(true)}/>
                        </div>
                        <div onClick={() => atualizarDashboard()} className={styles.updateInfo + " " + loadingClass}>
                            <h3>
                                {tempoReal ? "Dados em tempo real" : "Dados históricos"}
                                {" - " + periodoDados}
                            </h3>
                            {<p></p>}
                            <span>
                            <FontAwesomeIcon icon={"clock-rotate-left"} className={styles.staticIcon}/>
                            <FontAwesomeIcon icon={"rotate"} className={styles.loadingIcon}/>
                            <p>{lastUpdateText}</p>
                        </span>
                        </div>
                    </div>
                    <div className={styles.charts}>
                        <div className={styles.interacoes}>
                            {
                                logsOperacao.length === 0 &&
                                <div className={styles.infoSemDados}>
                                    Sem dados.<br/>Verifique os filtros aplicados e tente novamente
                                </div>
                            }
                            {logsOperacao.map((l,i) => {
                                return <ExpandedOperationLog
                                        key={i}
                                        imageAddress={l.imagem}
                                        name={l.nome}
                                        valueInput={`${l.interacao} - ${l.descricao}`}
                                        valueTime={l.periodo}
                                        iconInput="circle-info" descImage="Imagem do usuário" iconTime="clock-rotate-left"
                                    />
                            })}
                        </div>
                        <BarChart
                            labels={colsInteracoes} datasets={interacoesPorColab} title={TITULO_INTERACOES_POR_COLAB}
                            width="100%" height="220px" backgroundColor="#f0f0f0" margin="auto" alignItems="center"
                            yLabel={"Interações"} xLabel={"Colaborador"}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}

export default DashboardColaboradores;
