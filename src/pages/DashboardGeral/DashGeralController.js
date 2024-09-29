import axios from "axios";

let API_URL = "https://66f8795f2a683ce9730f8ac8.mockapi.io/paralelo19/"

// async function getReq(endpoint, action){
//     axios.get(`${API_URL}/${endpoint}`).then(action).catch(err => console.log(err));
// }

async function getProdutos(){
    return axios.get(API_URL + "produtos").then((res) => {
        let brutos = res.data
        let tratados = []
        for (let i in brutos){
            tratados.push(brutos[i].nome)
        }
        return tratados
    }).catch(err => console.log(err));
}

async function getEntradasEhSaidas(){
    return axios.get(API_URL + "entradasEhSaidas").then((res) => {
        let brutos = res.data
        let tratados = {"entradas": [], "saidas": []}
        for (let i in brutos){
            if (brutos[i].tipo === "Entradas"){
                tratados.entradas = brutos[i].valores
            } else {
                tratados.saidas = brutos[i].valores
            }
        }
        return tratados
    }).catch(err => console.log(err));
}

export {getProdutos, getEntradasEhSaidas};
