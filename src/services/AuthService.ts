import ApiConfig from "../config/ApiConfig"
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";

const Register = async (username: string, password: string) => {
    try {
        const res = await fetch(ApiConfig.BASE_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) throw new Error("Login gagal");

        return await res.json();

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};
const Login = async (username: string, password: string) => {
    try {
        const res = await fetch(ApiConfig.BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", 
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!res.ok) {
            let message = "Login gagal";

            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch {
                // kosong
            }

            throw new Error(message);
        }

        const data = await res.json();

        sessionStorage.setItem("isLogin", "true");

        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};

const Logout = async () => {
    try {
        const res = await fetch(ApiConfig.BASE_URL + "/logout", {
            method: "POST",
            credentials: "include" 
        });

        if (!res.ok) {
            let message = "Logout gagal";

            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch {
                // kosong
            }

            throw new Error(message);
        }

        const data = await res.json();

        sessionStorage.setItem("isLogin", "false");

        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};

const GetProfile = async () => {
    try {
        const res = await fetch(ApiConfig.BASE_URL + "/profile", {
            method: "GET",
            credentials: "include" 
        });

        if (!res.ok) {
            let message = "Get Profile gagal";

            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch {
                // kosong
            }

            throw new Error(message);
        }

        const data = await res.json();
        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};

const GetUsers = async (
  page: number = 1,
  perPage: number = 20,
  search: string = ""
) => {
  try {
    const url = new URL(`${ApiConfig.BASE_URL}/users`);

    url.searchParams.append("page", String(page));
    url.searchParams.append("per_page", String(perPage));

    if (search.trim() !== "") {
      url.searchParams.append("search", search);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Get Users gagal");
    }

    return await res.json();
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Error");
  }
};

export {Login, Register, Logout, GetProfile, GetUsers}