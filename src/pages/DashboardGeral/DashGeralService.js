import {gerarNumeroAleatorio, gerarNumerosAleatorios} from "../../tools/ferramentasDeTeste";
import {getEntradasEhSaidas, getProdutos} from "./DashGeralController";

async function carregarListasChecaveis(){
    let produtos = await getProdutos()
    console.log(produtos)
    return {
        "categorias": ["Ingrediente de self-service", "Frente de caixa", "Doces por encomenda", "Produtos de limpeza"],
        "produtos": produtos
    }
}

async function carregarGraficos(){
    let entradasEhSaidas = await getEntradasEhSaidas()
    return {
        "entradasEhSaidas": [
                {
                    label: 'Entrada',
                    data: entradasEhSaidas.entradas
                },
                {
                    label: 'Saída',
                    data: entradasEhSaidas.saidas
                }
        ],
        "comprasEhDesperdicios": [
            {
                label: 'Compras de Arroz',
                data: gerarNumerosAleatorios(12, 0, 50000)
            },
            {
                label: 'Compras de Feijão',
                data: gerarNumerosAleatorios(12, 0, 50000)
            },
            {
                label: 'Compras de Carne',
                data: gerarNumerosAleatorios(12, 0, 50000)
            },
            {
                label: 'Compras de Frango',
                data: gerarNumerosAleatorios(12, 0, 50000)
            },
            {
                label: 'Compras de Vegetais',
                data: gerarNumerosAleatorios(12, 0, 50000)
            }
        ],
        "categoriasCompras": [
        {
            label: 'Quantidade de Compras',
            data: gerarNumerosAleatorios(12, 0, 250)
        },
        {
            label: 'Desperdícios',
            data: gerarNumerosAleatorios(12, 0, 250)
        }
    ]
    }
}

function carregarKPIs(){
    const METRICAS = {

    }
    return {
        "aVencer": {
            "quantidade": gerarNumeroAleatorio(0, 5)
        },
        "vencidos": {
            "quantidade": gerarNumeroAleatorio(0, 8)
        },
        "naoPlaneajadas": {
            "quantidade": gerarNumeroAleatorio(0, 14)
        }
    }
}

export {carregarListasChecaveis, carregarGraficos, carregarKPIs}