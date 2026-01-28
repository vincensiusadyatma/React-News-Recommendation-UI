import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router";

const RegisterPage = () => {
    return(
        <AuthLayout>
            <div className="flex flex-col px-6 py-12 lg:px-8">
                <div id="header-auth">
                    <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-white">Register Form</h2>
                </div>
                <div id="form-auth" className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="" className="space-y-6">
                        <div>
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-100">Username</label>
                            <div>
                                <input type="text" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"/>
                            </div>
                        </div>
                
                        <div>
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-100">Password</label>
                            <div>
                                <input type="password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Have An Account? 
                        <Link to={"/auth/login"} className=" ms-2 font-semibold text-indigo-400 hover:text-indigo-300">Login</Link>
                        
                    </p>
                </div>
            </div>
        </AuthLayout>
       
    )
}

export default RegisterPage;