import { createContext, useContext, useEffect, useState } from "react";
import api from "../Components/utils/api";
import { authContext } from "./AuthContext";

export const profileContext = createContext();
const userEndPoint = "user/profile";
const craftsmanEndPoint = "craftsman/profile";
const adminEndPoint = "admin/profile";

export default function ProfileContextProvider({ children }) {
  const { userData, token, bearerKey } = useContext(authContext);
  const [userProfileData, setUserProfileData] = useState(null);

  const endPoint =
    userData?.role === "user"
      ? userEndPoint
      : userData?.role === "rootAdmin" || userData?.role === "subAdmin"
        ? adminEndPoint
        : craftsmanEndPoint;

  async function getUserProfileData() {
    try {
      const response = await api.get(endPoint, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      setUserProfileData(response.data.user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getUserProfileData();
    }
  }, [token]);

  return (
    <profileContext.Provider
      value={{ userProfileData, getUserProfileData, setUserProfileData }}
    >
      {children}
    </profileContext.Provider>
  );
}
