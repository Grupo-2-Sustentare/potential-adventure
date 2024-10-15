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

export {
    gerarNumeroAleatorio, gerarNumerosAleatorios, MOCK_CATEGORIAS, MOCK_PRODUTOS, MOCK_ENTRADAS_E_SAIDAS,
    MOCK_TIPOS_PERDAS,MOCK_COMPRAS, MOCK_KPI_PERDAS, MOCK_KPI_NAO_PLANEJADAS, MOCK_KPI_ENTRADAS, MOCK_KPI_SAIDAS
}