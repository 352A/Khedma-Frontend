import { ThreeDots } from "react-loader-spinner";
import { profileContext } from "../../../Context/ProfileContext";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { authContext } from "../../../Context/AuthContext";
import api from "../../utils/api";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { IconEye, IconEyeOff, IconLock, IconRepeat } from "@tabler/icons-react";

const userEndPoint = "user/updatePassword";
const craftsmanEndPoint = "craftsman/updateCraftsmanPassword";

export default function UpdatePassword() {
  const { token, bearerKey } = useContext(authContext);
  const { userProfileData } = useContext(profileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const toggleVisibilityOldPassword = () =>
    setIsVisibleOldPassword(!isVisibleOldPassword);
  const toggleVisibilityNewPassword = () =>
    setIsVisibleNewPassword(!isVisibleNewPassword);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  const endPoint =
    userProfileData?.role === "user" ? userEndPoint : craftsmanEndPoint;

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
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
    newPassword: Yup.string()
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
      .oneOf([Yup.ref("newPassword"), null], "كلمتا السر غير متطابقتين")
      .required("تأكيد كلمة السر مطلوب"),
  });

  function handleSuccessResponse(resetForm) {
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
    resetForm();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      if (err.response.data.message === "خطأ التحقق, من فضلك راجع البيانات") {
        errorMessage = "كلمة السر الجديدة يجب أن تكون مختلفة عن القديمة";
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

  async function onSubmit(values, { resetForm }) {
    setIsLoading(true);
    try {
      await api.patch(endPoint, values, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse(resetForm);
    } catch (err) {
      handleErrorResponse(err);
    }
    setIsLoading(false);
  }

  const updatePasswordFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <form onSubmit={updatePasswordFormik.handleSubmit} className="text-sm">
        <h2 className="mb-8 text-xl font-semibold text-gray-600">
          تغيير كلمة السر
        </h2>
        <div className="mb-3">
          <label className="mb-2 block text-primary">كلمة السر القديمة</label>
          <Input
            id="oldPassword"
            variant="flat"
            placeholder=" كلمة السر القديمة"
            color={
              updatePasswordFormik.touched.oldPassword &&
              updatePasswordFormik.errors.oldPassword
                ? "danger"
                : ""
            }
            isInvalid={
              updatePasswordFormik.touched.oldPassword &&
              updatePasswordFormik.errors.oldPassword
            }
            errorMessage={updatePasswordFormik.errors.oldPassword}
            {...updatePasswordFormik.getFieldProps("oldPassword")}
            startContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityOldPassword}
                aria-label="toggle password visibility"
              >
                {isVisibleOldPassword ? (
                  <IconEyeOff size={20} color="#4CAF50" stroke={2} />
                ) : (
                  <IconEye size={20} color="#4CAF50" stroke={2} />
                )}
              </button>
            }
            type={isVisibleOldPassword ? "text" : "password"}
            endContent={<IconLock color="#4CAF50" stroke={2} />}
          />
        </div>

        <div className="mb-3">
          <label className="mb-2 block text-primary">كلمة السر الجديدة</label>
          <Input
            id="newPassword"
            variant="flat"
            placeholder=" كلمة السر الجديدة"
            color={
              updatePasswordFormik.touched.newPassword &&
              updatePasswordFormik.errors.newPassword
                ? "danger"
                : ""
            }
            isInvalid={
              updatePasswordFormik.touched.newPassword &&
              updatePasswordFormik.errors.newPassword
            }
            errorMessage={updatePasswordFormik.errors.newPassword}
            {...updatePasswordFormik.getFieldProps("newPassword")}
            startContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityNewPassword}
                aria-label="toggle password visibility"
              >
                {isVisibleNewPassword ? (
                  <IconEyeOff size={20} color="#4CAF50" stroke={2} />
                ) : (
                  <IconEye size={20} color="#4CAF50" stroke={2} />
                )}
              </button>
            }
            type={isVisibleNewPassword ? "text" : "password"}
            endContent={<IconLock color="#4CAF50" stroke={2} />}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="mb-2 block text-primary">
            اعادة كلمة السر
          </label>
          <Input
            id="confirmPassword"
            variant="flat"
            placeholder=" تأكيد كلمة السر"
            color={
              updatePasswordFormik.touched.confirmPassword &&
              updatePasswordFormik.errors.confirmPassword
                ? "danger"
                : ""
            }
            isInvalid={
              updatePasswordFormik.touched.confirmPassword &&
              updatePasswordFormik.errors.confirmPassword
            }
            errorMessage={updatePasswordFormik.errors.confirmPassword}
            {...updatePasswordFormik.getFieldProps("confirmPassword")}
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

        <Button
          type="submit"
          disabled={isLoading}
          className="ms-auto w-fit rounded-full bg-primary px-6 py-2 text-white"
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
            "تغيير كلمة السر"
          )}
        </Button>
      </form>
    </>
  );
}
