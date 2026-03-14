import { useNavigate } from "react-router";
import NewsCard from "../components/NewsCard";
import MainLayout from "../layouts/MainLayout";
import { Logout } from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { GetNews } from "../services/NewsService";
import type { NewsType } from "../Types/NewsType";
import Pagination from "../components/Pagination";
import Search from "../components/Search";


const MainPage = () => {
    const navigate = useNavigate()
    const [news,setNews] = useState<NewsType[]>([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [inputQuery, setInputQuery] = useState("")
    const [query, setQuery] = useState("")

    const handleSearch = () => {
        setQuery(inputQuery)
    }

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

   useEffect(() => {
    const fetchNews = async () => {
        try {

            let data

            if (query.trim() === "") {
                data = await GetNews(page, 6)
            } else {
                data = await GetNews(page, 6,query)
            }

            setNews(data.news)
            setTotalPage(Math.ceil(data.total_pages))

        } catch (error) {
            console.log(error)
        }
    }

    fetchNews()

}, [page, query])

            return (
                <MainLayout func={handleLogout}>
                    <ToastContainer />

                <Search
                    inputQuery={inputQuery}
                    setInputQuery={setInputQuery}
                    onSearch={handleSearch}
                />
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                    {news.map((item) => (
                        <NewsCard
                            key={item.id}
                            title={item.title}
                            content={item.content}
                            
                        />
                    ))}
                </div>

                <Pagination
                    page={page}
                    totalPage={totalPage}
                    setPage={setPage}
                />
            </div>
        </MainLayout>
    )
}
    

export default MainPage;