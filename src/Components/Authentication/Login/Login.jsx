import { Helmet } from "react-helmet-async";
import LoginTabs from "./LoginTabs";
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext";

export default function Login() {
  const { accountType } = useContext(authContext);
  return (
    <>
      <Helmet>
        <title>خدمة | تسجيل الدخول </title>
      </Helmet>
      <div className="m-auto flex-row-reverse overflow-hidden shadow-lg sm:my-20 sm:flex sm:w-11/12 sm:rounded-2xl lg:w-4/6">
        <div className="w-full bg-secondary sm:w-1/2">
          <LoginTabs />
        </div>
        <img
          src={
            accountType === "user"
              ? "https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020425/Categories%20and%20Jobs/Khedma%20Website%20Images/jj4lm5ek3ruxczbesfg8.jpg"
              : "https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020422/Categories%20and%20Jobs/Khedma%20Website%20Images/zjbrkwtzkplfi9cghg0x.jpg"
          }
          alt="khedma craftsman"
          className="w-full object-cover sm:w-1/2"
        />
      </div>
    </>
  );
}
