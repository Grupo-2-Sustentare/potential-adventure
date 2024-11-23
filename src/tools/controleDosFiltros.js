function formatFiltro(valores){
    if (valores === undefined) {
        return null
    }
    valores = JSON.parse(valores)
    let final = ""
    for (let i in valores){
        if (!valores[i].selecionado) continue
        final += `${valores[i].nome},`
    }

    // Removendo a última ","
    final = final.substring(0, final.length - 1);
    if (final === ""){
        return null
    }
    return final
}

function getFiltrosDashGeral(){
    let baseFiltros = JSON.parse(sessionStorage.filtroMes)

    let cat = formatFiltro(sessionStorage.filtroCategorias)
    if (cat !== null){
        baseFiltros.categorias = cat
    }

    let prods = formatFiltro(sessionStorage.filtroProdutos)
    if (prods !== null){
        baseFiltros.itens = prods
    }
    return baseFiltros
}

function getFiltrosDashColab(){
    let baseFiltros = JSON.parse(sessionStorage.filtroMes)

    let colabs = formatFiltro(sessionStorage.filtroColaboradores)
    if (colabs !== null){
        baseFiltros.colaboradores = colabs
    }
    console.log(colabs)
    return baseFiltros
}

export {getFiltrosDashGeral, getFiltrosDashColab}