import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../../components/RefactoredSideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardGeral.module.css';
import ChartBar from "../../components/Chart/ChartBar"
import Kpi from "../../components/KPI/Kpi";
import CheckableList from "../../components/CheckableList/CheckableList";
import {carregarListasChecaveis} from "./backend";
import {gerarNumerosAleatorios} from "../../tools/ferramentasDeTeste";

const Dashboard = () => {
    // Dados das CheckableList dos filtros
    let [categorias, setCategorias] = useState([])
    let [produtos, setProdutos] = useState([])
    let [entradasSaidas, setEntradasSaidas] = useState(ENTRADAS_E_SAIDAS.dataset)

    function carregarDados(){
        // Listas checáveis
        let dadosListas = carregarListasChecaveis()
        setCategorias(dadosListas["categorias"])
        setProdutos(dadosListas["produtos"])

        // Dados de gráficos
        setEntradasSaidas([
                {
                    label: 'Entrada',
                    data: gerarNumerosAleatorios(12, 0, 50000),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Saída',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
        ])
    }

    /* Realiza animação do ícone e atualiza o texto do hoŕario da última atualização. */
    let atualizando = false
    const [lastUpdateText, setUpdateText] = useState("")
    const [loadingClass, setLoadingClass] = useState(null)
    function atualizarDashboard(){
        // Evita atualizar de novo se já estiver no meio de uma atualização.
        if(atualizando){ return }

        setUpdateText("atualizando...")
        setLoadingClass(styles.loading)
        atualizando = true
        carregarDados()

        setTimeout(()=>{
            let agora =  new Date()
            let horarioFormat = `${agora.getHours()}:${agora.getMinutes()}`

            setUpdateText(`atualizado pela última vez às ${horarioFormat}`)
            setLoadingClass(null)
            atualizando = false
        }, 1500)
    }
    useEffect(() => atualizarDashboard, []); /*Executar 1 vez, no carregamento*/
    setInterval(atualizarDashboard, 10000) /*Executar à cada 30 seg*/

    return (
        <div className={styles.group}>
            <Navbar iconHome={"house"} iconEmployees={"users"} exit={"arrow-right-from-bracket"} />
            <div className={styles.Global}>
                <div className={styles.NavTop}>
                    <span className={styles.titulo}>Painel de controle geral</span>
                    <div className={styles.buttons}>
                        {/*<Button insideText={"Categoria"} icon={"chevron-down"} />*/}
                        {/*<Button insideText={"Produto"} icon={"chevron-down"} />*/}
                        <CheckableList textoBase={"Categorias"} opcoes={categorias}/>
                        <CheckableList textoBase={"Produtos"} opcoes={produtos}/>
                        <Button insideText={"Alterar período"} />
                    </div>
                </div>
                <div className={styles.Chart}>
                    <div className={styles.Charts}>
                        <ChartBar
                            labels={[
                                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
                                'Novembro', 'Dezembro'
                            ]}
                            datasets={entradasSaidas}
                            title="Entrada e Saída"
                            width="49%"
                            height="90%"
                            backgroundColor="#f0f0f0"
                        />
                    {/*    <ChartBar*/}
                    {/*        labels={labels_mes}*/}
                    {/*        datasets={datasets_compras}*/}
                    {/*        title=" Compras e Desperdícios"*/}
                    {/*        width="49%"*/}
                    {/*        height="90%"*/}
                    {/*        backgroundColor="#f0f0f0"*/}
                    {/*    />*/}
                    </div>
                    {/*<ChartBar*/}
                    {/*    labels={labels_categorias}*/}
                    {/*    datasets={datasets_categorias}*/}
                    {/*    title="Compra de Produtos por Categoria"*/}
                    {/*    width="100%"*/}
                    {/*    height="40%"*/}
                    {/*    backgroundColor="#f0f0f0"*/}
                    {/*    margin="auto"*/}
                    {/*    alignItems="center"*/}
                    {/*/>*/}
                </div>
            </div>
            <div className={styles.SideMenu}>
                <div onClick={()=>atualizarDashboard()} className={styles.updateInfo + " " + loadingClass}>
                    <p>Dados em tempo real.</p>
                    <span>
                        <FontAwesomeIcon icon={"clock-rotate-left"} className={styles.staticIcon}/>
                        <FontAwesomeIcon icon={"rotate"} className={styles.loadingIcon}/>
                        <p>{lastUpdateText}</p>
                    </span>
                </div>
                <div className={styles.DivKpis}>
                    <Kpi status="bom" name ="Produtos com baixo estoque" value ="5"/>
                    <Kpi name="Produtos próximos de vencer" value="15"/>
                    <Kpi status="ruim" name="Produtos vencidos ou descartados" value="2"/>
                    <Kpi status="bom" name="Compras não planejadas." value="3" />

                </div>
            </div>
        </div>
    );
}

const ENTRADAS_E_SAIDAS = {
    labels: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
        'Novembro', 'Dezembro'
    ],
    dataset: [
        {
            label: 'Entrada',
            data: [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
        {
            label: 'Saída',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }
    ]
}

export default Dashboard;