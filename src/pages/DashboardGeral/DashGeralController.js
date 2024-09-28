import axios from "axios";

let API_URL = "https://66f8795f2a683ce9730f8ac8.mockapi.io/paralelo19/"

// async function getReq(endpoint, action){
//     axios.get(`${API_URL}/${endpoint}`).then(action).catch(err => console.log(err));
// }

async function getEntradasEhSaidas(){
    return axios.get(API_URL + "entradasEhSaidas").then((req) => {
        let brutos = req.data
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

export {getEntradasEhSaidas};
