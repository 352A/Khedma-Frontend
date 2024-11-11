import { useDisclosure } from "@nextui-org/react";

import Actions from "./Components/Actions";
import Details from "./Components/Details";
import OfferModal from "./RequestOfferModal";
import WorkArea from "./Components/WorkArea";
import Stars from "../../Services/Craftsmen/Stars";

export default function Sidebar({ userData }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <article
      id="sidebar"
      className="max-lg:order-2 max-lg:col-span-2 max-sm:order-1"
    >
      <div className="relative flex flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-6 pb-7 pt-7 shadow-sm max-md:w-full">
        <Details userData={userData} />
        <Stars rating={userData?.averageRating} />
        {userData.role === "craftsman" && (
          <>
            <Actions onOpen={onOpen} />
            <OfferModal
              userData={userData}
              isOpen={isOpen}
              onClose={onClose}
              onOpenChange={onOpenChange}
            />
          </>
        )}
      </div>
      <div>
        {userData?.role === "craftsman" && <WorkArea userData={userData} />}
      </div>
    </article>
  );
}
