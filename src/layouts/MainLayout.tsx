import Navbar from "../components/Navbar";
import type { PropsType } from "../Types/PropsType";

const MainLayout = ({children, func}: PropsType) => {
 return (
    <div className="min-h-screen flex flex-col bg-[#020a1a]">
      <Navbar func={func}/>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
