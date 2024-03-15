import axios from "axios";

const API_URL = axios.create({baseURL: "https://anih-api.onrender.com/denuncia/anih/"});
//const API_URL = axios.create({baseURL: "http://localhost:8000/denuncia/anih/"});

export const denunciar = data => API_URL.post("/denunciar/", data);

export const categorias = () => API_URL.get("/categoria/");

export const buscar = (data) => API_URL.post("/buscar/", data);