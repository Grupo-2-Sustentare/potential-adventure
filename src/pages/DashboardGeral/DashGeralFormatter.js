import {gerarNumeroAleatorio, gerarNumerosAleatorios} from "../../tools/ferramentasDeTeste";
import {get} from "../../tools/api";

async function carregarListasChecaveis(){
    let categorias = []
    let categorias_brutas = await get("categorias")
    if (categorias_brutas !== null){
        // Consumir categorias...
    }

    let produtos = ["Coca-cola", "Arroz", "Açúcar", "Feijão carioquinha", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"]
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
            } else if (entradasEhSaidasBrutas[i].tipo === "Saídas"){
                saidas = entradasEhSaidasBrutas[i].valores
            }
        }
        if (entradas.length > 0 || saidas.length > 0){
            entradasEhSaidas = [{label: 'Entradas', data: entradas}, {label: 'Saídas', data: saidas}]
        }
    }

    let perdasBrutas = await get("perdasPorTipo")
    let perdas = null
    if (perdasBrutas !== null) {
        let tiposPerdas = {
            "validade": [], "extraviado": [], "sumiu": []
        }
        for (let i in perdasBrutas) {
            switch (perdasBrutas[i].tipo) {
                case "validade":
                    tiposPerdas.validade = perdasBrutas[i].data
                    break
                case "extraviado":
                    tiposPerdas.extraviado = perdasBrutas[i].data
                    break
                case "sumiu":
                    tiposPerdas.sumiu = perdasBrutas[i].data
                    break
            }
        }

        if ((tiposPerdas.validade.length > 0) ||
            (tiposPerdas.sumiu.length > 0) ||
            (tiposPerdas.extraviado.length > 0)) {
            perdas = [
                {label: 'Prazo de validade', data: tiposPerdas.validade},
                {label: 'Contaminado ou extraviado', data: tiposPerdas.sumiu},
                {label: 'Não se sabe o paradeiro', data: tiposPerdas.extraviado}
            ]
        }
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