import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import User from "../../Models/User";
import { getCurrentUser } from "../../Services/api";
import { login as apiLogin, logout as apiLogout } from "../../Services/api";
import { clearToken, saveToken } from "../../Utilities/tokenStore";
import { useToast } from "@chakra-ui/react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});

function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        getCurrentUser().then((userData) => {
            setUser(userData.user);
        });
    }, []);
    const toast = useToast();

    const login = useCallback(({ email, password }: LoginCredentials) => {
        apiLogin({ email, password })
            .then((data) => {
                saveToken(data.accessToken);
                const userData = data.user as User;
                setUser(userData);
            })
            .catch((error) => {
                toast({
                    title: "Login failed",
                    description: error.message,
                    status: "error",
                });
            });
    }, []);
    const logout = useCallback(() => {
        apiLogout();
        setUser(null);
        clearToken();
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user, login, logout]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
