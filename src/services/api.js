import axios from "axios";

const api = axios.create({
 baseURL: "https://glowbackend-3.onrender.com"
});

export default api;