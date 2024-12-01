import React, {useCallback, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../../components/SideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardGeral.module.css';
import BarChart from "../../components/BarChart/BarChart"
import Kpi from "../../components/KPI/Kpi";
import CheckableList from "../../components/CheckableList/CheckableList";
import {
    baixarFechamento,
    carregarGraficos,
    carregarKPIs,
    carregarListasChecaveis
} from "./DashGeralFormatter";
import {EnumStatusKpis} from "../../components/KPI/EnumStatusKpis";
import {useNavigate} from "react-router-dom";
import PeriodModal from "../../components/PeriodModal/PeriodModal";
import {
    compareDates,
    dateToIsoString,
    dateToString,
    ESTADOS_MODAL
} from "../../components/PeriodModal/ModalDefinitions";

const Dashboard = () => {
    // == Constantes
    // Gerais
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const FORMAT_DATA_MES  = Intl.DateTimeFormat("pt-BR", {month: "long"})

    // Dados das CheckableList dos filtros
    let [categorias, setCategorias] = useState([])
    let [produtos, setProdutos] = useState([])

    // === Período
    const [periodoDados, setPeriodoDados] = useState(null)
    const [tempoReal, setTempoReal] = useState(false)

    // === Modal
    const [estadoModal, setEstadoModal] = useState(ESTADOS_MODAL.FECHADA)
    const [dataAtual, setDataAtual] = useState(new Date())

    // === Dados dos gráficos
    const TITULO_ENTRADAS_E_SAIDAS = "Entradas e Saídas"
    const [entradasSaidas, setEntradasSaidas] = useState([])
    const [colsEntradasEhSaidas, setColsEntradasEhSaidas] = useState([])

    const TITULO_PERDAS = "Perdas por tipo"
    const [perdas, setPerdas] = useState([])
    const COLS_PERDAS = ["Tipos de perda"]

    const TITULO_COMPRAS = "Compras regulares X Compras não planejadas"
    const [compras, setCompras] = useState([])
    const COLS_COMPRAS = ["Comparação"]

    // == Dados das KPIS
    const [kpiPerdas, setKpiPerdas] = useState({"quantidade": null, "status": EnumStatusKpis.NEUTRAL})
    const [kpiNaoPlanejados, setKpiNaoPlanejados] = useState({"quantidade": null, "status": EnumStatusKpis.NEUTRAL})
    const [kpiValorInvestido, setKpiValorInvestido] = useState({"quantidade": null, "status": EnumStatusKpis.NEUTRAL})

    // === Mét-odo que puxa do back
    async function carregarDados(){
        // Listas checáveis
        let dadosListas = await carregarListasChecaveis()
        setCategorias(dadosListas["categorias"])
        setProdutos(dadosListas["produtos"])

        // == Dados de gráficos
        let dadosGraficos = await carregarGraficos()

        // Entradas e saídas
        setEntradasSaidas(dadosGraficos.entradasEhSaidas.valores)
        setColsEntradasEhSaidas(dadosGraficos.entradasEhSaidas.colunas)

        // Perdas por tipo
        setPerdas(dadosGraficos.perdas)

        // Compras x última hora
        setCompras(dadosGraficos.compras)

        let dadosKpis = await carregarKPIs()
        setKpiPerdas(dadosKpis.perdas)
        setKpiNaoPlanejados(dadosKpis.naoPlanejadas)
        setKpiValorInvestido(dadosKpis.valorInvest)
    }

    function atualizarInformacaoData(inicio, fim){
        if (compareDates(inicio, fim)){
            setPeriodoDados(`${dateToString(fim)}`)
        } else {
            setPeriodoDados(`de ${dateToString(inicio)} de a ${dateToString(fim)}`)
        }

        // Verificando se o mês e ano são os mesmos do atual, para atualizar o texto de "Dados em tempo real".
        let agora = new Date()
        setTempoReal(compareDates(agora, fim))
    }

    function atualizarFiltros(valor, nome_filtro) {
        switch (nome_filtro){
            case "data":
                const inicio = valor.inicio
                const fim = valor.fim
                atualizarInformacaoData(inicio, fim)
                // Salvando a data fim (usada dentro do calendário para marcar a data selecionada atualmente)
                setDataAtual(fim)
                break
            case "categorias":
                sessionStorage.setItem("filtroCategorias", JSON.stringify(valor))
                break
            case "produto":
                sessionStorage.setItem("filtroProdutos", JSON.stringify(valor))
                break
        }
        atualizarDashboard().catch(console.error)
    }

    function validarSessao(){
        let sessao = sessionStorage.getItem("usuario")
        if (sessao === null) navigate("/")
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
        carregarDados().then((d)=>{
            let agora =  new Date()
            let horas = agora.getHours().toString().padStart(2, "0")
            let minutos = agora.getMinutes().toString().padStart(2, "0")
            let horarioFormat = `${horas}:${minutos}`

            setUpdateText(`atualizado pela última vez às ${horarioFormat}`)
            setLoadingClass(null)
            atualizando = false
        })

    }, [])


    /*Executar 1 vez, no carregamento da página*/
    useEffect( () => {
        atualizarDashboard().catch(console.error)

        // Limpando os session storages, preservando a de usuário.
        const sessUsuario = sessionStorage.getItem("usuario")
        sessionStorage.clear()
        sessionStorage.setItem("usuario", sessUsuario)

        // Calculando o agora
        const agora = new Date()
        atualizarInformacaoData(agora, agora)
        const agoraFormat = dateToIsoString(agora)
        sessionStorage.setItem("filtroPeriodo", JSON.stringify({"dataInicio": agoraFormat, "dataFim": agoraFormat}))

        const atualizacao = setInterval(atualizarDashboard, 30000) /*Executar à cada 30 seg*/
        return () => clearInterval(atualizacao)
    }, []);

    return (
        <>
        <Navbar iconHome={"house"} iconEmployees={"users"} exit={"arrow-right-from-bracket"} />
            <PeriodModal
                estado={estadoModal} controleEstado={setEstadoModal}
                valor={dataAtual} controleValor={(v)=>atualizarFiltros(v,"data" )}
            />
        <div className={styles.group}>
            <div className={styles.Global}>
                <div className={styles.NavTop}>
                    <span className={styles.titulo}>Painel de controle geral</span>
                    <div className={styles.buttons}>
                        <CheckableList
                            getOpcoes={(v)=>atualizarFiltros(v,"categorias")} textoBase={"Categorias"}
                            opcoes={categorias}
                        />
                        <CheckableList
                            getOpcoes={(v)=>atualizarFiltros(v,"produto")} textoBase={"Produtos"}
                            opcoes={produtos}
                        />
                        <Button insideText={"Alterar período"} onClick={()=>setEstadoModal(ESTADOS_MODAL.SELECAO)}/>
                    </div>
                </div>
                <div className={styles.Charts}>
                    <BarChart
                        labels={COLS_PERDAS}
                        datasets={perdas}
                        title={TITULO_PERDAS}
                        width="34vw"
                        height="300px"
                        backgroundColor="#f0f0f0"
                        yLabel={"Quantidade de perdas"}
                    />
                    <BarChart
                        labels={COLS_COMPRAS}
                        datasets={compras}
                        title={TITULO_COMPRAS}
                        width="34vw"
                        height="300px"
                        backgroundColor="#f0f0f0"
                        margin="auto"
                        alignItems="center"
                    />
                    <BarChart
                        labels={colsEntradasEhSaidas}
                        datasets={entradasSaidas}
                        title={TITULO_ENTRADAS_E_SAIDAS}
                        width="100vw"
                        height="220px"
                        backgroundColor="#f0f0f0"
                        yLabel={"Valor em reais (R$)"}
                    />
                </div>
            </div>
            <div className={styles.SideMenu}>
                <div onClick={()=> atualizarDashboard()} className={styles.updateInfo + " " + loadingClass}>
                    <h3>{tempoReal ? "Dados em tempo real" : "Dados históricos"}</h3>
                    <h3>{periodoDados}</h3>
                    <span>
                        <FontAwesomeIcon icon={"clock-rotate-left"} className={styles.staticIcon}/>
                        <FontAwesomeIcon icon={"rotate"} className={styles.loadingIcon}/>
                        <p>{lastUpdateText}</p>
                    </span>
                </div>
                <div className={styles.DivKpis}>
                    <h3>Informes desse período</h3>
                    <div>
                        <Kpi type={"simples"} name={"Perdas"} value={kpiPerdas.quantidade} status={kpiPerdas.status}/>
                        <Kpi
                            type={"simples"} name={"Quantidade de compras não planejadas"}
                            value={kpiNaoPlanejados.quantidade} status={kpiNaoPlanejados.status}
                        />
                        <Kpi
                            type={"monetária"} name={"Investimento total em produtos"} value={kpiValorInvestido.quantidade}
                            status={kpiValorInvestido.status}
                        />
                    </div>
                </div>
                <div className={styles.fechamento}>
                    <h3>Relatório de fechamento do mês</h3>
                    <Button insideText={"Baixar relatório"} onClick={()=>baixarFechamento()}/>
                </div>
            </div>
        </div>
            </>
    );
}

export default Dashboard;