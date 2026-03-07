import { Navigate, Outlet } from "react-router";

import CheckAuth from "../utils/CheckAuth";

const AuthOnly = () => {
    if (CheckAuth() == "true") {
         return(
            <Outlet/>
        )
    }else{
        return(
            <Navigate to="/auth/login"/>
        )
    }
   

}
export default AuthOnly