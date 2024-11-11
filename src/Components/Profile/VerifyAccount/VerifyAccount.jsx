import { Helmet } from "react-helmet-async";
import Verified from "./Verified";
import { useContext } from "react";
import { profileContext } from "../../../Context/ProfileContext";
import Unverified from "./Unverified";

export default function VerifyAccount() {
  const { userProfileData } = useContext(profileContext);

  return (
    <>
      <Helmet>
        <title>خدمة | توثيق الحساب</title>
      </Helmet>
      <div>
        <h2 className="mb-8 text-xl font-semibold text-gray-600">
          توثيق الحساب
        </h2>
        {userProfileData?.verified ? <Verified /> : <Unverified />}
      </div>
    </>
  );
}
