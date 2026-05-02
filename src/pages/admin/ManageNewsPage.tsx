import { useNavigate } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import { Logout } from "../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { GetNews, UpdateNews, DeleteNews } from "../../services/NewsService";
import type { NewsType } from "../../Types/NewsType";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const ManageNewsPage = () => {
    const navigate = useNavigate()

    const [news,setNews] = useState<NewsType[]>([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [inputQuery, setInputQuery] = useState("")
    const [query, setQuery] = useState("")

    const [selectedNews, setSelectedNews] = useState<NewsType | null>(null)
    const [showView, setShowView] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [editTitle, setEditTitle] = useState("")
    const [editContent, setEditContent] = useState("")

    const handleSearch = () => {
        setQuery(inputQuery)
        setPage(1)
    }

    const handleLogout = async() => {
        try {
            const result = await Logout()
            if (result.message == "logout success") {
                toast.success("Logout Successfully",{onClose: ()=>{
                    navigate("/auth/login")
                },autoClose:1500})
            }   
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    };

    const fetchNews = async () => {
        try {
            let data
            if (query.trim() === "") {
                data = await GetNews(page, 6)
            } else {
                data = await GetNews(page, 6, query)
            }

            setNews(data?.news || [])
            setTotalPage(data?.total_pages || 1)

        } catch (error) {
            console.log(error)
        }
    }

 useEffect(() => {
    const loadNews = async () => {
        try {
            let data

            if (query.trim() === "") {
                data = await GetNews(page, 6)
            } else {
                data = await GetNews(page, 6, query)
            }

            setNews(data?.news || [])
            setTotalPage(data?.total_pages || 1)

        } catch (error) {
            console.log(error)
        }
    }

    loadNews()
}, [page, query])
    // ACTIONS
    const handleView = (item: NewsType) => {
        setSelectedNews(item)
        setShowView(true)
    }

    const handleEdit = (item: NewsType) => {
        setSelectedNews(item)
        setEditTitle(item.title)
        setEditContent(item.content)
        setShowEdit(true)
    }

    const handleDelete = (item: NewsType) => {
        setSelectedNews(item)
        setShowDelete(true)
    }

    const submitEdit = async () => {
        if (!selectedNews) return
        try {
            await UpdateNews(selectedNews.id!, editTitle, editContent)
            toast.success("Updated")
            setShowEdit(false)
            fetchNews()
        } catch {
            toast.error("Gagal update")
        }
    }

    const submitDelete = async () => {
        if (!selectedNews) return
        try {
            await DeleteNews(selectedNews.id!)
            toast.success("Deleted")
            setShowDelete(false)
            fetchNews()
        } catch {
            toast.error("Gagal delete")
        }
    }

    return (
        <MainLayout func={handleLogout}>
            <ToastContainer />

            <Search
                inputQuery={inputQuery}
                setInputQuery={setInputQuery}
                onSearch={handleSearch}
            />

            <div className="max-w-5xl mx-auto mt-6 text-white">

                {/* TABLE */}
                <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-white/10 text-white">
                            <tr>
                                <th className="p-4 border border-white/10 text-left">ID</th>
                                <th className="p-4 border border-white/10 text-left">Title</th>
                                <th className="p-4 border border-white/10 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-white/10 transition">
                                    <td className="p-4 border border-white/10">{item.id}</td>
                                    <td className="p-4 border border-white/10">{item.title}</td>
                                    <td className="p-4 border border-white/10 text-right space-x-3">
                                        <button onClick={()=>handleView(item)} className="text-blue-400 hover:underline">View</button>
                                        <button onClick={()=>handleEdit(item)} className="text-yellow-400 hover:underline">Edit</button>
                                        <button onClick={()=>handleDelete(item)} className="text-red-400 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <Pagination
                        page={page}
                        totalPage={totalPage}
                        setPage={setPage}
                    />
                </div>
            </div>

            {/* VIEW MODAL */}
            {showView && selectedNews && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg w-[500px]">
                        <h2 className="font-bold text-lg mb-2">{selectedNews.title}</h2>
                        <p className="text-sm">{selectedNews.content}</p>
                        <button onClick={()=>setShowView(false)} className="mt-4 text-blue-500">Close</button>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEdit && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg w-[500px]">
                        <h2 className="font-bold mb-2">Edit News</h2>

                        <input
                            value={editTitle}
                            onChange={(e)=>setEditTitle(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <textarea
                            value={editContent}
                            onChange={(e)=>setEditContent(e.target.value)}
                            className="w-full border p-2 rounded h-32"
                        />

                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={submitEdit} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                            <button onClick={()=>setShowEdit(false)} className="text-gray-500">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {showDelete && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white text-black p-6 rounded-lg text-center">
                        <p>Delete this news?</p>
                        <div className="mt-4 flex justify-center gap-2">
                            <button onClick={submitDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            <button onClick={()=>setShowDelete(false)} className="text-gray-500">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </MainLayout>
    )
}

export default ManageNewsPage;