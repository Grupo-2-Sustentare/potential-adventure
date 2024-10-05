import React, { useState } from "react";
import Navbar from "../../components/RefactoredSideMenu/SideMenu";
import Button from "../../components/Button/Button"
import styles from './dashboardColaboradores.module.css';
import ChartBar from "../../components/Chart/ChartBar"
import ExpandedOperationLog from "../../components/ExpandedOperationLog/ExpandedOperationLog"

const DashboardColaboradores = () => {
    const labels = ['Sofia', 'Flávio', 'Carlos', 'Luiza', 'Marcos', 'Rafael', 'Manuel', 'Diego', 'Clara'];

    const datasets = [
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
    ];

    return (
        <div className={styles.group}>
            <Navbar iconHome={"house"} iconEmployees={"users"} exit={"arrow-right-from-bracket"} />
            <div className={styles.Global}>
                <div className={styles.NavTop}>
                    <span className={styles.titulo}>Painel dos colaboradores</span>
                    <div className={styles.buttons}>
                        <Button insideText={"Nome"} icon={"chevron-down"} />
                        <Button insideText={"Função"} icon={"chevron-down"} />
                        <Button insideText={"Período"} icon={"chevron-down"} />
                    </div>
                </div>
                <div className={styles.Chart}>
                    <div className={styles.list}>
                        <ExpandedOperationLog
                            imageAddress={"https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600"}
                            descImage={"Imagem do usuário"}
                            name={"Carol"}
                            iconInput={"circle-info"}
                            valueInput={"Entrada: 25 Kg de carne"}
                            iconTime={"clock-rotate-left"}
                            valueTime={"Um mês atrás"}
                        />
                    </div>
                    <ChartBar
                        labels={labels}
                        datasets={datasets}
                        title="Entrada"
                        width="98%"
                        height="42%"
                        backgroundColor="#f0f0f0"
                        margin="auto"
                        alignItems="center"
                    />
                </div>
            </div>
            <div className={styles.SideMenu}>
            </div>
        </div>
    );

}

export default DashboardColaboradores;
