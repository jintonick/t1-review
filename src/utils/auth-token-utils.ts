import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  roles?: string;
}

export interface AuthTokens {
  access_token: string;
  userType: "expert" | "client" | null;
}

export const getTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  if (tokens) {
    try {
      return JSON.parse(tokens);
    } catch (error) {
      console.error("Error parsing tokens from localStorage", error);
      return null;
    }
  }
  return null;
};

export const saveTokens = (tokens: { access_token: string }): AuthTokens => {
  let userType: "expert" | "client" | null = null;

  try {
    const decoded = jwtDecode<DecodedToken>(tokens.access_token);
    console.log("Decoded token:", decoded);
    if (decoded.roles) {
      if (decoded.roles === "EXPERT") {
        userType = "expert";
      } else if (decoded.roles === "USER") {
        userType = "client";
      }
    }
  } catch (error) {
    console.warn("Failed to decode JWT token", error);
  }

  const tokensWithUserType: AuthTokens = { ...tokens, userType };
  console.log("Tokens with userType:", tokensWithUserType);
  localStorage.setItem("REACT_TOKEN_AUTH_KEY", JSON.stringify(tokensWithUserType));
  return tokensWithUserType;
};

export const removeTokens = () => {
  localStorage.removeItem("REACT_TOKEN_AUTH_KEY");
};


