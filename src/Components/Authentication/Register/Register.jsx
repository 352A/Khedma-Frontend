import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext";

export default function Register() {
  const { accountType } = useContext(authContext);
  return (
    <>
      <Helmet>
        <title>خدمة | انشاء حساب جديد </title>
      </Helmet>

      <div className="min-h-screen flex-row-reverse overflow-hidden sm:flex">
        <div className="w-full p-5 sm:w-4/6 md:w-4/5">
          <RegisterForm />
        </div>
        <img
          src={
            accountType === "user"
              ? "https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020432/Categories%20and%20Jobs/Khedma%20Website%20Images/qmcmp3x86aced5o04kkv.jpg"
              : "https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020433/Categories%20and%20Jobs/Khedma%20Website%20Images/eohmzm0bzsne4dmdex85.jpg"
          }
          alt="khedma team"
          className="hidden w-full object-cover sm:block sm:w-2/6 md:w-1/5"
        />
      </div>
    </>
  );
}
