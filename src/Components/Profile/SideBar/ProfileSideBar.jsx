import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { profileContext } from "../../../Context/ProfileContext";
import ProfileSideBarSkeleton from "./ProfileSideBarSkeleton";
import {
  IconUserFilled,
  IconCircleCheckFilled,
  IconSettingsFilled,
  IconHeartFilled,
  IconPhotoHeart,
} from "@tabler/icons-react";

export default function ProfileSideBar({ scrollToOutlet }) {
  const { userProfileData } = useContext(profileContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const handleAction = (key) => {
    setActive(key);
    navigate(key);
    scrollToOutlet();
  };

  return (
    <>
      {!userProfileData ? (
        <ProfileSideBarSkeleton />
      ) : (
        <ListboxWrapper>
          <Listbox aria-label="Actions" onAction={(key) => handleAction(key)}>
            <ListboxItem
              key="/profile"
              className={`my-1 p-2 ${active === "/profile" ? "bg-primary text-white" : ""}`}
              textValue="بيانات المستخدم"
            >
              بيانات المستخدم
              <IconUserFilled
                stroke={2}
                size={20}
                className="ms-1 inline-block"
              />
            </ListboxItem>

            {userProfileData?.role === "craftsman" && (
              <ListboxItem
                key="verify-account"
                className={`my-1 p-2 ${active === "verify-account" || active === "/profile/verify-account" ? "bg-primary text-white" : ""}`}
                textValue="توثيق الحساب"
              >
                توثيق الحساب
                <IconCircleCheckFilled
                  stroke={2}
                  size={20}
                  className="ms-1 inline-block"
                />
              </ListboxItem>
            )}
            {userProfileData?.role === "craftsman" && (
              <ListboxItem
                key="gallery"
                className={`my-1 p-2 ${active === "gallery" || active === "/profile/gallery" ? "bg-primary text-white" : ""}`}
                textValue="معرض الأعمال"
              >
                معرض الأعمال
                <IconPhotoHeart
                  stroke={2}
                  size={20}
                  className="ms-1 inline-block"
                />
              </ListboxItem>
            )}

            <ListboxItem
              key="setting"
              className={`my-1 p-2 ${active === "setting" || active === "/profile/setting" ? "bg-primary text-white" : ""}`}
              textValue="اعدادات الحساب"
            >
              اعدادات الحساب
              <IconSettingsFilled
                stroke={2}
                size={20}
                className="ms-1 inline-block"
              />
            </ListboxItem>

            <ListboxItem
              key="wishlist"
              className={`my-1 p-2 ${active === "wishlist" || active === "/profile/wishlist" ? "bg-primary text-white" : ""}`}
              textValue="المفضلة"
            >
              المفضلة
              <IconHeartFilled
                stroke={2}
                size={20}
                className="ms-1 inline-block"
              />
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      )}
    </>
  );
}
