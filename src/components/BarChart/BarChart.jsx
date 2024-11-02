import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, defaults } from 'chart.js';
import styles from "./barChart.module.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const CORES = ["#3E5D93","#E8A415","#93783E"];

const BarChart = (
        { labels, datasets, title, width, height, xLabel=undefined, yLabel="Valor",
            floatScale = false }
    ) => {
    const data = {labels: labels, datasets: datasets};

    // Definindo dinâmicamente as cores das categorias dos gráficos via nossa paleta.
    let c = 0
    for (let i in datasets){
        datasets[i].backgroundColor = CORES[c++]
        if (c === CORES.length){
            c = 0;
        }
    }

    defaults.color = "#fff";
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico ocupe 100% da div
        plugins: {
            legend: {position: 'top',},
            title: {display: true, text: title},
        },
        scales: {
            x: {
                grid:{color: "rgba(201, 201, 201, 0.65)"},
                title: {
                    display: xLabel === undefined,
                    text: xLabel,
                },
            },
            y: {
                grid:{color: "rgba(201, 201, 201, 0.65)"},
                title: {
                    display: true,
                    text: yLabel,
                },
                beginAtZero: true,
                ticks: {precision: floatScale ? null : 0},
            },
        },
    };
    let conteudo = <div className={styles.noData}>
        <p>Gráfico de {title}</p>
        <p>Sem dados para o período e filtros selecionados</p>
    </div>
    if (datasets !== null){
        conteudo = <Bar data={data} options={options} className={styles.barChart} />
    }

    return (
        <div className={styles.chartContainer} style={{height: height, width: width}}>
            {conteudo}
        </div>
    );
};

export default BarChart;