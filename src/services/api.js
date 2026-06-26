import axios from "axios";

const api = axios.create({
 baseURL: "https://glowbackend.onrender.com"
});

export default api;