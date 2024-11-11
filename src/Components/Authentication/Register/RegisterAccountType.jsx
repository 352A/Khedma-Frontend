import { authContext } from "../../../Context/AuthContext";
import { useContext, useEffect } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@nextui-org/react";
import { IconSearch, IconBriefcase2 } from "@tabler/icons-react";

export default function RegisterAccountType() {
  const { setAccountType } = useContext(authContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>خدمة | انشاء حساب جديد </title>
      </Helmet>
      <div className="bg-gray-100 bg-cover bg-no-repeat px-5 py-10 sm:p-20">
        <div className="m-auto text-center sm:mb-40 sm:mt-20">
          <h2 className="mt-10 text-xl font-bold sm:text-3xl">
            انضم كعميل أو مستقل
          </h2>
          <div className="my-14 flex flex-row-reverse justify-center gap-x-2 sm:gap-x-10">
            <Button
              as={RouterLink}
              variant="solid"
              to="/register-form"
              radius="full"
              className="bg-primary px-4 py-3 text-xs font-bold text-white sm:px-8 sm:py-10 sm:text-xl"
              onClick={() => setAccountType("craftsman")}
            >
              <IconBriefcase2 stroke={2} />
              أنا مقدم خدمة
            </Button>
            <Button
              as={RouterLink}
              variant="solid"
              to="/register-form"
              radius="full"
              className="bg-white px-4 py-3 text-xs font-bold sm:px-8 sm:py-10 sm:text-xl"
              onClick={() => setAccountType("user")}
            >
              <IconSearch stroke={2} />
              أنا أبحث عن خدمة
            </Button>
          </div>
          <p className="font-bold">
            لديك حساب بالفعل ؟
            <Link to="/login">
              <span className="text-primary underline"> سجل الدخول </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
