import { useState } from "react"
import { login } from "../services/AuthService";

const useAuth = () =>{
    const [loading,setLoading] = useState();

    const handleLogin = async (username:string, password:string) =>{
        try {
            const result = await login({username,password});
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return {handleLogin,loading,setLoading};
}

export default useAuth;