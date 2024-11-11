import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { profileContext } from "../../Context/ProfileContext";
import { authContext } from "../../Context/AuthContext";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react";

import { Link as RouterLink } from "react-router-dom";
import api from "../utils/api";

const userEndPoint = "auth/logout";
const craftsmanEndPoint = "auth/craftsman/logout";

export default function DropDown() {
  const { userProfileData, setUserProfileData } = useContext(profileContext);
  const { setToken, accountType, token, bearerKey } = useContext(authContext);
  const navigate = useNavigate();
  const endPoint =
    accountType === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const profilePic = userProfileData?.profilePic;

  async function signOut() {
    try {
      const res = await api.patch(
        endPoint,
        {},
        {
          headers: {
            authorization: `${bearerKey}${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignOut = () => {
    signOut();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setToken(null);
    setUserProfileData(null);
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              size: "md",
              src: profilePic,
              color: "primary",
              showFallback: true,
            }}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection showDivider>
            <DropdownItem
              isReadOnly
              key="greeting"
              className="h-14 cursor-default gap-2"
              textValue="greeting"
            >
              <p className="font-bold">
                {userProfileData?.firstName} {userProfileData?.lastName}
              </p>
              <p className="font-bold text-primary">
                @{userProfileData?.username}
              </p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem textValue="profile" key="profile">
              <RouterLink to="profile"> الصفحة الشخصية</RouterLink>
            </DropdownItem>
            <DropdownItem textValue="billing" key="billing">
              الرصيد
            </DropdownItem>
            <DropdownItem textValue="configuration" key="configurations">
              <RouterLink to="profile/setting"> الاعدادات</RouterLink>
            </DropdownItem>
            <DropdownItem textValue="help" key="help">
              <RouterLink to="contact-us"> طلب مساعدة</RouterLink>
            </DropdownItem>
            <DropdownItem
              textValue="logout"
              key="logout"
              color="danger"
              className="text-danger"
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
