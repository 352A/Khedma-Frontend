import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { ThreeDots } from "react-loader-spinner";
import { authContext } from "../../../Context/AuthContext";
import { Helmet } from "react-helmet-async";
import { Button } from "@nextui-org/react";
import { IconMail } from "@tabler/icons-react";
import { Input } from "@nextui-org/react";

const userEndPoint = "auth/sendForgetCode";
const craftsmanEndPoint = "auth/craftsman/sendForgetCode";

export default function ForgetCode() {
  const { accountType } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const endPoint =
    accountType === "craftsman" ? craftsmanEndPoint : userEndPoint;

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co)$/,
        "يرجى إدخال بريد إلكتروني صحيح ",
      ),
  });

  function handleSuccessResponse() {
    toast.success("تم ارسال الرمز الي بريدك الالكتروني بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/reset-password");
    }, 3000);
  }

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      if (err.response.data.message === "خطأ التحقق, من فضلك راجع البيانات") {
        errorMessage = "البريد الاكتروني  غير صحيح";
      } else {
        errorMessage = err.response.data.message;
      }
    } else if (err.request) {
      errorMessage =
        " خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى لاحقًا.";
    } else {
      errorMessage = ".حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا";
    }
    toast.error(`${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      await api.patch(endPoint, values);

      handleSuccessResponse();
    } catch (err) {
      handleErrorResponse(err);
    }
    setIsLoading(false);
  }

  const resetCodeFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>خدمة | نسيت كلمة السر</title>
      </Helmet>

      <div className="bg-gray-100 bg-cover bg-center bg-no-repeat p-5 sm:p-7">
        <div className="my-20 bg-secondary p-5 shadow-lg sm:m-auto sm:my-40 sm:w-2/3 sm:rounded-2xl lg:w-1/2">
          <h2 className="mb-8 mt-3 font-bold md:text-xl">استعادة كلمة السر</h2>

          <form onSubmit={resetCodeFormik.handleSubmit} className="text-sm">
            <div className="my-3">
              <label className="mb-2 block text-primary">
                البريد الالكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="البريد الالكتروني"
                variant="flat"
                color={
                  resetCodeFormik.touched.email && resetCodeFormik.errors.email
                    ? "danger"
                    : ""
                }
                isInvalid={
                  resetCodeFormik.touched.email && resetCodeFormik.errors.email
                }
                errorMessage={resetCodeFormik.errors.email}
                endContent={<IconMail color="#4CAF50" stroke={2} />}
                {...resetCodeFormik.getFieldProps("email")}
              />
            </div>

            <div className="my-4">
              <Button
                type="submit"
                disabled={isLoading}
                radius="full"
                className="w-full bg-primary px-6 py-2 text-white"
              >
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="25"
                    width="35"
                    color="#fff"
                    radius="14"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  "ارسال الكود"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
