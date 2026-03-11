import ApiConfig from "../config/ApiConfig"
import axios from 'axios';

const GetNews = async(page:number, perPage:number) => {
    try {
        const result = await axios.get(ApiConfig.BASE_URL+"/news/page",{
            params:{
                page: page,
                per_page: perPage
            }   
        })
        return result.data
    
    } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Login gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

export {GetNews}