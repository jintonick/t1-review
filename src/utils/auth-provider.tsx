import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { saveTokens, removeTokens, getTokens } from "@app/utils/auth-token-utils";

interface AuthContextType {
  isAuth: boolean | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface RequiredAuthProps {
  children: ReactNode;
}

const authContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  return useContext(authContext);
};

const useProvideAuth = (): AuthContextType => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const login = async () => {
    try {
      const dummyToken = "dummy-jwt-token";
      saveTokens({ access_token: dummyToken });
      setIsAuth(true);
      return true;

      // Оставляем код для будущего использования
      /*
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);

      const response = await apiInstance.post("/api/auth/login", data.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data && response.data.access_token) {
        const tokens = saveTokens(response.data);
        setIsAuth(true);
        return true;
      } else {
        return false;
      }
      */
    } catch (error) {
      console.error("Ошибка входа:", error);
      return false;
    }
  };

  const logout = () => {
    removeTokens();
    setIsAuth(false);
  };

  useEffect(() => {
    const tokens = getTokens();
    if (tokens && tokens.access_token) {
      const currentTime = Date.now();
      if (tokens.expires_at > currentTime) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } else {
      setIsAuth(false);
    }
  }, []);

  return {
    isAuth,
    login,
    logout,
  };
};

const AuthProvider = ({ children }: RequiredAuthProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;








