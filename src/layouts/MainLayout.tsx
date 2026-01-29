import Navbar from "../components/Navbar";
import type { PropsType } from "../Types/PropsType";

const MainLayout = ({children}: PropsType) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        Footer
      </footer>
    </div>
  );
};

export default MainLayout;
