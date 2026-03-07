import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router";
import {Register} from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import Loading from "../components/Loading";

const RegisterPage = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await Register(username,password)
            if(response?.status === "success"){
                setLoading(false)
                toast.success("Register Successfully",{onClose: ()=>{
                    navigate("/auth/login")
                },autoClose:1500},)
             }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, {
                    autoClose: 1500
                })
            }
        }finally{
            setLoading(false)
        }
       
    }
    
    return(
        <AuthLayout>
            <ToastContainer/>
           <Loading isLoading={loading}/>
            <div className="flex flex-col px-6 py-12 lg:px-8">
                <div id="header-auth">
                    <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-white">Register Form</h2>
                </div>
                <div id="form-auth" className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="" className="space-y-6">
                        <div>
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-100">Username</label>
                            <div>
                                <input type="text" value={username} 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                onChange={(e)=>{
                                    setUsername(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-100">Password</label>
                            <div>
                                <input type="password" value={password} 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                />
                            </div>
                        </div>

                        <button type="submit" onClick={(e)=>{
                            e.preventDefault();
                            handleSubmit()
                        }} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Have An Account? 
                        <Link to={"/auth/login"} className=" ms-2 font-semibold text-indigo-400 hover:text-indigo-300">Register</Link>
                        
                    </p>
                </div>
            </div>
        </AuthLayout>
       
    )
}

export default RegisterPage;