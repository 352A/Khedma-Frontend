import { Helmet } from "react-helmet-async";
import LoginForm from "./LoginForm";
import { Card, CardBody } from "@nextui-org/react";

function CSLogin() {
  return (
    <>
      <Helmet>
        <title>خدمة | تسجيل دعم العملاء </title>
      </Helmet>

      <div className="m-auto flex-row-reverse overflow-hidden rounded-2xl shadow-md sm:my-20 sm:flex sm:w-11/12 lg:w-2/6">
        <div className="w-full bg-secondary">
          <Card className="rounded-none bg-secondary shadow-none">
            <CardBody className="overflow-hidden text-right">
              <LoginForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CSLogin;
