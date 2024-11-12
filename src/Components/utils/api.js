import axios from "axios";

const api = axios.create({
  baseURL: "https://khedma-backend.onrender.com/",
});

export default api;
