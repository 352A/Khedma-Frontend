import { useContext } from "react";

import { profileContext } from "../../../Context/ProfileContext";

import { User } from "@nextui-org/react";

function AdminInfo() {
  const { userProfileData } = useContext(profileContext);
  const profilePic = userProfileData?.profilePic;

  return (
    <div
      dir="rtl"
      className="flex justify-center gap-2 rounded-3xl bg-slate-700/25 py-2 shadow-2xl backdrop-blur-lg"
    >
      <User
        as="button"
        avatarProps={{
          isBordered: true,
          size: "md",
          src: profilePic,
          color: "default",
          showFallback: true,
        }}
        className="transition-transform"
      />
      <div>
        <h1 className="mt-2 text-lg text-slate-100">
          أهلا {userProfileData?.firstName}!
        </h1>
        <p className="text-gray-400">{userProfileData?.username}@</p>
      </div>
    </div>
  );
}

export default AdminInfo;
