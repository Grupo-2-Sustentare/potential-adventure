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

export {gerarNumeroAleatorio, gerarNumerosAleatorios}