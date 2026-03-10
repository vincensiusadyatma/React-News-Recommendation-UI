import { useNavigate } from "react-router";
import NewsCard from "../components/NewsCard";
import MainLayout from "../layouts/MainLayout";
import { Logout } from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';


const MainPage = () => {
    const navigate = useNavigate()
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
    }
    return (
        <MainLayout func={handleLogout}>
            <ToastContainer />
            <div>
                <NewsCard/>
            </div>
        </MainLayout>

    )
}
    

export default MainPage;