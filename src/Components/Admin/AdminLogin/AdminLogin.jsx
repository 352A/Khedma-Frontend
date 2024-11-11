import { Helmet } from "react-helmet-async";
import LoginForm from "./LoginForm";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";

function AdminLogin() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>خدمة | تسجيل دخول الادمن </title>
      </Helmet>
      <div className="relative min-h-screen overflow-hidden bg-gray-800 max-md:px-2 max-md:py-6">
        <div className="absolute -left-20 -top-10 h-52 w-52 animate-float rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 opacity-10 blur-xl"></div>
        <div
          className="to-blue-500 absolute h-56 w-56 animate-float rounded-full bg-gradient-to-r from-green-500 opacity-25 blur-xl delay-100"
          style={{ top: "40%", left: "40%" }}
        ></div>
        <div
          className="absolute h-56 w-56 animate-float rounded-full bg-gradient-to-r from-teal-500 to-orange-300 opacity-25 blur-xl delay-150"
          style={{
            top: "32%",
            left: "49%",
          }}
        ></div>
        <div className="mx-auto flex-row-reverse overflow-hidden rounded-2xl shadow-md sm:my-36 sm:flex sm:w-8/12 lg:w-2/6">
          <div className="w-full">
            <Card isBlurred className="rounded-2xl bg-gray-50/5 shadow-sm">
              <CardBody className="overflow-hidden text-right">
                <LoginForm />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
