import { checkAuth } from "../utils/checkAuth"
import { Navigate, Outlet } from "react-router"

const GuestOnly = () => {
    if (checkAuth()) {
        return <Navigate to="/register" replace />
    }else{
        return (
            <>
                <Outlet />
            </>
        )
    }
}

export default GuestOnly;