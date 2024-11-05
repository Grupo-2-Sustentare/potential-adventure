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
import {getFiltrosDashGeral} from "../../tools/controleDosFiltros";
const DEBUG_MODE = false;

async function carregarListasChecaveis(){
    let categorias = []
    let categorias_brutas = DEBUG_MODE ? MOCK_CATEGORIAS : await get("categorias")
    if (categorias_brutas !== null){
        for (let i in categorias_brutas){
            categorias.push(categorias_brutas[i].nome)
        }
    }

    let filtros = getFiltrosDashGeral()

    let urlProdutos = "produtos"
    let params = undefined
    if (filtros.categorias !== undefined) {
        urlProdutos += "/categorias"
        params = {"nomes": filtros.categorias}
    }

    let produtos = []
    let produtos_brutos = DEBUG_MODE ? MOCK_PRODUTOS : await get(urlProdutos, params)
    if (produtos_brutos !== null){
        for (let i in produtos_brutos){
            produtos.push(produtos_brutos[i].item.nome)
        }
    }

    return {
        "categorias": categorias,
        "produtos": produtos
    }
}

async function carregarGraficos(){
    let filtros = getFiltrosDashGeral()
    if (DEBUG_MODE){ await fetch("https://httpbin.org/delay/3")}

    // Entradas e saídas
    let entradasEhSaidasBrutas = DEBUG_MODE ?
        MOCK_ENTRADAS_E_SAIDAS() : await get("graficos/valor-entradas-saidas", filtros)
    let colsEntradasEhSaidas = [];
    let entradasEhSaidas = null;

    if (entradasEhSaidasBrutas !== null){
        let entradas = []
        let saidas = []
        for (let i in entradasEhSaidasBrutas){
            colsEntradasEhSaidas.push(entradasEhSaidasBrutas[i].diaMes)
            entradas.push(entradasEhSaidasBrutas[i].valorEntradas)
            saidas.push(entradasEhSaidasBrutas[i].valorSaidas)
        }
        if (entradas.length > 0 || saidas.length > 0){
            entradasEhSaidas = [{label: 'Entradas', data: entradas}, {label: 'Saídas', data: saidas}]
        }
    }

    let perdasBrutas = DEBUG_MODE ? MOCK_TIPOS_PERDAS() : await get("graficos/perdas-por-mes", filtros)
    let perdas = null
    if (perdasBrutas !== null) {
        perdas = []
        for (let i in perdasBrutas) {
            perdas.push({
                "label": perdasBrutas[i].tipoPerda,
                "data": [perdasBrutas[i].qtdPerda]
            })
        }
    }
    console.log(perdas)

    let comprasBrutas = DEBUG_MODE ? MOCK_COMPRAS() : await get(
        "graficos/regulares-vs-nao-planejadas", filtros
    )
    let colsCompras = []
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
        "entradasEhSaidas": {"colunas": colsEntradasEhSaidas, "valores": entradasEhSaidas},
        "perdas": {"valores": perdas},
        "compras": {"colunas": colsCompras, "valores": compras}
    }
}

async function carregarKPIs(){
    // 1. Estruturas fixas
    let KPIs = {
        "perdas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "naoPlanejadas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "valorInvest": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null},
        "valorSaidas": {"status": EnumStatusKpis.NEUTRAL, "quantidade": null}
    }
    let filtros = getFiltrosDashGeral()

    // 2. Dados vindos do back-end
    let kpiPerdasBruta = DEBUG_MODE ? MOCK_KPI_PERDAS() : await get("kpis/perdas", filtros)
    let kpiNaoPlanejadasBruta = DEBUG_MODE ?
        MOCK_KPI_NAO_PLANEJADAS() : await get("kpis/compras-nao-planejadas", filtros)
    let kpiInvestBruta = DEBUG_MODE ?
        MOCK_KPI_ENTRADAS() : await get("kpis/valor-total-entradas", filtros)

    if (kpiPerdasBruta !== undefined){
        KPIs.perdas.quantidade = kpiPerdasBruta.totalPerdas
        KPIs.perdas.status = kpiPerdasBruta.situacao
    }
    if (kpiNaoPlanejadasBruta !== undefined){
        KPIs.naoPlanejadas.quantidade = kpiNaoPlanejadasBruta.totalComprasNaoPlanejadas
        KPIs.naoPlanejadas.status = kpiNaoPlanejadasBruta.situacao
    }
    if (kpiInvestBruta !== undefined){
        if (kpiInvestBruta.totalEntradas !== null){
            KPIs.valorInvest.quantidade = kpiInvestBruta.totalEntradas
        }
    }

    return KPIs
}

async function carregarDataMaisAntigaDados(){
    return DEBUG_MODE ? MOCK_DATA_MAIS_ANTIGA : await get("dataMaisAntiga")
}

async function baixarFechamento(){
    let idResponsavel = JSON.parse(sessionStorage.getItem("usuario")).id
    let fechamento = await get(`interacoes-estoque/csv/${idResponsavel}`)
}

export {carregarListasChecaveis, carregarGraficos, carregarKPIs, carregarDataMaisAntigaDados, baixarFechamento}