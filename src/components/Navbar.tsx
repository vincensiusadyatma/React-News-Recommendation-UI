import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
     
      <div className="text-xl font-bold">
        MyApp
      </div>

   
      <div className="space-x-4">
        <Link to="/" className="hover:text-indigo-200">Home</Link>
        <Link to="/" className="hover:text-indigo-200">Dashboard</Link>
        <Link to="/" className="hover:text-indigo-200">Login</Link>
        <Link to="/" className="hover:text-indigo-200">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
