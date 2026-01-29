import { checkAuth } from "../utils/checkAuth"
import { Navigate, Outlet } from "react-router"

const AuthOnly = () => {
    if (!checkAuth()) {
        return <Navigate to="/auth/login" replace />
    }else{
        return (
            <>
                <Outlet />
            </>
        )
    }
}

export default AuthOnly;