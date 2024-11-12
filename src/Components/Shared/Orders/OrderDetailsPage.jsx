import { useParams, Link as RouterLink } from "react-router-dom";
import { authContext } from "../../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { Helmet } from "react-helmet-async";
import DetailsSkeleton from "../Profile/Components/DetailsSkeleton";
import Details from "../Profile/Components/Details";
import OrderForm from "./OrderForm";
import ContactDetails from "../Profile/Components/ContactDetails";
import WorkArea from "../Profile/Components/WorkArea";
import { Button } from "@nextui-org/react";
import { IconUserSearch } from "@tabler/icons-react";

export default function OrderDetailsPage() {
  const { token, bearerKey, userData } = useContext(authContext);
  const { orderID } = useParams();
  const craftsmanendPoint = `craftsman/orders/${orderID}`;
  const userendPoint = `user/orders/${orderID}`;
  const endPoint = userData?.role === "user" ? userendPoint : craftsmanendPoint;
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getOrderDetails() {
    setIsLoading(true);
    try {
      const { data } = await api.get(endPoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setOrderDetails(data.order);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getOrderDetails();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [token]);

  return (
    <>
      <Helmet>
        <title> خدمة | تفاصيل الطلب</title>
      </Helmet>
      {!isLoading && orderDetails ? (
        <div
          dir="rtl"
          className="flex justify-center gap-6 max-md:flex-col max-md:px-4 md:mx-16 md:my-12 md:gap-12 lg:mx-2"
        >
          <section className="flex flex-col gap-2 align-middle">
            {userData.role === "user" ? (
              <>
                <div className="relative mx-auto flex w-full flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-8 pb-7 pt-4 shadow-sm">
                  <Details userData={orderDetails?.craftsmanDetails} />
                  <Button
                    as={RouterLink}
                    to={`/profile-details/${orderDetails?.craftsmanDetails?._id}`}
                    color="primary"
                    variant="solid"
                    className="text-md mt-4 bg-gray-200 text-black"
                  >
                    <IconUserSearch size={25} />
                    زيارة الملف الشخصي
                  </Button>
                </div>
                <ContactDetails userData={orderDetails?.craftsmanDetails} />
                <WorkArea userData={orderDetails?.craftsmanDetails} />
              </>
            ) : (
              <>
                <div className="relative mx-auto flex w-full flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-8 pb-7 pt-4 shadow-sm">
                  <Details userData={orderDetails?.userDetails} />
                  <Button
                    as={RouterLink}
                    to={`/profile-details/${orderDetails?.userDetails?._id}`}
                    color="primary"
                    variant="solid"
                    className="text-md mt-4 bg-gray-200 text-black"
                  >
                    <IconUserSearch size={25} />
                    زيارة الملف الشخصي
                  </Button>
                </div>
                <ContactDetails userData={orderDetails?.userDetails} />
              </>
            )}
          </section>
          <div className="flex w-full flex-col gap-8 md:w-3/5">
            <OrderForm
              orderDetails={orderDetails}
              orderID={orderID}
              getOrderDetails={getOrderDetails}
            />
          </div>
        </div>
      ) : (
        <DetailsSkeleton />
      )}
    </>
  );
}
