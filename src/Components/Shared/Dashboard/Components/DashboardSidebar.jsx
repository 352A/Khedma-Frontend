import Details from "../../Profile/Components/Details";
import WorkArea from "../../Profile/Components/WorkArea";
import ContactDetails from "../../Profile/Components/ContactDetails";
import Stars from "../../Profile/Components/Stars";
import { Skeleton } from "@nextui-org/react";

export default function DashboardSidebar({ userData }) {
  return (
    <>
      {userData ? (
        <article
          id="sidebar"
          className="max-lg:order-2 max-lg:col-span-2 max-sm:hidden"
        >
          <div className="relative flex flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-6 pb-7 pt-7 shadow-sm max-md:w-full">
            <Details userData={userData} />
            <Stars rating={userData?.averageRating} />
          </div>
          <div>
            <ContactDetails userData={userData} />

            {userData?.role === "craftsman" && <WorkArea userData={userData} />}
          </div>
        </article>
      ) : (
        <article
          id="sidebar"
          className="max-lg:order-2 max-lg:col-span-2 max-sm:hidden"
        >
          <div>
            <Skeleton className="relative mb-2 flex h-96 flex-col gap-4 rounded-xl px-6 pb-7 pt-7 shadow-sm max-md:w-full"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-72 rounded-lg"></Skeleton>
            <Skeleton className="mt-2 h-72 rounded-lg"></Skeleton>
          </div>
        </article>
      )}
    </>
  );
}
