import {
    MOCK_ENTRADAS_E_SAIDAS,
    MOCK_COLABORADORES, MOCK_LOGS, MOCK_DATA_MAIS_ANTIGA
} from "../../tools/ferramentasDeTeste";
import {get} from "../../tools/api";
import {EnumStatusKpis} from "../../components/KPI/EnumStatusKpis";
const DEBUG_MODE = false;

async function carregarColaboradores(){
    let colaboradores = []
    let colabs_brutos = DEBUG_MODE ? MOCK_COLABORADORES : await get("usuarios")
    if (colabs_brutos !== null){
        for (let i in colabs_brutos){
            colaboradores.push(colabs_brutos[i].nome)
        }
    }

    return  colaboradores
}

async function carregarLogs(){
    let logsBrutos = DEBUG_MODE ? MOCK_LOGS : await get("logs")
    let logs = []
    for (let i in logsBrutos){
        // TODO - Fazer...
    }
    return logs
}

async function carregarGrafico(){
    // Entradas e saídas
    let interacoesBrutas = DEBUG_MODE ? MOCK_ENTRADAS_E_SAIDAS() : await get("entradasEhSaidas")
    let interacoesPorColabs = null;

    if (DEBUG_MODE){
        await fetch("https://httpbin.org/delay/3")
    }

    if (interacoesBrutas !== null){
        let entradas = []
        let saidas = []
        for (let i in interacoesBrutas){
            if (interacoesBrutas[i].tipo === "Entradas"){
                entradas = interacoesBrutas[i].valores
            } else if (interacoesBrutas[i].tipo === "Saídas"){
                saidas = interacoesBrutas[i].valores
            }
        }
        if (entradas.length > 0 || saidas.length > 0){
            interacoesPorColabs = [{label: 'Entradas', data: entradas}, {label: 'Saídas', data: saidas}]
        }
    }

    return interacoesPorColabs
}

async function carregarDataMaisAntigaDados(){
    return DEBUG_MODE ? MOCK_DATA_MAIS_ANTIGA : await get("dataMaisAntiga")
}

export {carregarColaboradores, carregarLogs, carregarGrafico, carregarDataMaisAntigaDados}