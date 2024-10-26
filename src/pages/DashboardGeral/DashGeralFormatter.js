import {
    gerarNumeroAleatorio,
    gerarNumerosAleatorios,
    MOCK_ENTRADAS_E_SAIDAS,
    MOCK_KPI_ENTRADAS,
    MOCK_KPI_NAO_PLANEJADAS,
    MOCK_KPI_PERDAS,
    MOCK_KPI_SAIDAS,
    MOCK_COMPRAS,
    MOCK_PRODUTOS,
    MOCK_TIPOS_PERDAS, MOCK_CATEGORIAS, MOCK_DATA_MAIS_ANTIGA
} from "../../tools/ferramentasDeTeste";
import {get} from "../../tools/api";
import {EnumStatusKpis} from "../../components/KPI/EnumStatusKpis";
import {almostWhole, uid} from "chart.js/helpers";
import {getFiltroPeriodo} from "../../tools/controleDosFiltros";
const DEBUG_MODE = false;

async function carregarListasChecaveis(){
    let categorias = []
    let categorias_brutas = DEBUG_MODE ? MOCK_CATEGORIAS : await get("categorias")
    if (categorias_brutas !== null){
        for (let i in categorias_brutas){
            categorias.push(categorias_brutas[i].nome)
        }
    }

    let produtos = []
    let produtos_brutos = DEBUG_MODE ? MOCK_PRODUTOS : await get("produtos")
    if (produtos_brutos !== null){
        for (let i in produtos_brutos){
            // Se estiver nas categorias listadas...
            if(categorias.includes(produtos_brutos[i].item.categoria.nome)){
                produtos.push(produtos_brutos[i].item.nome)
            }
        }
    }

    return {
        "categorias": categorias,
        "produtos": produtos
    }
}

async function carregarGraficos(){
    // Entradas e saídas
    let entradasEhSaidasBrutas = DEBUG_MODE ? MOCK_ENTRADAS_E_SAIDAS() : await get("entradasEhSaidas")
    let entradasEhSaidas = null;

    if (DEBUG_MODE){
        await fetch("https://httpbin.org/delay/3")
    }

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

    let perdasBrutas = DEBUG_MODE ? MOCK_TIPOS_PERDAS() : await get("perdasPorTipo")
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

    let comprasBrutas = DEBUG_MODE ? MOCK_COMPRAS() : await get("compras_vs_ultima_hora")
    let compras = null
    if (comprasBrutas !== null){
        let tiposCompras = {
            "regulares": [], "ultima_hora": []
        }
        for (let i in comprasBrutas) {
            switch (comprasBrutas[i].tipo) {
                case "regulares":
                    tiposCompras.regulares = comprasBrutas[i].data
                    break
                case "ultima_hora":
                    tiposCompras.ultima_hora = comprasBrutas[i].data
                    break
            }
            if ((tiposCompras.regulares.length > 0) || (tiposCompras.ultima_hora.length > 0)) {
                compras = [
                    {label: 'Compras regulares', data: tiposCompras.regulares},
                    {label: 'Compras não planejadas', data: tiposCompras.ultima_hora}
                ]
            }
        }
    }
    return {
        "entradasEhSaidas": entradasEhSaidas,
        "perdas": perdas,
        "compras": compras
    }
}

async function carregarKPIs(){
    // 1. Estruturas fixas
    let KPIs = {
        "perdas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "naoPlanejadas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "valorEntradas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "valorSaidas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null}
    }
    let filtros = getFiltroPeriodo()

    // 2. Dados vindos do back-end
    let kpiPerdasBruta = DEBUG_MODE ? MOCK_KPI_PERDAS() : await get("kpis/perdas", filtros)
    let kpiNaoPlanejadasBruta = DEBUG_MODE ?
        MOCK_KPI_NAO_PLANEJADAS() : await get("kpis/compras-nao-planejadas", filtros)
    let kpiEntradasBruta = DEBUG_MODE ?
        MOCK_KPI_ENTRADAS() : await get("kpis/valor-total-entradas", filtros)
    let kpiSaidasBruta = DEBUG_MODE ?
        MOCK_KPI_SAIDAS() : await get("kpis/valor-total-saidas", filtros)

    if (kpiPerdasBruta !== undefined){
        KPIs.perdas.quantidade = kpiPerdasBruta.totalPerdas
        KPIs.perdas.status = kpiPerdasBruta.situacao
    }
    if (kpiNaoPlanejadasBruta !== undefined){
        KPIs.naoPlanejadas.quantidade = kpiNaoPlanejadasBruta.totalComprasNaoPlanejadas
        KPIs.naoPlanejadas.status = kpiNaoPlanejadasBruta.situacao
    }
    if (kpiEntradasBruta !== undefined){
        KPIs.valorEntradas.quantidade = kpiPerdasBruta
    }
    if (kpiSaidasBruta !== undefined){
        KPIs.valorSaidas.quantidade = kpiPerdasBruta
    }

    return KPIs
}

async function carregarDataMaisAntigaDados(){
    return DEBUG_MODE ? MOCK_DATA_MAIS_ANTIGA : await get("dataMaisAntiga")
}

export {carregarListasChecaveis, carregarGraficos, carregarKPIs, carregarDataMaisAntigaDados}