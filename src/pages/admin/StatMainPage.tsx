import { useNavigate } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import { Logout, GetUsers } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

type UserType = {
  id: number;
  username: string;
};

type UserResponse = {
  users: UserType[];
  total_pages: number;
};

const StatMainPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    try {
      const result = await Logout();
      if (result.message === "logout success") {
        toast.success("Logout", {
          onClose: () => navigate("/auth/login"),
          autoClose: 1200,
        });
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data: UserResponse = await GetUsers(page, 20, query);
        setUsers(data.users || []);
        setTotalPage(data.total_pages || 1);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, [page, query]);

  const handleView = (id: number) => {
    navigate(`/admin/stat/details/${id}`);
  };

  return (
    <MainLayout func={handleLogout}>
      <ToastContainer />

      <div className="max-w-2xl mx-auto mt-8 text-white">

        <h1 className="text-base font-semibold mb-3">
          Users
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
          className="w-full mb-3 px-3 py-2 bg-transparent border border-white/20 rounded text-sm outline-none"
        />

        {/* LIST */}
        <div className="border border-white/10 rounded">

          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center px-3 py-2 border-b border-white/10 last:border-none"
            >
              <div>
                <div className="text-sm">{user.username}</div>
                <div className="text-xs text-gray-400">
                  ID: {user.id}
                </div>
              </div>

              <button
                onClick={() => handleView(user.id)}
                className="text-xs text-blue-400 hover:underline"
              >
                View
              </button>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center text-gray-400 py-5 text-sm">
              No users
            </div>
          )}

        </div>

        {/* PAGINATION */}
        <div className="mt-3">
          <Pagination
            page={page}
            totalPage={totalPage}
            setPage={setPage}
          />
        </div>

      </div>
    </MainLayout>
  );
};

export default StatMainPage;