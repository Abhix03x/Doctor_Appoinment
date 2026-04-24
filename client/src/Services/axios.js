import axios from "axios";
import { Base_Url } from "./apiPath";

const axiosInstance = axios.create({
    baseURL:Base_Url,
    timeout:15000
});

axiosInstance.interceptors.request.use((req) =>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default axiosInstance;
