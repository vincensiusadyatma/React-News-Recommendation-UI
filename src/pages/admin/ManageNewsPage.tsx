import { useNavigate } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import { Logout } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import {
    GetNews,
    UpdateNews,
    DeleteNews,
    CreateNews
} from "../../services/NewsService";
import type { NewsType } from "../../Types/NewsType";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const ManageNewsPage = () => {
    const navigate = useNavigate();

    const [news, setNews] = useState<NewsType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [inputQuery, setInputQuery] = useState("");
    const [query, setQuery] = useState("");

    const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const handleSearch = () => {
        setQuery(inputQuery);
        setPage(1);
    };

    const handleLogout = async () => {
        try {
            const result = await Logout();
            if (result.message === "logout success") {
                toast.success("Logout Successfully", {
                    onClose: () => navigate("/auth/login"),
                    autoClose: 1500,
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

   const fetchNews = useCallback(async () => {
        try {
            let data;

            if (query.trim() === "") {
                data = await GetNews(page, 6);
            } else {
                data = await GetNews(page, 6, query);
            }

            setNews(data?.news || []);
            setTotalPage(data?.total_pages || 1);
        } catch (error) {
            console.log(error);
        }
    }, [page, query]);


    const handleView = (item: NewsType) => {
        setSelectedNews(item);
        setShowView(true);
    };

    const handleEdit = (item: NewsType) => {
        setSelectedNews(item);
        setEditTitle(item.title);
        setEditContent(item.content);
        setShowEdit(true);
    };

    const handleDelete = (item: NewsType) => {
        setSelectedNews(item);
        setShowDelete(true);
    };

    const submitEdit = async () => {
        if (!selectedNews?.id) return;

        try {
            await UpdateNews(selectedNews.id, editTitle, editContent);
            toast.success("Updated");
            setShowEdit(false);
            fetchNews();
        } catch {
            toast.error("Gagal update");
        }
    };

    const submitDelete = async () => {
        if (!selectedNews?.id) return;

        try {
            await DeleteNews(selectedNews.id);
            toast.success("Deleted");
            setShowDelete(false);
            fetchNews();
        } catch {
            toast.error("Gagal delete");
        }
    };

    const handleCreate = async () => {
        try {
            if (!newTitle || !newContent) {
                toast.error("Title & Content wajib diisi");
                return;
            }

            await CreateNews(newTitle, newContent);

            toast.success("Berhasil tambah berita");
            setShowCreate(false);
            setNewTitle("");
            setNewContent("");

            fetchNews();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal create");
        }
    };

    useEffect(() => {
        const loadNews = async () => {
            try {
                let data;

                if (query.trim() === "") {
                    data = await GetNews(page, 6);
                } else {
                    data = await GetNews(page, 6, query);
                }

                setNews(data?.news || []);
                setTotalPage(data?.total_pages || 1);
            } catch (error) {
                console.log(error);
            }
        };

        loadNews();
    }, [page, query]);

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
                        <thead className="bg-white/10">
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
                                        <button onClick={() => handleView(item)} className="text-blue-400">View</button>
                                        <button onClick={() => handleEdit(item)} className="text-yellow-400">Edit</button>
                                        <button onClick={() => handleDelete(item)} className="text-red-400">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="mt-4">
                    <Pagination page={page} totalPage={totalPage} setPage={setPage} />
                </div>
            </div>

            <button
            onClick={() => setShowCreate(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
                />
            </svg>
            </button>

           {/* ================= MODALS ================= */}
            {/* VIEW */}
            {showView && selectedNews && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                
                <div className="w-full max-w-xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                
                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold">
                    Detail News
                    </h2>
                    <button 
                    onClick={() => setShowView(false)}
                    className="text-gray-400 hover:text-white transition"
                    >
                    ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                    <h3 className="font-bold text-xl mb-3">
                    {selectedNews.title}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {selectedNews.content}
                    </p>
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t border-white/10 flex justify-end">
                    <button 
                    onClick={() => setShowView(false)}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
                    >
                    Close
                    </button>
                </div>

                </div>
            </div>
            )}


            {/* EDIT */}
            {showEdit && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                <div className="w-full max-w-xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold">
                    Edit News
                    </h2>
                    <button 
                    onClick={() => setShowEdit(false)}
                    className="text-gray-400 hover:text-white"
                    >
                    ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">

                    <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Content"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-2">

                    <button
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={submitEdit}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
                    >
                    Save
                    </button>

                </div>

                </div>
            </div>
            )}


            {/* DELETE */}
            {showDelete && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                <div className="w-full max-w-sm bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                {/* HEADER */}
                <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-center">
                    Confirm Delete
                    </h2>
                </div>

                {/* BODY */}
                <div className="px-6 py-4 text-center text-gray-300">
                    Are you sure you want to delete this news?
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t border-white/10 flex justify-center gap-3">

                    <button
                    onClick={() => setShowDelete(false)}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={submitDelete}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                    >
                    Delete
                    </button>

                </div>

                </div>
            </div>
            )}


            {/* CREATE */}
            {showCreate && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                <div className="w-full max-w-xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold">
                    Create News
                    </h2>
                    <button 
                    onClick={() => setShowCreate(false)}
                    className="text-gray-400 hover:text-white"
                    >
                    ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">

                    <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Content"
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-2">

                    <button
                    onClick={() => setShowCreate(false)}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={handleCreate}
                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
                    >
                    Create
                    </button>

                </div>

                </div>
            </div>
        )}
        </MainLayout>
    );
};

export default ManageNewsPage;