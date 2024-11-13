import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  roles?: string;
  userId: string;
  sub: string;
}

export interface AuthTokens {
  access_token: string;
  userType: "expert" | "client" | null;
  userId: string;
  sub: string;
}

export const getTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  if (tokens) {
    try {
      return JSON.parse(tokens);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveTokens = (tokens: { access_token: string }): AuthTokens => {
  let userType: "expert" | "client" | null = null;
  let userId: string = "";
  let sub: string = "";

  try {
    const decoded = jwtDecode<DecodedToken>(tokens.access_token);
    console.log("Decoded token:", decoded);
    if (decoded.roles) {
      if (decoded.roles === "ROLE_EXPERT") {
        userType = "expert";
      } else if (decoded.roles === "ROLE_USER") {
        userType = "client";
      }
    }
    if (decoded.userId) {
      userId = decoded.userId;
    }
    if (decoded.sub) {
      sub = decoded.sub;
    }
  } catch (error) {
    console.warn("Failed to decode JWT token", error);
  }

  const tokensWithUserType: AuthTokens = { ...tokens, userType, userId, sub };
  localStorage.setItem("REACT_TOKEN_AUTH_KEY", JSON.stringify(tokensWithUserType));
  return tokensWithUserType;
};

export const removeTokens = () => {
  localStorage.removeItem("REACT_TOKEN_AUTH_KEY");
};


