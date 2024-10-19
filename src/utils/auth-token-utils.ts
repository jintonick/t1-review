import {jwtDecode} from "jwt-decode";
export interface AuthTokens {
  access_token: string;
  expires_at: number;
}

export const getTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  return tokens ? JSON.parse(tokens) : null;
};

export const saveTokens = (tokens: { access_token: string }): AuthTokens => {
  let expires_at = Date.now() + 3600 * 1000; // По умолчанию токен истекает через 1 час
  try {
    const decoded: { exp: number } = jwtDecode(tokens.access_token);
    expires_at = decoded.exp * 1000; // Преобразуем в миллисекунды
  } catch {
    console.warn("Не удалось декодировать JWT токен, используется время истечения по умолчанию");
  }
  const tokensWithExpiry: AuthTokens = { ...tokens, expires_at };
  localStorage.setItem("REACT_TOKEN_AUTH_KEY", JSON.stringify(tokensWithExpiry));
  return tokensWithExpiry;
};

export const removeTokens = () => {
  localStorage.removeItem("REACT_TOKEN_AUTH_KEY");
};


