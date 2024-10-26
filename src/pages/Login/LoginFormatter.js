import axios from "axios";
import {errorToast} from "../../components/Toast/Toast";
import {API_URL} from "../../tools/api";

const DEBUG_MODE = true

export default function login(body){
    if (DEBUG_MODE) {
        return {"nome": "teste", "senha": ""}
    }

    return axios.get(API_URL + "/usuarios").then((res) => {
        if(res.data.length === 0){ // TODO - Trocar por "res.status === 204 "
            return null
        }
        return res.data
    }).catch((err) => {
        switch (err.response.status) {
            default:
                errorToast(`Erro desconhecido, código ${err.response.status}\nContate o suporte.`)
                return null
        }
    });

    return axios.post(API_URL + "/usuarios", body).then((res) => {
        if(res.data.length === 0){
            return null
        }
        return res.status
    }).catch((err) => {
        switch (err.response.status) {
            case 400:
                errorToast(`Não foi possível se conectar com o sistema de login.\nContate o suporte.`)
                break
            default:
                errorToast(`Erro desconhecido, código ${err.response.status}\nContate o suporte.`)
        }
    });
}