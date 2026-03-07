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
        console.log(error)
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
        console.log(error)
    }
}

export {Login,Register}