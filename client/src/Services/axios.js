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

axiosInstance.interceptors.response.use((response) =>{
    return response;
},(error) =>{
    if(error.response){
        if(error.response.status === 401){
            window.location.href= "/login";
        }else if(error.response.status === 500){
            console.log("Server error. please try again later");
        }
    }else if(error.code === "ECONNABORTED"){
        console.error("Request timeout..Please try Again");
    }
    return Promise.reject(error);
});



export default axiosInstance;
