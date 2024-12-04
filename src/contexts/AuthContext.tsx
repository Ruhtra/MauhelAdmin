import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

interface AuthContextType {
  token: string | null;
  id: string;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (newToken: string) => {
    setLoading(true);
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      if (!decoded.id) throw new Error("Token does not contain id");

      setToken(newToken);
      setId(decoded.id);
      localStorage.setItem("authToken", newToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setId("");
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("authToken");

      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (storedToken) await login(storedToken);

      setLoading(false);
    };

    initializeAuth();
  }, [login]);

  return (
    <AuthContext.Provider value={{ token, id, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
