import { useEffect, useState } from "react";

import { IconCalendarFilled } from "@tabler/icons-react";
import { Chip, Image, Skeleton } from "@nextui-org/react";

import { getJobImage } from "../../../utils/getJobImage";
import { BgHeader } from "../../../../assets/Backgrounds/BgHeader";

export default function Header({ userData }) {
  const headerImage = getJobImage(userData?.jobType);

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

  const messages = [
    "الفرص مستنياك، مستعد تكسب من شغلك؟",
    "مستنيين إبداعك، جاهز تبدأ؟",
    "يلا نبدأ ونوصل شغلك لأكبر عدد من الناس!",
    "الفرص بقت أقرب ليك، جاهز تبدأ؟",
    "دلوقتي وقتك تكسب من شطارتك!",
    "جاهز تقدم أفضل خدمة وتكبر شغلك؟",
    "مستنيين إبداعك يوصل لعدد أكبر!",
  ];

  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);
  }, []);

  return (
    <>
      {userData ? (
        <section
          dir="rtl"
          className="relative col-span-2 grid h-64 grid-cols-2 justify-items-center overflow-hidden rounded-2xl bg-primary/85 bg-cover bg-no-repeat max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1"
        >
          <div className="absolute top-0 -z-10 w-full bg-cover bg-center max-lg:w-[400%]">
            <BgHeader />
          </div>
          <article className="z-10 flex w-96 flex-col p-7 max-xl:w-80 max-lg:w-full max-lg:text-center">
            <Chip
              color="default"
              variant="light"
              className="bg-gray-800 px-2 max-sm:mx-auto"
              startContent={
                <IconCalendarFilled
                  width={22}
                  height={22}
                  className="text-gray-50"
                />
              }
            >
              <div className="flex gap-4 font-bold tracking-wider text-gray-50">
                <p>{date}</p>
                <p className="tracking-widest">{time}</p>
              </div>
            </Chip>
            <div className="mt-8 flex flex-col gap-4 max-md:mt-12">
              <h1 className="drop-sm text-5xl font-bold tracking-wider text-default-900">
                أهلا {userData?.firstName}!
              </h1>
              {userData?.role === "craftsman" ? (
                <p className="text-2xl font-medium text-default-900">
                  {randomMessage}
                </p>
              ) : (
                <h2 className="mt-2 text-center text-[1.6rem] font-medium text-gray-900">
                  محتاج خدمة ايه النهاردة؟
                </h2>
              )}
            </div>
          </article>
          {userData?.role === "craftsman" ? (
            <Image
              className="w-64"
              alt="صورة مقدم خدمة"
              src={headerImage}
              disableSkeleton
            />
          ) : (
            <Image
              className="relative -bottom-5 w-[35rem] xl:bottom-0"
              alt="صورة مقدم خدمة"
              src="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020436/Categories%20and%20Jobs/Khedma%20Website%20Images/flnnza4qogrcqhh0obpm.png"
              disableSkeleton
            />
          )}
        </section>
      ) : (
        <Skeleton className="relative col-span-2 grid h-64 grid-cols-2 justify-items-center overflow-hidden rounded-2xl bg-cover bg-no-repeat max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1"></Skeleton>
      )}
    </>
  );
}
