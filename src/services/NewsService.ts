import ApiConfig from "../config/ApiConfig"
import axios from 'axios';

const GetNews = async(page:number, perPage:number, query:string="") => {
    try {
        if (query.trim() !== "") {
            const result = await axios.get(ApiConfig.BASE_URL + "/news/search", {
                params:{
                    q: query,
                    page: page,
                    per_page: perPage
                }
            })
            return result.data
            
        } else {
            const result = await axios.get(ApiConfig.BASE_URL+"/news/page",{
            params:{
                page: page,
                per_page: perPage
            }   
            })

            return result.data
        }
    } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Search Gagal"
            throw new Error(message)
        }else{
            throw new Error("Error")
        }
    }
}

const GetNewsDetail = async (id: number) => {
    try {

        const result = await axios.get(ApiConfig.BASE_URL + `/news/${id}`)

        return result.data

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Get News Detail Failed"
            throw new Error(message)
        } else {
            throw new Error("Error")
        }

    }
}


const GetRecommendation = async (newsId: number, topK: number = 5) => {
    try {
        const result = await axios.get(
            ApiConfig.BASE_URL + `/ucb/${newsId}`,
            {
                params: {
                    top_k: topK
                }
            }
        )

        return result.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Get Recommendation Failed"
            throw new Error(message)
        } else {
            throw new Error("Error")
        }
    }
}
export {GetNews,GetNewsDetail, GetRecommendation}