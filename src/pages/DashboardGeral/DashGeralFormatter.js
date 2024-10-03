import {gerarNumeroAleatorio, gerarNumerosAleatorios} from "../../tools/ferramentasDeTeste";
import {get} from "../../tools/api";

async function carregarListasChecaveis(){
    let categorias = []
    let categorias_brutas = await get("categorias")
    if (categorias_brutas !== null){
        // Consumir categorias...
    }

    let produtos = []
    let produtos_brutos = await get("produtos")
    if (produtos_brutos !== null){
        for (let i in produtos_brutos){
            produtos.push(produtos_brutos[i].nome)
        }
    }

    return {
        "categorias": categorias,
        "produtos": produtos
    }
}

async function carregarGraficos(){
    // Entradas e saídas
    let entradasEhSaidasBrutas = await get("entradasEhSaidas")
    let entradasEhSaidas = null;

    if (entradasEhSaidasBrutas !== null){
        let entradas = []
        let saidas = []
        for (let i in entradasEhSaidasBrutas){
            if (entradasEhSaidasBrutas[i].tipo === "Entradas"){
                entradas = entradasEhSaidasBrutas[i].valores
            } else {
                saidas = entradasEhSaidasBrutas[i].valores
            }
        }
        if (entradas.length > 0 || saidas.length > 0){
            entradasEhSaidas = [{label: 'Entrada', data: entradas}, {label: 'Saída', data: saidas}]
        }
    }

    let perdasBrutas = await get("perdas")
    let perdas = null
    if (perdasBrutas !== null){
        // Consumir...
    }

    let comprasVsUltimaHoraBrutas = await get("compras_vs_ultima_hora")
    let comprasVsUltimaHora = null
    if (comprasVsUltimaHoraBrutas !== null){
        // ...
    }

    return {
        "entradasEhSaidas": entradasEhSaidas,
        "perdas": perdas,
        "comprasVsUltimaHora": comprasVsUltimaHora
    }
}

function carregarKPIs(){
    const METRICAS = {

    }
    let KPIs = {
        "aVencer": { "status": "", "quantidade": 0},
        "vencidos": { "status": "", "quantidade": 0},
        "naoPlaneajadas": { "status": "", "quantidade": 0}
    }

    return KPIs
}

export {carregarListasChecaveis, carregarGraficos, carregarKPIs}