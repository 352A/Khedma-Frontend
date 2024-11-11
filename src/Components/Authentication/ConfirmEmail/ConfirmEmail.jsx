import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

export default function ConfirmEmail() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>خدمة | تأكيد الحساب</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat p-10">
        <div className="m-auto text-center sm:mb-44 sm:mt-16 sm:p-10">
          <h2 className="my-10 text-2xl font-extrabold sm:text-3xl">
            أهلا بيك في <span className="text-primary">خدمة</span>
          </h2>
          <p className="my-10 text-xl sm:text-xl">
            الرجاء التحقق من بريدك الالكتروني و تأكيد حسابك
          </p>
          <Button
            as={RouterLink}
            variant="solid"
            to="/login"
            radius="full"
            className="w-1/2 bg-primary px-10 py-3 font-bold text-white sm:w-1/3"
          >
            التالي
          </Button>
        </div>
      </div>
    </>
  );
}
