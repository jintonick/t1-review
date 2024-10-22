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
  userType: "expert" | "client" | "user" | null;
  login: (
      email: string,
      password: string,
      userType: "expert" | "client" | "user" | null
  ) => Promise<boolean>;
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
  const [userType, setUserType] = useState<"expert" | "client" | "user" | null>(null);

  const login = async (
    email: string,
    password: string,
    userType: "expert" | "client" | "user" | null
  ) => {
    if (!userType) {
      console.error("User type not selected");
      return false;
    }
    try {
      const dummyToken = "dummy-jwt-token";
      saveTokens({ access_token: dummyToken });
      setIsAuth(true);
      setUserType(userType);
      localStorage.setItem("userType", userType);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    removeTokens();
    localStorage.removeItem("userType");
    setIsAuth(false);
    setUserType(null);
  };

  useEffect(() => {
    const tokens = getTokens();
    if (tokens && tokens.access_token) {
      const currentTime = Date.now();
      if (tokens.expires_at > currentTime) {
        setIsAuth(true);
        const storedUserType = localStorage.getItem("userType") as
            | "expert"
            | "client"
            | "user"
            | null;
        setUserType(storedUserType);
      } else {
        setIsAuth(false);
      }
    } else {
      setIsAuth(false);
    }
  }, []);

  return {
    isAuth,
    userType,
    login,
    logout,
  };
};

const AuthProvider = ({ children }: RequiredAuthProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;









