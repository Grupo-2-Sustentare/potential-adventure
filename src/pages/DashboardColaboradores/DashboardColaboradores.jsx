import React, {useCallback, useEffect, useState} from "react";
import Navbar from "../../components/SideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardColaboradores.module.css';
import ChartBar from "../../components/Chart/ChartBar"
import ExpandedOperationLog from "../../components/ExpandedOperationLog/ExpandedOperationLog"
import CheckableList from "../../components/CheckableList/CheckableList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    carregarColaboradores,
    carregarDataMaisAntigaDados,
    carregarGrafico,
    carregarLogs
} from "./DashColaboradoresFormatter";
import {useNavigate} from "react-router-dom";
import PeriodModal from "../../components/PeriodModal/PeriodModal";

const DashboardColaboradores = () => {
    // == Constantes
    // Gerais
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const SEM_DADOS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const MESES = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'
    ];
    const FORMAT_DATA_MES  = Intl.DateTimeFormat("pt-BR", {month: "long"})
    const [periodoDados, setPeriodoDados] = useState("Carregando...")

    // === Filtros
    // Opções
    let [colaboradores, setColaboradores] = useState([])

    // === Modal de período
    const [modalAberta, setModalAberta] = useState(false)
    const [dataMinDados, setDataMinDados] = useState(null)
    const [dataAtual, setDataAtual] = useState(new Date())

    // === Logs
    const [logsOperacao, setLogsOperacao] = useState([])

    // === Dados dos gráficos
    // Interações por colaboradores
    const [interacoesPorColab, setInteracoesPorColab] = useState([
        {
            label: 'Entradas',
            data: SEM_DADOS,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Cor das barras das entradas
            borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda das barras
            borderWidth: 1,
        },
        {
            label: 'Saídas',
            data: SEM_DADOS,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor das barras das saídas
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras
            borderWidth: 1,
        },
    ])
    const TITULO_INTERACOES_POR_COLAB = "Ações de cada colaborador"
    const [tituloInteracoesPorColab, setTituloInteracoesPorColab] = useState(TITULO_INTERACOES_POR_COLAB)

    // === Mét-odo que puxa do back
    async function carregarDados(){
        // Filtros
        let colaboradores = await carregarColaboradores()
        setColaboradores(colaboradores)

        // == Logs
        let logs = await carregarLogs()
        setLogsOperacao(logs)

        // == Dados de gráficos
        let interacoesPorColab = await carregarGrafico()

        // Entradas e saídas
        setInteracoesPorColab(interacoesPorColab) // Mudanças de dados
        setTituloInteracoesPorColab(
            TITULO_INTERACOES_POR_COLAB +
            (interacoesPorColab === null ? " - sem dados" : "")
        ) // Info de "sem dados" no título

        let dataMaisAntiga = await carregarDataMaisAntigaDados()
        setDataMinDados(dataMaisAntiga)
    }

    function atualizarFiltros(valor, nome_filtro) {
        switch (nome_filtro){
            case "mês":
                setDataAtual(valor)
                localStorage.setItem("filtroMes", valor)
                break
            case "colaboradores":
                localStorage.setItem("filtroColaboradores",valor)
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

        carregarDados().then(()=>{
            let agora =  new Date()
            let horas = agora.getHours().toString().padStart(2, "0")
            let minutos = agora.getMinutes().toString().padStart(2, "0")
            let horarioFormat = `${horas}:${minutos}`

            setPeriodoDados(`${FORMAT_DATA_MES.format(new Date())} de ${agora.getFullYear()}`)
            setUpdateText(`atualizado pela última vez às ${horarioFormat}`)
            setLoadingClass(null)
            atualizando = false
        })

    }, [])
    useEffect( () => {
        atualizarDashboard().catch(console.error)
        setInterval(atualizarDashboard, 30000) /*Executar à cada 30 seg*/
    }, [atualizarDashboard]); /*Executar 1 vez, no carregamento*/

    return (
        <>
            <PeriodModal
                abertura={modalAberta} controleAbertura={setModalAberta}
                valor={dataAtual} controleValor={(v)=>atualizarFiltros(v,"mês" )}
                dataMin={dataMinDados}
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
                            <h3>{periodoDados}</h3>
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
                            {logsOperacao.map((i) => {
                                return <ExpandedOperationLog
                                        key={i.nome}
                                        imageAddress={i.imagem}
                                        name={i.nome}
                                        valueInput={`${i.interacao}: ${i.descricao}`}
                                        valueTime={i.periodo}
                                        iconInput="circle-info" descImage="Imagem do usuário" iconTime="clock-rotate-left"
                                    />
                            })}
                        </div>
                        <ChartBar
                            labels={colaboradores} datasets={interacoesPorColab} title={tituloInteracoesPorColab}
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
