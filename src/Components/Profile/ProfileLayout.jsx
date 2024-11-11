import ProfileSideBar from "./SideBar/ProfileSideBar";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import ProfilePhoto from "./Header/ProfilePhoto";
import ProfileOutletSkeleton from "./ProfileOutletSkeleton";
import { profileContext } from "../../Context/ProfileContext";
import { BgHeader } from "../../assets/Backgrounds/BgHeader";

export default function ProfileLayout() {
  const { userProfileData } = useContext(profileContext);

  const outletRef = useRef(null);

  const scrollToOutlet = () => {
    outletRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="mx-4 mt-12 flex flex-col items-start gap-3 sm:flex-row-reverse md:mx-12 lg:mx-28">
        <div className="w-full sm:w-3/12 lg:w-1/5">
          <ProfileSideBar scrollToOutlet={scrollToOutlet} />
        </div>
        <div className="w-full sm:w-9/12 lg:w-4/5">
          <section className="relative overflow-hidden rounded-2xl bg-primary/85 bg-cover bg-no-repeat">
            <div className="absolute top-0 -z-10 w-full">
              <BgHeader />
            </div>
            <ProfilePhoto />
          </section>

          {!userProfileData ? (
            <ProfileOutletSkeleton />
          ) : (
            <div
              ref={outletRef}
              className="my-5 rounded-2xl bg-gray-100 p-5 shadow"
            >
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
