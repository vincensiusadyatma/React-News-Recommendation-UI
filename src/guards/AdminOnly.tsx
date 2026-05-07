import { Navigate, Outlet } from "react-router";

import CheckAdmin from "../utils/CheckAdmin";

const AdminOnly = () => {
    if (CheckAdmin() == "true") {
         return(
            <Outlet/>
        )
    }else{
        return(
            <Navigate to="/auth/login"/>
        )
    }
   

}
export default AdminOnly