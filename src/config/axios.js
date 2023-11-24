import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept' : 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

clienteAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

export default clienteAxios