import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [accountType, setAccountType] = useState("craftsman");
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const bearerKey = import.meta.env.VITE_BEARER_KEY;

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      setToken(cookieToken);
      getUserData(cookieToken);
    }
  }, []);

  function getUserData(currentToken) {
    try {
      const decodedData = jwtDecode(currentToken);
      Cookies.set("role", decodedData.role, {
        sameSite: "Strict",
        secure: true,
      });
      setUserData(decodedData);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  function setAuthToken(newToken) {
    setToken(newToken);
    Cookies.set("token", newToken, { sameSite: "None", secure: true });
    getUserData(newToken);
  }

  return (
    <authContext.Provider
      value={{
        token,
        setAuthToken,
        userData,
        accountType,
        setAccountType,
        bearerKey,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
