import api from "../../utils/api";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  IconMail,
  IconEye,
  IconEyeOff,
  IconDeviceMobile,
  IconUser,
  IconAddressBook,
  IconLock,
  IconRepeat,
  IconGenderMale,
  IconUserCircle,
} from "@tabler/icons-react";

const endPoint = "admin/signup";

export default function CreateAdmin() {
  const { token, bearerKey } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل")
      .max(20, "يجب أن لا يتجاوز الاسم 20 حرفًا")
      .matches(/^[\u0600-\u06FF\s]+$/, "يجب أن يحتوي الاسم على أحرف عربية فقط"),
    lastName: Yup.string()
      .required("الاسم مطلوب")
      .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل")
      .max(20, "يجب أن لا يتجاوز الاسم 20 حرفًا")
      .matches(/^[\u0600-\u06FF\s]+$/, "يجب أن يحتوي الاسم على أحرف عربية فقط"),
    username: Yup.string()
      .required("اسم المستخدم مطلوب")
      .min(3, "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل")
      .max(30, "يجب أن لا يتجاوز اسم المستخدم 30 حرفًا")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "يجب أن يحتوي اسم المستخدم على أحرف إنجليزية وأرقام فقط، بدون مسافات أو رموز خاصة",
      ),
    email: Yup.string()
      .required("البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صحيح")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co)$/,
        "يرجى إدخال بريد إلكتروني صحيح ",
      ),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .length(11, "يجب أن يتكون رقم الهاتف من 11 رقماً")
      .matches(
        /^01[0-2|5]\d{8}$/,
        "يجب أن يبدأ رقم الهاتف بـ 01 ويليه 0 أو 1 أو 2 أو 5، ثم يتبعه 8 أرقام",
      ),
    gender: Yup.string().required("يجب تحديد الجنس"),
    role: Yup.string().required("يجب تحديد الصلاحية"),
    address: Yup.string()
      .required("العنوان مطلوب")
      .min(5, "يجب أن يتكون العنوان من 5 أحرف على الأقل")
      .max(50, "يجب أن لا يتجاوز العنوان 50 حرفًا")
      .matches(
        /^[\u0600-\u06FF0-9\s\p{P}]+$/u,
        "العنوان يجب أن يحتوي على أحرف عربية وأرقام وعلامات ترقيم فقط",
      ),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .matches(
        /^[A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]+$/,
        "يجب أن تحتوي كلمة المرور على أحرف إنجليزية فقط",
      )
      .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
      .max(11, "يجب أن لا تتجاوز كلمة المرور 11 حرفًا")
      .matches(/(?=.*\d)/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
      .matches(
        /(?=.*[A-Z])/,
        "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
      )
      .matches(
        /(?=.*[a-z])/,
        "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
      )
      .matches(
        /(?=.[!@#$%^&()\-_=+{};:,<.>])/,
        "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل",
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  function handleSuccessResponse(resetForm) {
    toast.success("👏 ! تم التسجيل بنجاح", {
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

  async function onSubmit(values, { resetForm }) {
    setIsLoading(true);
    try {
      const res = await api.post(endPoint, values, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse(resetForm);
    } catch (err) {
      console.log(res);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const createAdminFormik = useFormik({
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
    <div className="m-auto w-full rounded-xl bg-gray-800 p-4 shadow md:w-4/5 lg:w-3/5">
      <div className="absolute -left-20 -top-10 h-52 w-52 animate-float rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 opacity-10 blur-xl"></div>
      <div
        className="to-blue-500 absolute h-56 w-56 animate-float rounded-full bg-gradient-to-r from-green-500 opacity-25 blur-xl delay-100"
        style={{ top: "2%", left: "10%" }}
      ></div>
      <div
        className="absolute h-44 w-44 animate-float rounded-full bg-gradient-to-r from-teal-500 to-orange-300 opacity-25 blur-xl delay-150"
        style={{
          top: "60%",
          left: "52%",
        }}
      ></div>
      <div className="lg:px-9 lg:py-2">
        <h2 className="mb-6 mt-4 text-lg font-extrabold text-white md:text-3xl">
          انشاء حساب مدير
        </h2>

        <form onSubmit={createAdminFormik.handleSubmit}>
          <div className="flex flex-col gap-x-12 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الاسم الاول</label>
              <Input
                id="firstName"
                type="text"
                placeholder="الاسم الأول"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.firstName &&
                  createAdminFormik.errors.firstName
                }
                errorMessage={createAdminFormik.errors.firstName}
                {...createAdminFormik.getFieldProps("firstName")}
              />
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم العائلة</label>
              <Input
                id="lastName"
                type="text"
                placeholder="اسم العائلة"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.lastName &&
                  createAdminFormik.errors.lastName
                }
                errorMessage={createAdminFormik.errors.lastName}
                {...createAdminFormik.getFieldProps("lastName")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-x-12 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">
                البريد الالكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="البريد الالكتروني"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.email &&
                  createAdminFormik.errors.email
                }
                errorMessage={createAdminFormik.errors.email}
                endContent={<IconMail color="#4CAF50" stroke={2} />}
                {...createAdminFormik.getFieldProps("email")}
              />
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الموبايل</label>
              <Input
                id="phone"
                type="tel"
                placeholder="الموبايل"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.phone &&
                  createAdminFormik.errors.phone
                }
                errorMessage={createAdminFormik.errors.phone}
                endContent={<IconDeviceMobile color="#4CAF50" stroke={2} />}
                {...createAdminFormik.getFieldProps("phone")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-x-12 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم المستخدم</label>
              <Input
                id="username"
                type="text"
                placeholder="اسم المستخدم"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.username &&
                  createAdminFormik.errors.username
                }
                errorMessage={createAdminFormik.errors.username}
                endContent={<IconUser color="#4CAF50" stroke={2} />}
                {...createAdminFormik.getFieldProps("username")}
              />
            </div>

            <div className="mb-3 md:w-1/2">
              <label className="mb-2 block text-primary">العنوان</label>
              <Input
                id="address"
                type="tel"
                placeholder="العنوان"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.address &&
                  createAdminFormik.errors.address
                }
                errorMessage={createAdminFormik.errors.address}
                endContent={<IconAddressBook color="#4CAF50" stroke={2} />}
                {...createAdminFormik.getFieldProps("address")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <div className="flex flex-row-reverse items-center">
                <IconGenderMale color="#4CAF50" stroke={2} />
                <label className="mb-2 block text-primary">الجنس</label>
              </div>
              <Select
                variant="flat"
                dir="rtl"
                size="sm"
                id="gender"
                color={
                  createAdminFormik.touched.gender &&
                  createAdminFormik.errors.gender
                    ? "danger"
                    : "default"
                }
                errorMessage={createAdminFormik.errors.gender}
                isInvalid={
                  createAdminFormik.touched.gender &&
                  createAdminFormik.errors.gender
                }
                label="اختر الجنس"
                disabled={!createAdminFormik.values.gender}
                {...createAdminFormik.getFieldProps("gender")}
              >
                <SelectItem key="male" value="male">
                  ذكر
                </SelectItem>
                <SelectItem key="female" value="female">
                  أنثى
                </SelectItem>
              </Select>
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <div className="flex flex-row-reverse items-center gap-x-3">
                <IconUserCircle color="#4CAF50" stroke={2} />
                <label className="mb-2 block text-primary">الصلاحية</label>
              </div>
              <Select
                variant="flat"
                dir="rtl"
                size="sm"
                id="role"
                color={
                  createAdminFormik.touched.role &&
                  createAdminFormik.errors.role
                    ? "danger"
                    : "default"
                }
                errorMessage={createAdminFormik.errors.role}
                isInvalid={
                  createAdminFormik.touched.role &&
                  createAdminFormik.errors.role
                }
                label="اختر الصلاحية"
                disabled={!createAdminFormik.values.role}
                {...createAdminFormik.getFieldProps("role")}
              >
                <SelectItem key="rootAdmin" value="rootAdmin">
                  مدير رئيسي
                </SelectItem>
                <SelectItem key="subAdmin" value="subAdmin">
                  مدير فرعي
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:flex-row-reverse">
            <div className="w-full md:w-1/2">
              <label className="mb-2 block text-primary">كلمة السر</label>
              <Input
                id="password"
                variant="flat"
                placeholder="كلمة السر"
                isInvalid={
                  createAdminFormik.touched.password &&
                  createAdminFormik.errors.password
                }
                errorMessage={createAdminFormik.errors.password}
                {...createAdminFormik.getFieldProps("password")}
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

            <div className="w-full md:w-1/2">
              <label className="mb-2 block text-primary">اعادة كلمة السر</label>
              <Input
                id="confirmPassword"
                variant="flat"
                isInvalid={
                  createAdminFormik.touched.confirmPassword &&
                  createAdminFormik.errors.confirmPassword
                }
                errorMessage={createAdminFormik.errors.confirmPassword}
                {...createAdminFormik.getFieldProps("confirmPassword")}
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
          </div>

          <Button
            type="submit"
            radius="full"
            className="mt-6 bg-primary px-6 py-2 font-bold text-white"
            disabled={isLoading}
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
              "تسجيل "
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
