import axios from "axios";

const API_URL = axios.create({baseURL: "https://anih-api.onrender.com/chat/anih/"});
//const API_URL = axios.create({baseURL: "http://localhost:8000/chat/anih/"});

export const getUsuarios = data => API_URL.post("/usuarios/", data);

export const getMensajes = data => API_URL.post("/mensajes/", data);

export const chatBot = data => API_URL.post("/chat-bot/", data);

export const enviarMensaje = data => API_URL.post("/mensaje/", data);