import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({ children }) {
  const [accountType, setAccountType] = useState("craftsman");
  const [token, setToken] = useState(null);
  const [userData, setuserData] = useState(null);
  const bearerKey = import.meta.env.VITE_BEARER_KEY;

  useEffect(() => {
    const storageToken = sessionStorage.getItem("token");
    if (storageToken != null) {
      setToken(storageToken);
      getUserData();
    }
  }, []);

  function getUserData() {
    const userData = jwtDecode(sessionStorage.getItem("token"));
    sessionStorage.setItem("role", userData.role);
    setuserData(userData);
  }

  return (
    <authContext.Provider
      value={{
        token,
        setToken,
        userData,
        getUserData,
        accountType,
        setAccountType,
        bearerKey,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
