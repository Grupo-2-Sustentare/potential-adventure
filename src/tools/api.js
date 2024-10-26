import axios from "axios";
import {errorToast} from "../components/Toast/Toast";

let API_URL = "http://localhost:8080/"

async function get(entidade, params){
    params = params || {}

    return axios.get(API_URL + entidade, {"params": params}).then((res) => {
        if(res.data.length === 0){ // TODO - Trocar por "res.status === 204 "
            return null
        }
        return res.data
    }).catch((err) => {
        if (err.response === undefined){
            errorToast(`Erro desconhecido. \nContate o suporte.`)
            return
        }
        switch (err.response.status) {
            case 404:
                errorToast(`Não foi possível encontrar dados para ${entidade}.\nContate o suporte.`)
                break
            default:
                errorToast(`Erro desconhecido, código ${err.response.status}\nContate o suporte.`)
        }
    });
}

export {API_URL, get};