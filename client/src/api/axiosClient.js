import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(async(config) => {
    return{
        config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`, //send JWT to server after adding it at request header
        },
    }
});

axiosClient.interceptors.responce.use((response) => {
    return response;
}, (err) => {
    throw err.responce;
});

export default axiosClient;