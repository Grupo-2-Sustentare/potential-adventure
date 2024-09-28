import {gerarNumerosAleatorios} from "../../tools/ferramentasDeTeste";

function carregarListasChecaveis(){
    return {
        "categorias": ["Ingrediente de self-service", "Frente de caixa", "Doces por encomenda", "Produtos de limpeza"],
        "produtos": [
            "Feijão carioquinha", "Arroz", "Detergente", "Papel higiênico", "Maçã", "Coca Zero 300", "Garrafa d'água",
            "Peito de frango", "Guaraná Jesus 300"
        ]
    }
}

function carregarGraficos(){
    return {
        "entradas e saídas": [
                {
                    label: 'Entrada',
                    data: gerarNumerosAleatorios(12, 0, 50000)
                },
                {
                    label: 'Saída',
                    data: gerarNumerosAleatorios(12, 0, 50000)
                }
        ],
        "compras e desperdícios": [
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
        "categorias de compra": [
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
    return null
}

export {carregarListasChecaveis, carregarGraficos}