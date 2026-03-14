import ApiConfig from "../config/ApiConfig"
import axios from 'axios';
// import { jwtDecode } from "jwt-decode";

const Register = async (username:string,password:string)=>{
    const data = {
        "username" : username,
        "password" : password
    }
    try {
        const response = await axios.post(ApiConfig.BASE_URL+"/register",data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Login gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

const Login = async(username:string,password:string)=>{
    const data = {
        "username" : username,
        "password" : password
    }
    try {
        const response = await axios.post(ApiConfig.BASE_URL+"/login",data,{withCredentials:true})
        sessionStorage.setItem("isLogin","true")
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Login gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

const Logout = async () => {
    try {
        const response = await axios.post(ApiConfig.BASE_URL+"/logout",{},{withCredentials:true});
        sessionStorage.setItem("isLogin","false")
        return response.data
    } catch (error) {
         if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Login gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

const GetProfile = async () => {
    try {
        const response = await axios.get(ApiConfig.BASE_URL+"/profile",{withCredentials:true})
        return response.data
    } catch (error) {
         if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Get Profile gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

export {Login, Register, Logout, GetProfile}