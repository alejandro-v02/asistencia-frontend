import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({
    baseURL: "http://localhost:3000", 
    headers: {
        "Content-Type": "application/json",
    },
});


client.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
