import { useContext } from "react";

import { IconCalendarFilled } from "@tabler/icons-react";
import { Chip, Image, Skeleton } from "@nextui-org/react";

import { profileContext } from "../../../../Context/ProfileContext";

export default function AdminHeader({ color, span }) {
  const { userProfileData } = useContext(profileContext);

  const today = new Date();
  const date = today.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = today.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {userProfileData ? (
        <section
          dir="rtl"
          className={`relative col-span-${span} grid h-64 animate-gradient grid-cols-2 justify-items-center overflow-hidden rounded-2xl bg-gradient-animation bg-400% bg-${color} bg-no-repeat shadow-sm transition-transform delay-75 duration-300 ease-in-out hover:scale-105 max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1`}
        >
          {/* <div className="absolute bottom-0 w-full bg-cover bg-center opacity-25 max-lg:w-[400%]">
            <BgHero />
          </div> */}
          <article className="z-10 flex w-96 flex-col p-7 max-xl:w-80 max-lg:w-full max-lg:text-center">
            <Chip
              color="default"
              variant="light"
              className="bg-gray-100 px-2 max-sm:mx-auto"
              startContent={
                <IconCalendarFilled
                  width={22}
                  height={22}
                  className="text-gray-800"
                />
              }
            >
              <div className="flex gap-4 font-bold tracking-wider text-gray-800">
                <p>{date}</p>
                <p className="tracking-widest">{time}</p>
              </div>
            </Chip>
            <div className="mt-8 flex flex-col gap-4 max-md:mt-12">
              <h1 className="drop-sm text-5xl font-bold tracking-wider">
                أهلا {userProfileData?.firstName}!
              </h1>
              <p className="text-xl">
                أهلاً وسهلاً في لوحة التحكم، معاك كل حاجة تحت السيطرة!
              </p>
            </div>
          </article>
          <Image
            className="relative -bottom-5 w-[15rem] xl:bottom-0"
            alt="صورة مقدم خدمة"
            src="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056669/Categories%20and%20Jobs/Jobs/wk12zry3dmmsdrgbwep9.png"
            disableSkeleton
          />
        </section>
      ) : (
        <Skeleton className="relative col-span-3 grid h-64 grid-cols-2 justify-items-center overflow-hidden rounded-2xl bg-cover bg-no-repeat max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1"></Skeleton>
      )}
    </>
  );
}
