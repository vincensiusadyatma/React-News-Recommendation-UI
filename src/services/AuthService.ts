import axios from "axios"
import ApiConfig from "../config/ApiConfig"
import type { AuthRequest } from "../Types/AuthRequest"
import type { AuthResponse } from "../Types/AuthResponse"

const login = async ({username,password}:AuthRequest) => {
    try {
        
        const result =  await axios.get<AuthResponse[]>("user",{
            baseURL:ApiConfig.BASE_URL
        })
        
        const data =result.data.find((element)=>{
            console.log(element)
            return element.username == username;
        })
        
        if (data?.token) {
        localStorage.setItem("token", data.token)
        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export {login}