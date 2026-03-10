import { FaNewspaper, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import type { PropsType } from "../Types/PropsType";

const Navbar = ({func}:PropsType) => {
  const username = "Vincen";

  return (
    <nav className="bg-[#030f26] text-white px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-md">
      
      <div className="flex items-center gap-2 text-xl font-semibold">
        <FaNewspaper className="text-white text-2xl" />
        <span>NewsRecomenders</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <FaUserCircle className="text-xl text-gray-300" />
          <span className="text-gray-200">{username}</span>
        </div>
        <button onClick={func} className=" cursor-pointer flex items-center gap-2 border border-white px-3 py-1.5 rounded-md text-sm hover:bg-white/10 transition">
          <FaSignOutAlt className="text-white" />
          <span className="text-white">Logout</span>
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;