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

// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const { getUserData, setToken, accountType } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    navigate("/admin-dashboard");
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
      const { data } = await api.post("admin/login", values);
      sessionStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      getUserData();
      handleSuccessResponse(data);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const CcsLoginFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="p-3">
        <h2 className="mb-8 mt-3 font-bold md:text-xl">تسجيل الدخول</h2>

        <form onSubmit={CcsLoginFormik.handleSubmit} className="text-sm">
          <div className="my-3">
            <label className="mb-2 block text-primary">البريد الالكتروني</label>
            <Input
              id="email"
              type="email"
              placeholder="البريد الالكتروني"
              variant="flat"
              color={
                CcsLoginFormik.touched.email && CcsLoginFormik.errors.email
                  ? "danger"
                  : ""
              }
              isInvalid={
                CcsLoginFormik.touched.email && CcsLoginFormik.errors.email
              }
              errorMessage={CcsLoginFormik.errors.email}
              endContent={<IconMail color="#4CAF50" stroke={2} />}
              {...CcsLoginFormik.getFieldProps("email")}
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
                CcsLoginFormik.touched.password &&
                CcsLoginFormik.errors.password
                  ? "danger"
                  : ""
              }
              isInvalid={
                CcsLoginFormik.touched.password &&
                CcsLoginFormik.errors.password
              }
              errorMessage={CcsLoginFormik.errors.password}
              {...CcsLoginFormik.getFieldProps("password")}
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
        </form>
      </div>
    </>
  );
}
