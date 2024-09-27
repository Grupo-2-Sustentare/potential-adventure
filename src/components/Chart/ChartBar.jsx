import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ labels, datasets, title, width, height, backgroundColor }) => {
    const data = {
        labels: labels,
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico ocupe 100% da div
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title || 'Custom Bar Chart',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Mês',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor',
                },
            },
        },
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: width || '100%',
            height: height || '100%',
            backgroundColor: backgroundColor || 'white',
            padding: '10px',
            borderRadius: '8px',
            margin: '0px'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                margin: '0px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <Bar data={data} options={options} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Chart;