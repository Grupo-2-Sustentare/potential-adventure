// Esse arquivo contém o conteúdo em listas de JSON que cada gráfico das dashboards
// deve receber.
// Hoje, isso está sendo atendido pelo back, removendo a necessidade de mantê-los declarados.
// Mesmo assim, é importante manter as referências, já que uma mudança no back que desrespeite
// essas estruturas travará os gráficos.

const entradasSaidas = [
    {
        label: 'Entradas',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    },
    {
        label: 'Saídas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }
]

const perdas= [
    {
        label: 'Prazo de validade',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    },
    {
        label: 'Contaminado ou extraviado',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    },
    {
        label: 'Não se sabe o paradeiro',
        data: [],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
    }
]

const compras = [
    {
        label: 'Compras regulares',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    },
    {
        label: 'Compras não planejadas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }
]

const interacoes_por_colaborador = [
    {
        label: 'Entradas',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Cor das barras das entradas
        borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda das barras
        borderWidth: 1,
    },
    {
        label: 'Saídas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor das barras das saídas
        borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras
        borderWidth: 1,
    },
]