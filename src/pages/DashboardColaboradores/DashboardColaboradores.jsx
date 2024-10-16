import React, {useCallback, useEffect, useState} from "react";
import Navbar from "../../components/RefactoredSideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardColaboradores.module.css';
import ChartBar from "../../components/Chart/ChartBar"
import ExpandedOperationLog from "../../components/ExpandedOperationLog/ExpandedOperationLog"
import CheckableList from "../../components/CheckableList/CheckableList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {carregarColaboradores, carregarGrafico, carregarLogs} from "./DashColaboradoresFormatter";

const DashboardColaboradores = () => {
    // == Constantes
    // Gerais
    const SEM_DADOS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const MESES = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'
    ];

    // === Filtro
    // Opções
    let [colaboradores, setColaboradores] = useState([])
    // Valores
    const [filtroColaboradores, setFiltroColaboradores] = useState([])

    // === Logs
    const [logsOperacao, setLogsOperacao] = useState([])

    // === Dados dos gráficos
    // Interações por colaboradores
    const [interacoesPorColab, setInteracoesPorColab] = useState([
        {
            label: 'Entradas',
            data: [12, 5, 8, 12, 30, 25, 40, 8, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Cor das barras das entradas
            borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda das barras
            borderWidth: 1,
        },
        {
            label: 'Saídas',
            data: [8, 7, 5, 10, 20, 15, 35, 12, 4],
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor das barras das saídas
            borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras
            borderWidth: 1,
        },
    ])
    const TITULO_INTERACOES_POR_COLAB = "Ações de cada colaborador"
    const [tituloInteracoesPorColab, setTituloInteracoesPorColab] = useState(TITULO_INTERACOES_POR_COLAB)

    // === Mét-odo que puxa do back
    async function carregarDados(){
        // Listas checáveis
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
    }

    function atualizarFiltros(valoresKpi, nome_filtro) {
        switch (nome_filtro){
            case "colaboradores":
                setFiltroColaboradores(valoresKpi)
                localStorage.setItem("filtroColaboradores", JSON.stringify(filtroColaboradores))
                break
        }
        console.log(valoresKpi)
        atualizarDashboard().catch(console.error)
    }

    // ===  Mét-odo de atualização progressiva
    let atualizando = false
    const [lastUpdateText, setUpdateText] = useState("")
    const [loadingClass, setLoadingClass] = useState(null)
    const atualizarDashboard = useCallback(async () =>{
        // Evita atualizar de novo se já estiver no meio de uma atualização.
        if(atualizando){ return }

        /* Realiza animação do ícone e atualiza o texto do hoŕario da última atualização. */
        setUpdateText("atualizando...")
        setLoadingClass(styles.loading)
        atualizando = true
        carregarDados().then(()=>{
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
        setInterval(atualizarDashboard, 30000) /*Executar à cada 30 seg*/
    }, [atualizarDashboard]); /*Executar 1 vez, no carregamento*/

    return (
        <>
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
                        <Button insideText={"Alterar período"}/>
                    </div>
                    <div onClick={() => atualizarDashboard()} className={styles.updateInfo + " " + loadingClass}>
                        <h3>Dados em tempo real</h3>
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
                        {logsOperacao.map((i) => {
                            return <ExpandedOperationLog
                                    imageAddress={i.imagem}
                                    name={i.nome}
                                    valueInput={`${i.interacao}: ${i.descricao}`}
                                    valueTime={i.periodo}
                                    iconInput="circle-info" descImage="Imagem do usuário" iconTime="clock-rotate-left"
                                />
                        })}
                    </div>
                    <ChartBar
                        labels={MESES} datasets={colaboradores} title={tituloInteracoesPorColab}
                        width="100%" height="220px" backgroundColor="#f0f0f0" margin="auto" alignItems="center"
                    />
                </div>
            </div>
        </div>
        </>
    );

}

export default DashboardColaboradores;
