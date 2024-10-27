import {post} from "../../tools/api";
import {alertToast} from "../../components/Toast/Toast";

const DEBUG_MODE = false

export default async function login(body){
    if (DEBUG_MODE) {
        return {"nome": "teste", "senha": ""}
    }

    let res = await post("usuarios/login", null, body)
    switch (res.status){
        case 200:
            return res.data
        case 401:
            alertToast("Usuário ou senha inválidos.")
            return null
        default:
            return null
    }
}