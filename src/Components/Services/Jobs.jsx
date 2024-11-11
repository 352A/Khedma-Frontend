import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { IconArrowBackUp } from "@tabler/icons-react";

import ServiceCard from "./JobCard";
import { categories } from "../../constants/categories";

export default function Jobs() {
  const { category } = useParams();
  const navigate = useNavigate();

  const currentCategory = categories.find((cat) => cat.catName === category);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    if (!currentCategory) {
      navigate("/404");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentCategory, navigate]);

  return (
    <>
      <Helmet>
        <title> خدمة | الخدمات</title>
      </Helmet>
      <div className="m-16">
        <h1 className="text-center text-3xl font-bold text-primary">
          {category}
        </h1>
      </div>
      {/* <Button
        isIconOnly
        onClick={handleBackClick}
        className="absolute left-28 top-28 max-md:hidden"
        color="primary"
      >
        <IconArrowBackUp />
      </Button> */}
      <div
        dir="rtl"
        className="mx-52 my-12 grid grid-cols-1 items-center justify-center justify-items-center gap-12 md:grid-cols-2 md:gap-x-24 lg:grid-cols-3 xl:grid-cols-4"
      >
        {currentCategory ? (
          currentCategory.jobs.map((job, index) => (
            <ServiceCard
              key={index}
              title={job.title}
              imgSrc={job.img}
              description={job.description}
            />
          ))
        ) : (
          <p className="text-center text-3xl">هذة الخدمة غير متاحة</p>
        )}
      </div>
    </>
  );
}
