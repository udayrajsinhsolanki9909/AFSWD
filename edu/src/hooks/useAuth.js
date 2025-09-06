import { useState } from "react";
import { fakeApi } from "../api/fakeapi";

export default function useAuth() {
    const [user, setUser] = useState(() => {
        try {
            const j = localStorage.getItem("edustream:user");
            return j ? JSON.parse(j) : null;
        } catch (e) {
            return null;
        }
    });

    const token = () => localStorage.getItem("edustream:token");

    const login = async (email, password) => {
        const res = await fakeApi.login(email, password);
        localStorage.setItem("edustream:token", res.token);
        localStorage.setItem("edustream:user", JSON.stringify(res.user));
        setUser(res.user);
        return res;
    };

    const logout = () => {
        localStorage.removeItem("edustream:token");
        localStorage.removeItem("edustream:user");
        setUser(null);
    };

    return { user, login, logout, token };
}
