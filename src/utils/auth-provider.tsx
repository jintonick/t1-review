import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import apiInstance from "@app/utils/auth-api.instanse";
import { saveTokens, removeTokens, getTokens, AuthTokens } from "@app/utils/auth-token-utils";

interface AuthContextType {
  isAuth: boolean | null;
  userType: "expert" | "client" | null;
  userId: string | null;
  sub: string | null;
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
  const [userType, setUserType] = useState<"expert" | "client" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [sub, setSub] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiInstance.post("/authenticate", {
        username: email,
        password: password,
      });

      if (response.data && response.data.token) {
        const tokens: AuthTokens = saveTokens({ access_token: response.data.token });
        setIsAuth(true);
        setUserType(tokens.userType);
        setUserId(tokens.userId);
        setSub(tokens.sub);

        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const logout = () => {
    removeTokens();
    setIsAuth(false);
    setUserType(null);
    setUserId(null);
    setSub(null);
  };

  useEffect(() => {
    const tokens = getTokens();
    console.log("Tokens from localStorage on init:", tokens);
    if (tokens && tokens.access_token) {
      setIsAuth(true);
      setUserType(tokens.userType);
      setUserId(tokens.userId);
      setSub(tokens.sub);
    } else {
      setIsAuth(false);
      setUserType(null);
      setUserId(null);
      setSub(null);
    }
  }, []);

  return {
    isAuth,
    userType,
    userId,
    sub,
    login,
    logout,
  };
};

const AuthProvider = ({ children }: RequiredAuthProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;











