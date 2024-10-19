function gerarNumeroAleatorio(minimo, maximo){
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function gerarNumerosAleatorios(quantidade, minimo, maximo) {
  const numeros = [];
  for (let i = 0; i < quantidade; i++) {
    const numeroAleatorio = gerarNumeroAleatorio(minimo, maximo)
    numeros.push(numeroAleatorio);
  }
  return numeros;
}


// == Dash geral
// Filtros
const MOCK_CATEGORIAS = [
  {"nome": "Ingredientes de self-service"}, {"nome": "Doces por encomenda"}, {"nome": "Descartáveis"},
]
const MOCK_PRODUTOS = [
  {"nome": "Coca-cola"},
  {"nome": "Arroz"},
  {"nome": "Açúcar"},
  {"nome": "Feijão carioquinha"},
  {"nome": "Um produto de nome muito grande para testar o corte"}
]

// Gráficos
const MOCK_ENTRADAS_E_SAIDAS = () => {
  return [
    {
      "tipo": "Entradas",
      "valores": gerarNumerosAleatorios(12, 250, 1000),
      "id": "1"
    },
    {
      "tipo": "Saídas",
      "valores": gerarNumerosAleatorios(12, 250, 1000),
      "id": "2"
    }
  ]
}
const MOCK_TIPOS_PERDAS = () => {
  return [
    {
      "data": gerarNumerosAleatorios(12, 0, 4),
      "tipo": "validade",
      "id": "1"
    },
    {
      "data": gerarNumerosAleatorios(12, 0, 2),
      "tipo": "extraviado",
      "id": "2"
    },
    {
      "data": gerarNumerosAleatorios(12, 0, 2),
      "tipo": "sumiu",
      "id": "3"
    }
  ]
}

const MOCK_COMPRAS = () => {
  return [
    {
      "data": gerarNumerosAleatorios(12, 5, 24),
      "tipo": "regulares"
    },
    {
      "data": gerarNumerosAleatorios(12, 0, 8),
      "tipo": "ultima_hora"
    }
  ]
}

// KPIs
const MOCK_KPI_PERDAS = () => {
  return gerarNumeroAleatorio(0, 6)
}
const MOCK_KPI_NAO_PLANEJADAS = () => {
  return gerarNumeroAleatorio(0, 12)
}
const MOCK_KPI_ENTRADAS = () => {
  return gerarNumeroAleatorio(0, 450)
}
const MOCK_KPI_SAIDAS = () => {
  return gerarNumeroAleatorio(0, 450)
}

// == Dash colaboradores
//Filtros
const MOCK_COLABORADORES = [
  {"nome": "Antônio"}, {"nome": "Ana"}, {"nome": "Alê"},
]
//Logs
const MOCK_LOGS = () => {
  return [
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Alê",
      "interacao": "Entrada",
      "descricao": `${gerarNumeroAleatorio(2, 34)}kg de carne`,
      "periodo": "hoje, 08:28"
    },
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Ana",
      "interacao": "Saída",
      "descricao": `${gerarNumeroAleatorio(1, 5)} unidades de Coca 300`,
      "periodo": "hoje, 07:00"
    },
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Antônio",
      "interacao": "Entrada",
      "descricao": `${gerarNumeroAleatorio(3, 9)} unidades de guaraná`,
      "periodo": "ontem, 18:35"
    },
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Alê",
      "interacao": "Entrada",
      "descricao": "2kg de arroz branco",
      "periodo": "ontem, 11:32"
    },
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Joana",
      "interacao": "Ajuste",
      "descricao": "-2 unidade de leite",
      "periodo": "14/10, 21:29"
    },
    {
      "imagem": "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
      "nome": "Antônio",
      "interacao": "Entrada",
      "descricao": "42 unidades de caixas de leite",
      "periodo": "12/10, 14:32"
    }
  ]}

const MOCK_DATA_MAIS_ANTIGA = new Date("2024-08-20")

export {
    gerarNumeroAleatorio, gerarNumerosAleatorios, MOCK_CATEGORIAS, MOCK_PRODUTOS, MOCK_ENTRADAS_E_SAIDAS,
    MOCK_TIPOS_PERDAS,MOCK_COMPRAS, MOCK_KPI_PERDAS, MOCK_KPI_NAO_PLANEJADAS, MOCK_KPI_ENTRADAS, MOCK_KPI_SAIDAS,
    MOCK_COLABORADORES, MOCK_LOGS, MOCK_DATA_MAIS_ANTIGA
}