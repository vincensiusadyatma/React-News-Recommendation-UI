import { useNavigate } from "react-router";
import NewsCard from "../components/NewsCard";
import MainLayout from "../layouts/MainLayout";
import { Logout } from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { GetNews } from "../services/NewsService";
import type { NewsType } from "../Types/NewsType";


const MainPage = () => {
    const navigate = useNavigate()
    const [news,setNews] = useState<NewsType[]>([])
    const handleLogout = async() => {
        try {
            const result = await Logout()
            if (result.message == "logout success") {
                toast.success("Logout Successfully",{onClose: ()=>{
                    navigate("/auth/login")
                },autoClose:1500},) 
            }   
          } catch (error) {
             if (error instanceof Error) {
                toast.error(error.message, {
                    autoClose: 1500
                })
            }
        }
    };

    useEffect(()=>{
        const fetchNews = async () => {
        try {
            const data = await GetNews(1,10);
            setNews(data.news)
        } catch (error) {
            console.log(error);
        }
    }

    fetchNews();
    },[])

    return (
        <MainLayout func={handleLogout}>
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item) => {
                        return (
                        <NewsCard key={item.id}  />
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}
    

export default MainPage;