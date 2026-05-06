import { useNavigate } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import { Logout } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { GetUsers } from "../../services/AuthService";

type UserType = {
    id: number;
    username: string;
};

const StatMainPage = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const [inputQuery, setInputQuery] = useState("");
    const [query, setQuery] = useState("");

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [showView, setShowView] = useState(false);

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

    const fetchUsers = useCallback(async () => {
        try {
            let data;

            if (query.trim() === "") {
                data = await GetUsers(page, 20);
            } else {
                data = await GetUsers(page, 20, query);
            }

            setUsers(data?.users || []);
            setTotalPage(data?.total_pages || 1);
        } catch (error) {
            console.log(error);
        }
    }, [page, query]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleView = (user: UserType) => {
        setSelectedUser(user);
        setShowView(true);
    };

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
                                <th className="p-4 border border-white/10 text-left">Username</th>
                                <th className="p-4 border border-white/10 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/10 transition">
                                    <td className="p-4 border border-white/10">{user.id}</td>
                                    <td className="p-4 border border-white/10">{user.username}</td>

                                    <td className="p-4 border border-white/10 text-right">
                                        <button
                                            onClick={() => handleView(user)}
                                            className="text-blue-400 hover:text-blue-300 transition"
                                        >
                                            {/* ICON MATA */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 inline"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                                                       c4.477 0 8.268 2.943 9.542 7
                                                       -1.274 4.057-5.065 7-9.542 7
                                                       -4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="mt-4">
                    <Pagination
                        page={page}
                        totalPage={totalPage}
                        setPage={setPage}
                    />
                </div>
            </div>

            {/* ================= MODAL VIEW ================= */}
            {showView && selectedUser && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-md bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

                        {/* HEADER */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                            <h2 className="text-lg font-semibold">
                                User Detail
                            </h2>
                            <button
                                onClick={() => setShowView(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="px-6 py-4 space-y-3">
                            <div>
                                <p className="text-gray-400 text-sm">ID</p>
                                <p className="font-medium">{selectedUser.id}</p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm">Username</p>
                                <p className="font-medium">{selectedUser.username}</p>
                            </div>
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

        </MainLayout>
    );
};

export default StatMainPage;