import axios from "axios";
import {errorToast} from "../components/Toast/Toast";

let API_URL = "https://66f8795f2a683ce9730f8ac8.mockapi.io/paralelo19/"

async function get(entidade){
    return axios.get(API_URL + entidade).then((res) => {
        if(res.data.length === 0){ // TODO - Trocar por "res.status === 204 "
            return null
        }
        return res.data
    }).catch((err) => {
        switch (err.response.status) {
            case 404:
                errorToast(`Não foi possível encontrar dados para ${entidade}.\nContate o suporte.`)
                break
            default:
                errorToast(`Erro desconhecido, código ${err.response.status}\nContate o suporte.`)
        }
    });
}

export {get};
