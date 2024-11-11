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
import { Input } from "@nextui-org/react";
import {
  IconMail,
  IconEye,
  IconEyeOff,
  IconLock,
  IconRepeat,
  IconCircleDashedCheck,
} from "@tabler/icons-react";

const userEndPoint = "auth/resetPassword";
const craftsmanEndPoint = "auth/craftsman/resetPassword";

export default function ResetPassword() {
  const { accountType } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const endPoint =
    accountType === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const initialValues = {
    email: "",
    forgetCode: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co)$/,
        "يرجى إدخال بريد إلكتروني صحيح ",
      ),
    forgetCode: Yup.string()
      .required("رمز إعادة التعيين مطلوب")
      .length(6, "يجب أن يكون رمز إعادة التعيين مكونًا من 6 أحرف "),
    password: Yup.string()
      .required("كلمة السر مطلوبة")
      .matches(
        /^[A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]+$/,
        "يجب أن تحتوي كلمة السر على أحرف إنجليزية فقط",
      )
      .min(6, "يجب أن تحتوي كلمة السر على 6 أحرف على الأقل")
      .max(11, "يجب أن لا تتجاوز كلمة السر 11 حرفًا")
      .matches(/(?=.*\d)/, "يجب أن تحتوي كلمة السر على رقم واحد على الأقل")
      .matches(
        /(?=.*[A-Z])/,
        "يجب أن تحتوي كلمة السر على حرف كبير واحد على الأقل",
      )
      .matches(
        /(?=.*[a-z])/,
        "يجب أن تحتوي كلمة السر على حرف صغير واحد على الأقل",
      )
      .matches(
        /(?=.[!@#$%^&()\-_=+{};:,<.>])/,
        "يجب أن تحتوي كلمة السر على رمز خاص واحد على الأقل",
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمتا السر غير متطابقتين")
      .required("تأكيد كلمة السر مطلوب"),
  });

  function handleSuccessResponse() {
    toast.success("تم تغيير كلمة السر بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/login");
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

  const resetPasswordFormik = useFormik({
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
        <title>خدمة | اعادة تعيين كلمة السر</title>
      </Helmet>
      <div className="bg-gray-100 bg-cover bg-center bg-no-repeat p-5 sm:p-8">
        <div className="my-5 bg-secondary p-5 shadow-lg sm:m-auto sm:my-12 sm:w-2/3 sm:rounded-2xl lg:w-1/2">
          <h2 className="mb-8 mt-3 font-bold md:text-xl">استعادة كلمة السر</h2>

          <form onSubmit={resetPasswordFormik.handleSubmit} className="text-sm">
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
                  resetPasswordFormik.touched.email &&
                  resetPasswordFormik.errors.email
                    ? "danger"
                    : ""
                }
                isInvalid={
                  resetPasswordFormik.touched.email &&
                  resetPasswordFormik.errors.email
                }
                errorMessage={resetPasswordFormik.errors.email}
                endContent={<IconMail color="#4CAF50" stroke={2} />}
                {...resetPasswordFormik.getFieldProps("email")}
              />
            </div>

            <div className="my-3">
              <label className="mb-2 block text-primary">الكود</label>
              <Input
                id="code"
                type="text"
                placeholder="ادخل الكود"
                variant="flat"
                color={
                  resetPasswordFormik.touched.forgetCode &&
                  resetPasswordFormik.errors.forgetCode
                    ? "danger"
                    : ""
                }
                isInvalid={
                  resetPasswordFormik.touched.forgetCode &&
                  resetPasswordFormik.errors.forgetCode
                }
                errorMessage={resetPasswordFormik.errors.forgetCode}
                endContent={
                  <IconCircleDashedCheck color="#4CAF50" stroke={2} />
                }
                {...resetPasswordFormik.getFieldProps("forgetCode")}
              />
            </div>

            <div className="my-3">
              <label className="mb-2 block text-primary">كلمة السر</label>
              <Input
                id="password"
                variant="flat"
                placeholder="كلمة السر"
                color={
                  resetPasswordFormik.touched.password &&
                  resetPasswordFormik.errors.password
                    ? "danger"
                    : ""
                }
                isInvalid={
                  resetPasswordFormik.touched.password &&
                  resetPasswordFormik.errors.password
                }
                errorMessage={resetPasswordFormik.errors.password}
                {...resetPasswordFormik.getFieldProps("password")}
                startContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityPassword}
                    aria-label="toggle password visibility"
                  >
                    {isVisiblePassword ? (
                      <IconEyeOff size={20} color="#4CAF50" stroke={2} />
                    ) : (
                      <IconEye size={20} color="#4CAF50" stroke={2} />
                    )}
                  </button>
                }
                type={isVisiblePassword ? "text" : "password"}
                endContent={<IconLock color="#4CAF50" stroke={2} />}
              />
            </div>

            <div className="my-3">
              <label className="mb-2 block text-primary">اعادة كلمة السر</label>
              <Input
                id="confirmPassword"
                variant="flat"
                placeholder="اعادة كلمة السر "
                color={
                  resetPasswordFormik.touched.confirmPassword &&
                  resetPasswordFormik.errors.confirmPassword
                    ? "danger"
                    : ""
                }
                isInvalid={
                  resetPasswordFormik.touched.confirmPassword &&
                  resetPasswordFormik.errors.confirmPassword
                }
                errorMessage={resetPasswordFormik.errors.confirmPassword}
                {...resetPasswordFormik.getFieldProps("confirmPassword")}
                startContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityConfirmPassword}
                    aria-label="toggle password visibility"
                  >
                    {isVisibleConfirmPassword ? (
                      <IconEyeOff size={20} color="#4CAF50" stroke={2} />
                    ) : (
                      <IconEye size={20} color="#4CAF50" stroke={2} />
                    )}
                  </button>
                }
                type={isVisibleConfirmPassword ? "text" : "password"}
                endContent={<IconRepeat color="#4CAF50" stroke={2} />}
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
                  "دخول"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
