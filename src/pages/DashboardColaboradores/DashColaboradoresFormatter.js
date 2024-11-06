import {
    MOCK_ENTRADAS_E_SAIDAS,
    MOCK_COLABORADORES, MOCK_LOGS, MOCK_DATA_MAIS_ANTIGA, gerarNumeroAleatorio
} from "../../tools/ferramentasDeTeste";
import {get} from "../../tools/api";
import {EnumStatusKpis} from "../../components/KPI/EnumStatusKpis";
import {getFiltrosDashColab} from "../../tools/controleDosFiltros";
const DEBUG_MODE = false;

async function carregarColaboradores(){
    let colaboradores = []
    let colabs_brutos = DEBUG_MODE ? MOCK_COLABORADORES : await get("usuarios/listar-sem-imagem")
    if (colabs_brutos !== null){
        for (let i in colabs_brutos){
            colaboradores.push(colabs_brutos[i].nome)
        }
    }

    return  colaboradores
}

async function carregarLogs(){
    const filtros = getFiltrosDashColab()

    let logsBrutos = DEBUG_MODE ? MOCK_LOGS : await get("graficos/colaboradores/log-operacoes", filtros)
    let logs = []
    for (let i in logsBrutos){
        console.log(logsBrutos[i])
        logs.push({
            "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
            "nome": logsBrutos[i].responsavelNome,
            "interacao": logsBrutos[i].descricaoAuditoria,
            "descricao": logsBrutos[i].detalhesRegistro,
            "periodo": logsBrutos[i].dataAcao
        })
    }
    return logs
}

async function carregarGrafico(){
    const filtros = getFiltrosDashColab()

    let interacoesBrutas = DEBUG_MODE ? MOCK_ENTRADAS_E_SAIDAS() : await get(
        "graficos/colaboradores/entrada-saida", filtros
    )
    let interacoesPorColabs = null;
    let colaboradores = [];

    if (DEBUG_MODE){
        await fetch("https://httpbin.org/delay/3")
    }
    if (interacoesBrutas !== null){
        let entradas = []
        let saidas = []
        for (let i in interacoesBrutas){
            colaboradores.push(interacoesBrutas[i].colaborador)
            entradas.push(interacoesBrutas[i].qtdEntradas)
            saidas.push(interacoesBrutas[i].qtdSaidas)
        }
        if (colaboradores.length > 0){
            interacoesPorColabs = [{label: 'Entradas', data: entradas}, {label: 'Saídas', data: saidas}]
        }
    }

    return {"valores": interacoesPorColabs, "colunas": colaboradores}
}

async function carregarDataMaisAntigaDados(){
    return DEBUG_MODE ? MOCK_DATA_MAIS_ANTIGA : await get("dataMaisAntiga")
}

export {carregarColaboradores, carregarLogs, carregarGrafico, carregarDataMaisAntigaDados}