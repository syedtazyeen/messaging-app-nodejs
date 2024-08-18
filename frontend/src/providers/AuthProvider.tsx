import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useScreen } from "./ScreenProvider";
import { User } from "../types";
import axiosInstance from "../api";

interface AuthContextType {
    user: User | undefined;
    token: string | undefined;
    error: string | undefined;
    isLoading: boolean;
    login: (form: { email: string; password: string }) => Promise<void>;
    signup: (form: { email: string; password: string, username: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { currentScreen, changeScreen } = useScreen();

    useEffect(() => {
        setError(undefined);
    }, [currentScreen])


    useEffect(() => {
        setToken(localStorage.getItem('token') || undefined);
    }, [])

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/user/me')
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            fetchUser();
            changeScreen("home");
        } else {
            changeScreen("login")
            setUser(undefined);
        };
    }, [token]);

    const login = async (form: { email: string; password: string }) => {
        try {
            setError(undefined);
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/login", form);
            setToken(response.data.data.token);
            localStorage.setItem('token', response.data.data.token);
            window.location.reload();
        } catch (error: any) {
            const msg = error.response?.data?.error || error.response?.data?.message || "Login failed"
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (form: { email: string; password: string }) => {
        try {
            setError(undefined);
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/signup", form);
            if (response.status !== 200) throw Error('Login failed');
            changeScreen('login');
        } catch (error: any) {
            const msg = error.response?.data?.error || error.response?.data?.message || "Login failed"
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, error, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
