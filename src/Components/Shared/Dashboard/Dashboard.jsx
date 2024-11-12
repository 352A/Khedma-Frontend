import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionItem, Skeleton } from "@nextui-org/react";
import {
  IconLayoutListFilled,
  IconAlignBoxRightTopFilled,
  IconCash,
  IconPercentage,
} from "@tabler/icons-react";
import { authContext } from "../../../Context/AuthContext";
import { profileContext } from "../../../Context/ProfileContext";
import Header from "./Header/Header";
import Offers from "../Offers/Offers";
import Orders from "../Orders/Orders";
import DashboardSidebar from "./Components/DashboardSidebar";
import Reviews from "../Profile/Components/Reviews";
import DashboardCard from "./Components/DashboardCard";
import api from "../../utils/api";

export default function Dashboard() {
  const { token, bearerKey } = useContext(authContext);
  const { userProfileData } = useContext(profileContext);

  const craftsmanOffersEndPoint = `craftsman/offers`;
  const craftsmanOrdersEndPoint = `craftsman/orders`;
  const userOffersEndPoint = `user/offers`;
  const userOrdersEndPoint = `user/orders`;
  const userReviewsEndPoint = `user/allReviews`;
  const craftsmanReviewsEndPoint = `craftsman/reviews/allReviews`;

  const offersEndpoint =
    userProfileData?.role === "user"
      ? userOffersEndPoint
      : craftsmanOffersEndPoint;

  const ordersEndpoint =
    userProfileData?.role === "user"
      ? userOrdersEndPoint
      : craftsmanOrdersEndPoint;

  const reviewsEndpoint =
    userProfileData?.role === "user"
      ? userReviewsEndPoint
      : craftsmanReviewsEndPoint;

  const [allOffers, setAllOffers] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [allReviews, setAllReviews] = useState(null);

  async function getAllOffers() {
    const offerKey = userProfileData?.role === "user" ? "allOffers" : "offers";
    try {
      const { data } = await api.get(offersEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      console.log(data);
      setAllOffers(data[offerKey]);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllOrders() {
    try {
      const { data } = await api.get(ordersEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setAllOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  }

  async function getReviews() {
    try {
      const { data } = await api.get(reviewsEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setAllReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userProfileData) {
      getAllOffers();
      getAllOrders();
      getReviews();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [userProfileData]);

  return (
    <>
      <Helmet>
        <title> خدمة | الرئيسية </title>
      </Helmet>
      <section
        dir="rtl"
        className="mx-28 my-12 grid grid-cols-4 gap-4 max-xl:mx-12 max-lg:mx-2 max-lg:grid-cols-5 max-sm:my-4 max-sm:grid-cols-1"
      >
        <DashboardSidebar userData={userProfileData} />

        <article
          id="main"
          className="col-span-3 grid grid-cols-2 content-start gap-6 max-lg:order-1 max-lg:col-span-3 max-lg:flex max-lg:flex-col"
        >
          <Header userData={userProfileData} />

          {userProfileData?.role === "craftsman" && (
            <>
              <DashboardCard color="gray-800">
                <h2 className="text-[1.7rem] font-bold text-gray-200">
                  إجمالي الأرباح
                </h2>
                <p className="text-4xl font-bold text-primary">
                  {userProfileData.accountBalance} ج. م.
                </p>
                <IconCash className="absolute left-0 top-0 h-32 w-32 text-primary opacity-10" />
              </DashboardCard>
              <DashboardCard color="gray-800">
                <h2 className="text-[1.7rem] font-bold text-gray-200">
                  المديونية
                </h2>
                <p
                  className={`text-4xl font-bold ${userProfileData.accountDebt > 0 ? "text-danger" : "text-primary"}`}
                >
                  {userProfileData.accountDebt} ج. م.
                </p>
                <IconPercentage className="absolute left-0 top-0 h-32 w-32 text-primary opacity-10" />
              </DashboardCard>
            </>
          )}

          {allOrders ? (
            <Accordion
              variant="bordered"
              className="h-fit"
              aria-label="My Orders Section"
            >
              <AccordionItem
                key="1"
                aria-label="My Orders"
                startContent={<IconLayoutListFilled className="text-primary" />}
                title={<h5 className="text-center text-xl">الطلبات</h5>}
              >
                <Orders allOrders={allOrders} role={userProfileData?.role} />
              </AccordionItem>
            </Accordion>
          ) : (
            <Skeleton className="h-16 rounded-lg"></Skeleton>
          )}

          {allOffers ? (
            <Accordion
              variant="bordered"
              className="h-fit"
              aria-label="Offers Section"
            >
              <AccordionItem
                startContent={
                  <IconAlignBoxRightTopFilled className="text-primary" />
                }
                key="2"
                aria-label="Offers"
                title={<h5 className="text-center text-xl">العروض</h5>}
              >
                <Offers allOffers={allOffers} userData={userProfileData} />
              </AccordionItem>
            </Accordion>
          ) : (
            <Skeleton className="h-16 rounded-lg"></Skeleton>
          )}
          <div className="col-span-2">
            {allReviews ? (
              <Reviews reviews={allReviews} maxHeight="max-h-60" />
            ) : (
              <Skeleton className="h-32 rounded-lg"></Skeleton>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
