import axios from "axios";


const API_URL = axios.create({baseURL: "https://anih-api.onrender.com/publicaciones/anih/"});
//const API_URL = axios.create({baseURL: "http://localhost:8000/publicaciones/anih/"});

export const getRecintos = () => API_URL.get("/recinto/");

export const nuevoRecintos = (data) => API_URL.post("/recinto/", data);

export const cantidadLogs = () => API_URL.get("/cantidadLogs/");

export const estadisticaDenuncias = () => API_URL.get("/estadisticaDenuncias/");

export const getPublicaciones = () => API_URL.get("/publicacion/");

export const nuevaPublicacion = (data) => API_URL.post("/publicacion/", data);

export const actualizarPublicacion = (id, data) => API_URL.put(`/publicacion/${id}/`, data);

export const borrarPublicacion = (id) => API_URL.delete(`/publicacion/${id}/`);

