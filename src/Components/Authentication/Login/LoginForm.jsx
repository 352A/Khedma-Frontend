import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { ThreeDots } from "react-loader-spinner";
import { authContext } from "../../../Context/AuthContext";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { IconMail, IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";

const userEndPoint = "auth/login";
const craftsmanEndPoint = "auth/craftsman/login";

// eslint-disable-next-line react/prop-types
export default function LoginForm({ onClose = () => {} }) {
  const { getUserData, setToken, accountType } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const endPoint =
    accountType === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co)$/,
        "يرجى إدخال بريد إلكتروني صحيح ",
      ),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  function handleSuccessResponse() {
    navigate("/dashboard");
    onClose();
  }

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      if (err.response.data.message === "خطأ التحقق, من فضلك راجع البيانات") {
        errorMessage = "البريد الاكتروني او كلمة السر غير صحيحة";
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
      const { data } = await api.post(endPoint, values);
      sessionStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      getUserData();
      handleSuccessResponse();
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const loginFormik = useFormik({
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
      <div className="p-3">
        <h2 className="mb-8 mt-3 font-bold md:text-xl">
          {accountType === "craftsman"
            ? "تسجيل دخول مقدمي الخدمات"
            : "تسجيل دخول العملاء"}
        </h2>

        <form onSubmit={loginFormik.handleSubmit} className="text-sm">
          <div className="my-3">
            <label className="mb-2 block text-primary">البريد الالكتروني</label>
            <Input
              id="email"
              type="email"
              placeholder="البريد الالكتروني"
              variant="flat"
              color={
                loginFormik.touched.email && loginFormik.errors.email
                  ? "danger"
                  : ""
              }
              isInvalid={loginFormik.touched.email && loginFormik.errors.email}
              errorMessage={loginFormik.errors.email}
              endContent={<IconMail color="#4CAF50" stroke={2} />}
              {...loginFormik.getFieldProps("email")}
            />
          </div>

          <div className="my-3">
            <label htmlFor="password" className="mb-2 block text-primary">
              كلمة السر
            </label>
            <Input
              id="password"
              variant="flat"
              placeholder="كلمة السر"
              color={
                loginFormik.touched.password && loginFormik.errors.password
                  ? "danger"
                  : ""
              }
              isInvalid={
                loginFormik.touched.password && loginFormik.errors.password
              }
              errorMessage={loginFormik.errors.password}
              {...loginFormik.getFieldProps("password")}
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

          <Link to={"/forget-code"} onClick={onClose}>
            <span className="text-sm text-primary underline">
              نسيت كلمة السر؟
            </span>
          </Link>

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
                "تسجيل دخول"
              )}
            </Button>
          </div>

          <p className="text-center font-bold">
            ليس لديك حساب ؟
            <Link to="/register" onClick={onClose}>
              <span className="text-primary underline"> سجل من هنا </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
