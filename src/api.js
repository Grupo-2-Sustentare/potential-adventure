import axios from "axios";

const api = axios.create({
   
    baseURL: "http://localhost:25565"
});

export default api;
