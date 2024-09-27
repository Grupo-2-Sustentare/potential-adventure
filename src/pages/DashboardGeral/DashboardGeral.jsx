import React, {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from "../../components/RefactoredSideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardGeral.module.css';
import ChartBar from "../../components/Chart/ChartBar"
import Kpi from "../../components/KPI/Kpi";
import CheckableList from "../../components/CheckableList/CheckableList";
import {carregarListasChecaveis} from "./backend";

const Dashboard = () => {
    let [categorias, setCategorias] = useState([])
    let [produtos, setProdutos] = useState([])

    /* Realiza animação do ícone e atualiza o texto do hoŕario da última atualização. */
    const [lastUpdateText, setUpdateText] = useState("")
    const [loadingClass, setLoadingClass] = useState(null)
    function atualizarDados(){
        setUpdateText("atualizando...")
        setLoadingClass(styles.loading)

        /* Buscando dados das listas checáveis */
        let dadosListas = carregarListasChecaveis()
        setCategorias(dadosListas["categorias"])
        setProdutos(dadosListas["produtos"])

        setTimeout(()=>{
            let agora =  new Date()
            let horarioFormat = `${agora.getHours()}:${agora.getMinutes()}`

            setUpdateText(`atualizado pela última vez às ${horarioFormat}`)
            setLoadingClass(null)
        }, 1500)
    }
    useEffect(() => atualizarDados, []); /*Executar 1 vez, no carregamento*/
    setInterval(atualizarDados, 30000) /*Executar à cada 30 seg*/

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
                            labels={labels}
                            datasets={datasets}
                            title="Entrada e Saída"
                            width="49%"
                            height="90%"
                            backgroundColor="#f0f0f0"
                        />
                        <ChartBar
                            labels={labels_mes}
                            datasets={datasets_compras}
                            title=" Compras e Desperdícios"
                            width="49%"
                            height="90%"
                            backgroundColor="#f0f0f0"
                        />
                    </div>
                    <ChartBar
                        labels={labels_categorias}
                        datasets={datasets_categorias}
                        title="Compra de Produtos por Categoria"
                        width="100%"
                        height="40%"
                        backgroundColor="#f0f0f0"
                        margin="auto"
                        alignItems="center"
                    />
                </div>
            </div>
            <div className={styles.SideMenu}>
                <div onClick={()=>atualizarDados()} className={styles.updateInfo + " " + loadingClass}>
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


const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const datasets = [
    {
        label: 'Entrada',
        data: [3000, 2000, 1500, 2500, 3500, 3000, 4000, 1000, 2000, 4500, 3500, 3000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    },
    {
        label: 'Saída',
        data: [1000, 2500, 4500, 2000, 3000, 3500, 2000, 1500, 4000, 5000, 4000, 2000],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    },
];

const labels_mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const datasets_compras = [
{
    label: 'Quantidade de Compras',
    data: [1500, 1400, 1600, 1550, 1700, 1600, 1750, 1650, 1800, 1900, 2000, 1850],
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
},
{
    label: 'Desperdícios',
    data: [500, 900, 250, 320, 830, 210, 140, 585, 855, 950, 260, 1145],
    backgroundColor: 'rgba(255, 99, 132, 0.6)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
},
];

const labels_categorias = ['Arroz', 'Feijão', 'Carne', 'Frango', 'Vegetais', 'Massas', 'Sopas', 'Saladas', 'Bebidas', 'Sobremesas'];

const datasets_categorias = [
    {
        label: 'Compras de Arroz',
        data: [500, 450, 600, 550, 620, 580, 640, 600, 670, 700, 720, 690],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    },
    {
        label: 'Compras de Feijão',
        data: [400, 380, 420, 410, 440, 430, 450, 440, 460, 470, 490, 480],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    },
    {
        label: 'Compras de Carne',
        data: [800, 750, 850, 820, 880, 860, 900, 880, 910, 950, 980, 940],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    },
    {
        label: 'Compras de Frango',
        data: [600, 550, 620, 590, 640, 610, 650, 630, 670, 690, 710, 680],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
    },
    {
        label: 'Compras de Vegetais',
        data: [300, 280, 320, 310, 330, 320, 340, 330, 350, 360, 370, 340],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
    }
];


export default Dashboard;
