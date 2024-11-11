import { useContext, useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Button } from "@nextui-org/react";
import { IconUserSearch } from "@tabler/icons-react";

import { authContext } from "../../../Context/AuthContext";
import DetailsSkeleton from "../Profile/Components/DetailsSkeleton";
import Details from "../Profile/Components/Details";
import WorkArea from "../Profile/Components/WorkArea";
import OfferForm from "./OfferForm";

export default function OfferDetailsPage() {
  const { offerID } = useParams();
  const { token, bearerKey, userData } = useContext(authContext);
  const craftsmanendPoint = `craftsman/offers/${offerID}`;
  const userendPoint = `user/offers/${offerID}/getOffer`;
  const endPoint = userData?.role === "user" ? userendPoint : craftsmanendPoint;
  const [offerDetails, setOfferDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getofferDetails() {
    setIsLoading(true);
    try {
      const { data } = await api.get(endPoint, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      if (userData.role === "user") {
        setOfferDetails(data.myOffer);
      } else {
        setOfferDetails(data.offer);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getofferDetails();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [token]);

  return (
    <>
      <Helmet>
        <title> خدمة | تفاصيل العرض</title>
      </Helmet>
      {!isLoading && offerDetails ? (
        <div
          dir="rtl"
          className="flex justify-center gap-6 max-md:flex-col max-md:px-4 md:mx-16 md:my-12 md:gap-12 lg:mx-2"
        >
          {userData.role === "craftsman" ? (
            <section className="flex flex-col gap-2 align-middle">
              <div className="relative mx-auto flex w-full flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-8 pb-7 shadow-sm">
                <Details userData={offerDetails?.userDetails} />
                <Button
                  as={RouterLink}
                  to={`/profile-details/${offerDetails?.userDetails?._id}`}
                  color="primary"
                  variant="solid"
                  className="text-md mt-4 bg-gray-200 text-black"
                >
                  <IconUserSearch size={25} />
                  زيارة الملف الشخصي
                </Button>
              </div>
            </section>
          ) : (
            <section className="flex flex-col gap-2 align-middle">
              <div className="relative mx-auto flex w-full flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-8 pb-7 pt-7 shadow-sm">
                <Details userData={offerDetails?.craftsmanDetails} />
                <Button
                  as={RouterLink}
                  to={`/profile-details/${offerDetails?.craftsmanDetails?._id}`}
                  color="primary"
                  variant="solid"
                  className="text-md mt-4 bg-gray-200 text-black"
                >
                  <IconUserSearch size={25} />
                  زيارة الملف الشخصي
                </Button>
              </div>

              <WorkArea userData={offerDetails?.craftsmanDetails} />
            </section>
          )}

          <div className="flex w-full flex-col gap-8 md:w-3/5">
            <OfferForm
              offerDetails={offerDetails}
              offerID={offerID}
              getofferDetails={getofferDetails}
            />
          </div>
        </div>
      ) : (
        <DetailsSkeleton />
      )}
    </>
  );
}
