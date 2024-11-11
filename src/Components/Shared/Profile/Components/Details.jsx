import { useLocation } from "react-router-dom";
import { Avatar, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import {
  IconMapPinFilled,
  IconRosetteDiscountCheck,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import formatDate from "../../../utils/formatDate";
import CategoryIcon from "../Components/CategoryIcon";

export default function Details({ userData }) {
  const lastOnline = formatDate(userData?.lastOnline);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div>
      {userData ? (
        <>
          {userData?.role === "craftsman" && (
            <div className="flex justify-between align-middle">
              <div className="text-md flex w-fit gap-2 rounded-3xl text-right text-sm font-bold">
                <CategoryIcon
                  width={25}
                  height={25}
                  category={userData?.jobCategory}
                  className="rounded-full bg-gray-200 p-1 text-gray-800"
                />
                <h1 className="text-gray-200">{userData?.jobCategory}</h1>
              </div>

              {userData.role === "craftsman" && userData.verified ? (
                <Tooltip
                  color="primary"
                  content={isDashboard ? "تم تفعيل حسابك" : "حساب موثق"}
                >
                  <IconRosetteDiscountCheckFilled
                    height={25}
                    width={25}
                    className="text-primary"
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  color="warning"
                  content={
                    isDashboard
                      ? "برجاء تفعيل حسابك من صفحتك الشخصية"
                      : "حساب غير موثق"
                  }
                >
                  <IconRosetteDiscountCheck
                    height={25}
                    width={25}
                    className="text-warning"
                  />
                </Tooltip>
              )}
            </div>
          )}
          <div className="relative">
            <Avatar
              src={userData?.profilePic}
              className="mx-auto mt-4 h-44 w-44 border-4 border-gray-200 text-center text-large"
            />

            <Chip
              size="sm"
              color={userData?.status === "online" ? "primary" : "danger"}
              variant="dot"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 transform border-gray-200 bg-gray-200 font-bold text-gray-800"
            >
              {userData?.status === "online"
                ? "متصل"
                : `اخر اتصال ${lastOnline}`}
            </Chip>
          </div>
          <div className="mt-3 flex flex-col gap-[0.4rem]">
            <h2 className="text-center text-2xl font-semibold text-gray-200">{`${userData?.firstName} ${userData?.lastName} `}</h2>

            {userData?.role === "craftsman" && (
              <Chip
                variant="solid"
                color="primary"
                className="mx-auto mt-3 text-center text-sm font-bold"
              >
                {userData?.jobType}
              </Chip>
            )}

            <div className="mx-auto mt-2 flex justify-center gap-1">
              <IconMapPinFilled
                width={15}
                height={15}
                className="my-auto text-gray-200"
              />
              <h1 className="text-md font-medium text-gray-50">
                {userData?.city}
              </h1>
            </div>
          </div>
        </>
      ) : (
        <Skeleton className="relative mb-2 flex h-44 flex-col gap-4 rounded-xl px-6 pb-7 pt-7 shadow-sm max-md:w-full"></Skeleton>
      )}
    </div>
  );
}
