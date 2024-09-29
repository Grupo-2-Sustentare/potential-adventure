import axios from "axios";

let API_URL = "https://66f8795f2a683ce9730f8ac8.mockapi.io/paralelo19/"

async function get(entidade){
    return axios.get(API_URL + entidade).then((res) => {
        return res.data
    }).catch(err => console.log(err));
}

export {get};
