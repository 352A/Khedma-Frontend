import api from "../../utils/api";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Reviews from "./Components/Reviews";
import Bio from "./Components/Bio";
import { Helmet } from "react-helmet-async";
import DetailsSkeleton from "./Components/DetailsSkeleton";
import { authContext } from "../../../Context/AuthContext";
import Portfolio from "./Components/Portfolio/Portfolio";

export default function Profile() {
  const { id } = useParams();
  const { token, bearerKey, userData } = useContext(authContext);

  const portfolioEndPoint = `craftsman/portfolio/craftsmanId/${id}`;
  const profileEndPoint = `user/${id}/profile`;
  const userReviewsEndPoint = `admin/reviews/user/${id}`;
  const craftsmanReviewsEndPoint = `admin/reviews/craftsman/${id}`;
  const reviewsEndPoint =
    userData?.role === "user" ? craftsmanReviewsEndPoint : userReviewsEndPoint;
  const [profileDetails, setProfileDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  async function getProfileDetails() {
    try {
      const { data } = await api.get(profileEndPoint);
      setProfileDetails(data.existingUser);
    } catch (err) {
      console.log(err);
    }
  }

  async function getReviews() {
    try {
      const { data } = await api.get(reviewsEndPoint);
      setReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPortfolio() {
    try {
      const { data } = await api.get(portfolioEndPoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setPortfolio(data.portfolio);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userData) {
      getProfileDetails();
      getReviews();
      getPortfolio();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [userData]);

  return (
    <>
      <Helmet>
        <title> خدمة | ملف مقدم خدمة</title>
      </Helmet>
      {profileDetails && reviews && portfolio ? (
        <section
          dir="rtl"
          className="mx-28 my-12 grid grid-cols-4 gap-4 max-xl:mx-12 max-lg:mx-2 max-lg:grid-cols-5 max-sm:my-4 max-sm:grid-cols-1"
        >
          {userData.role === "user" ? (
            <Sidebar userData={profileDetails} />
          ) : (
            <Sidebar userData={profileDetails} />
          )}
          <article
            id="main"
            className="col-span-3 grid content-start gap-6 max-lg:col-span-3 max-lg:flex max-lg:flex-col max-sm:order-2"
          >
            {userData.role === "user" && (
              <>
                <Bio userData={profileDetails} />
                {portfolio.length > 0 && <Portfolio portfolio={portfolio} />}
              </>
            )}
            <Reviews reviews={reviews} maxHeight="max-h-80" />
          </article>
        </section>
      ) : (
        <DetailsSkeleton />
      )}
    </>
  );
}
