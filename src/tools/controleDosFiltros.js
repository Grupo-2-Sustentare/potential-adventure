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
    return final
}

function getFiltros(){
    let baseFiltros = JSON.parse(sessionStorage.filtroMes)

    let cat = formatFiltro(sessionStorage.filtroCategorias)
    if (cat !== null){
        baseFiltros.categorias = cat
    }

    let prods = formatFiltro(sessionStorage.filtroProdutos)
    if (prods !== null){
        baseFiltros.itens = prods
    }
    console.log(baseFiltros)
    return baseFiltros
}
export {getFiltros}