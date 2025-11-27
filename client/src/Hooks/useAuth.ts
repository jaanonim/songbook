import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";

function useAuth() {
    const { user, login, logout } = useContext(AuthContext);
    return { user, login, logout, isLoggedIn: () => user !== null };
}

export default useAuth;
