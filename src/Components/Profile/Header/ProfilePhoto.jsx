import { useContext, useRef, useState } from "react";
import femaleProfilePicture from "../../../assets/Images/blank-profile-picture-female.jpg";
import maleProfilePicture from "../../../assets/Images/blank-profile-picture-male.jpg";
import { profileContext } from "../../../Context/ProfileContext";
import { authContext } from "../../../Context/AuthContext";
import api from "../../utils/api";
import { ThreeDots } from "react-loader-spinner";
import ProfilePhotoSkeleton from "./ProfilePhotoSkeleton";
import { toast } from "react-toastify";
import {
  IconUserFilled,
  IconMapPinFilled,
  IconDeviceMobileFilled,
  IconPlus,
} from "@tabler/icons-react";

const userEndPoint = "user/profilePicture";
const craftsmanEndPoint = "craftsman/profilePicture";

export default function ProfilePhoto() {
  const { token, bearerKey } = useContext(authContext);
  const { userProfileData, getUserProfileData } = useContext(profileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const avatar = userProfileData?.profilePic
    ? userProfileData.profilePic
    : userProfileData?.gender === "female"
      ? femaleProfilePicture
      : maleProfilePicture;

  const endPoint =
    userProfileData?.role === "user" ? userEndPoint : craftsmanEndPoint;

  const inputRef = useRef(null);

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      errorMessage = err.response.data.message;
    } else if (err.request) {
      errorMessage =
        " خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى لاحقًا.";
    } else {
      errorMessage = ".حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا";
    }
    toast.error(`${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setPreview(null);
  }

  function handleSuccessResponse() {
    toast.success(" تم تغيير الصورة الشخصية بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleIconClick = () => {
    inputRef.current.click();
  };

  async function updateUserProfilePicture(formData) {
    setIsLoading(true);
    try {
      await api.patch(endPoint, formData, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse();
      getUserProfileData();
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectImg(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error(`برجاء رفع صوره شخصية صحيحة`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      const reader = new FileReader();

      reader.onloadend = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      updateUserProfilePicture(formData);

      e.target.value = null;
    }
  }

  return (
    <>
      {!userProfileData ? (
        <ProfilePhotoSkeleton />
      ) : (
        <>
          <div className="py-4 text-gray-800">
            {isLoading ? (
              <div className="m-auto flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-1 border-gray-100 sm:h-[150px] sm:w-[150px]">
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#ddd"
                  radius="16"
                  ariaLabel="three-dots-loading"
                />
              </div>
            ) : (
              <figure className="group relative m-auto flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-3 border-gray-100 sm:h-[150px] sm:w-[150px]">
                <img
                  src={preview || avatar}
                  alt="profile picture"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-10 flex w-full translate-y-full items-center justify-center bg-secondary opacity-50 transition duration-200 group-hover:translate-y-0">
                  <IconPlus
                    stroke={2}
                    size={50}
                    className="cursor-pointer"
                    onClick={handleIconClick}
                  />

                  <input
                    ref={inputRef}
                    type="file"
                    id="uploadAvatar"
                    onChange={handleSelectImg}
                    accept="image/*"
                    aria-label="upload"
                    hidden
                  />
                </div>
              </figure>
            )}
            <div className="my-3 flex flex-col items-center gap-4">
              <p className="text-2xl font-bold text-gray-800">{`${userProfileData?.firstName} ${userProfileData?.lastName}`}</p>
              <div className="flex flex-row-reverse items-center justify-center gap-4 text-sm">
                <div className="flex gap-x-1">
                  {userProfileData?.role === "user" ? "عميل" : "مقدم خدمة"}
                  <IconUserFilled className="text-gray-800" size={20} />
                </div>
                <div className="flex gap-x-1">
                  {userProfileData?.phone}
                  <IconDeviceMobileFilled className="text-gray-800" size={20} />
                </div>
                <div className="flex gap-x-1">
                  {userProfileData?.city}
                  <IconMapPinFilled className="text-gray-800" size={20} />
                </div>
              </div>

              {userProfileData?.role === "craftsman" &&
                (userProfileData?.careerDescription ? (
                  <p className="m-auto mt-4 w-5/6 rounded-lg px-8 text-center text-white">
                    {userProfileData?.careerDescription}
                  </p>
                ) : (
                  <p className="m-auto mt-4 w-5/6 rounded-lg px-8 text-center leading-8 text-white">
                    لا يوجد وصف
                    <br />
                    يمكنك اضافة وصف لطبيعة عملك من خلال تعديل بياناتك
                  </p>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
