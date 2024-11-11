import api from "../../utils/api";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext";
import { Button } from "@nextui-org/react";
import { categories } from "../../../constants/categories";
import { cities } from "../../../constants/cities";
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
  IconCategory,
  IconBuildings,
  IconBriefcase2,
  IconBuildingCommunity,
  IconChevronLeft,
} from "@tabler/icons-react";

const userEndPoint = "auth/signup";
const craftsmanEndPoint = "auth/craftsman/signup";

export default function RegisterForm() {
  const { accountType } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  const navigate = useNavigate();
  const endPoint =
    accountType === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const [values, setValues] = useState(new Set([]));
  const [jobs, setJobs] = useState([]);

  const generalInitialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
  };

  const craftsmanInitialValues = {
    jobCategory: "",
    jobType: "",
    workArea: [],
  };

  const initialValues =
    accountType === "craftsman"
      ? { ...generalInitialValues, ...craftsmanInitialValues }
      : generalInitialValues;

  const generalValidationSchemaObj = {
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
    address: Yup.string()
      .required("العنوان مطلوب")
      .min(5, "يجب أن يتكون العنوان من 5 أحرف على الأقل")
      .max(50, "يجب أن لا يتجاوز العنوان 50 حرفًا")
      .matches(
        /^[\u0600-\u06FF0-9\s\p{P}]+$/u,
        "العنوان يجب أن يحتوي على أحرف عربية وأرقام وعلامات ترقيم فقط",
      ),
    city: Yup.string().required("يجب تحديد المدينة"),
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
  };

  const craftsmanValidationSchemaObj = {
    jobCategory: Yup.string().required("مجال العمل مطلوب"),
    jobType: Yup.string().required("المهنة مطلوبة"),
    workArea: Yup.array()
      .of(Yup.string().required("المنطقة مطلوبة"))
      .min(1, "يجب تحديد منطقة واحدة على الأقل")
      .max(5, "يمكنك تحديد 5 مناطق فقط")
      .required("يجب تحديد منطقة العمل"),
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    registerFormik.setFieldValue("jobCategory", selectedCategory);
    const selectedCat = categories.find(
      (category) => category.catName === selectedCategory,
    );
    setJobs(selectedCat?.jobs || []);
    registerFormik.setFieldValue("jobType", "");
  };

  const handleSelectionChange = (selected) => {
    const selectedArray = Array.from(selected);
    setValues(selected);
    registerFormik.setFieldValue("workArea", selectedArray);
  };

  const validationSchema = Yup.object(
    accountType === "craftsman"
      ? { ...craftsmanValidationSchemaObj, ...generalValidationSchemaObj }
      : generalValidationSchemaObj,
  );

  function handleSuccessResponse(resetForm) {
    toast.success("👏 ! تم التسجيل بنجاح", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    resetForm();
    setTimeout(() => {
      navigate("/confirm-email");
    }, 2000);
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
      await api.post(endPoint, values);
      handleSuccessResponse(resetForm);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const registerFormik = useFormik({
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
      <div className="lg:px-14">
        <div className="mb-4 mt-4 flex flex-row-reverse items-center justify-between text-lg font-extrabold md:text-3xl">
          <h2>
            {accountType == "user"
              ? "انشاء حساب عميل جديد"
              : "انشاء حساب مقدم خدمة جديد"}
          </h2>

          <Link to={"/register"}>
            <IconChevronLeft stroke={2} size={50} />
          </Link>
        </div>

        <form onSubmit={registerFormik.handleSubmit}>
          <div className="flex flex-col gap-x-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الاسم الاول</label>
              <Input
                id="firstName"
                type="text"
                placeholder="الاسم الأول"
                variant="bordered"
                color={
                  registerFormik.touched.firstName &&
                  registerFormik.errors.firstName
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.firstName &&
                  registerFormik.errors.firstName
                }
                errorMessage={registerFormik.errors.firstName}
                {...registerFormik.getFieldProps("firstName")}
              />
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم العائلة</label>
              <Input
                id="lastName"
                type="text"
                placeholder="اسم العائلة"
                variant="bordered"
                color={
                  registerFormik.touched.lastName &&
                  registerFormik.errors.lastName
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.lastName &&
                  registerFormik.errors.lastName
                }
                errorMessage={registerFormik.errors.lastName}
                {...registerFormik.getFieldProps("lastName")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-x-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">
                البريد الالكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="البريد الالكتروني"
                variant="bordered"
                color={
                  registerFormik.touched.email && registerFormik.errors.email
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.email && registerFormik.errors.email
                }
                errorMessage={registerFormik.errors.email}
                endContent={<IconMail color="#4CAF50" stroke={2} />}
                {...registerFormik.getFieldProps("email")}
              />
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الموبايل</label>
              <Input
                id="phone"
                type="tel"
                placeholder="الموبايل"
                variant="bordered"
                color={
                  registerFormik.touched.phone && registerFormik.errors.phone
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.phone && registerFormik.errors.phone
                }
                errorMessage={registerFormik.errors.phone}
                endContent={<IconDeviceMobile color="#4CAF50" stroke={2} />}
                {...registerFormik.getFieldProps("phone")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-x-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم المستخدم</label>
              <Input
                id="username"
                type="text"
                placeholder="اسم المستخدم"
                variant="bordered"
                color={
                  registerFormik.touched.username &&
                  registerFormik.errors.username
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.username &&
                  registerFormik.errors.username
                }
                errorMessage={registerFormik.errors.username}
                endContent={<IconUser color="#4CAF50" stroke={2} />}
                {...registerFormik.getFieldProps("username")}
              />
            </div>

            <div className="mb-3 md:w-1/2">
              <label className="mb-2 block text-primary">العنوان</label>
              <Input
                id="address"
                type="tel"
                placeholder="العنوان"
                variant="bordered"
                color={
                  registerFormik.touched.address &&
                  registerFormik.errors.address
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.address &&
                  registerFormik.errors.address
                }
                errorMessage={registerFormik.errors.address}
                endContent={<IconAddressBook color="#4CAF50" stroke={2} />}
                {...registerFormik.getFieldProps("address")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <div className="flex flex-row-reverse items-center">
                <IconGenderMale color="#4CAF50" stroke={2} />
                <label className="mb-2 block text-primary">الجنس</label>
              </div>
              <Select
                variant="bordered"
                dir="rtl"
                size="sm"
                id="gender"
                color={
                  registerFormik.touched.gender && registerFormik.errors.gender
                    ? "danger"
                    : "default"
                }
                errorMessage={registerFormik.errors.gender}
                isInvalid={
                  registerFormik.touched.gender && registerFormik.errors.gender
                }
                label="اختر الجنس"
                disabled={!registerFormik.values.gender}
                {...registerFormik.getFieldProps("gender")}
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
                <IconBuildings color="#4CAF50" stroke={2} />
                <label className="mb-2 block text-primary">المدينة</label>
              </div>
              <Select
                variant="bordered"
                color={
                  registerFormik.touched.city && registerFormik.errors.city
                    ? "danger"
                    : "default"
                }
                errorMessage={registerFormik.errors.city}
                isInvalid={
                  registerFormik.touched.city && registerFormik.errors.city
                }
                size="sm"
                id="city"
                dir="rtl"
                label="اختر المدينة"
                disabled={!registerFormik.values.city}
                {...registerFormik.getFieldProps("city")}
              >
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {accountType === "craftsman" && (
            <>
              <div className="flex flex-col gap-3 md:flex-row-reverse">
                <div className="mb-3 w-full md:w-1/3">
                  <div className="flex flex-row-reverse items-center gap-x-3">
                    <IconCategory color="#4CAF50" stroke={2} />
                    <label className="mb-2 block text-primary">
                      مجال العمل
                    </label>
                  </div>
                  <Select
                    variant="bordered"
                    color={
                      registerFormik.touched.jobCategory &&
                      registerFormik.errors.jobCategory
                        ? "danger"
                        : "default"
                    }
                    size="sm"
                    id="jobCategory"
                    dir="rtl"
                    label="اختر مجال العمل"
                    value={registerFormik.values.jobCategory}
                    errorMessage={registerFormik.errors.jobCategory}
                    isInvalid={
                      registerFormik.touched.jobCategory &&
                      registerFormik.errors.jobCategory
                    }
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <SelectItem
                        key={category.catName}
                        value={category.catName}
                      >
                        {category.catName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="mb-3 w-full md:w-1/3">
                  <div className="flex flex-row-reverse items-center gap-x-3">
                    <IconBriefcase2 color="#4CAF50" stroke={2} />
                    <label className="mb-2 block text-primary">المهنة</label>
                  </div>
                  <Select
                    variant="bordered"
                    size="sm"
                    id="jobType"
                    dir="rtl"
                    label="اختر المهنة"
                    disabled={!registerFormik.values.jobType}
                    errorMessage={registerFormik.errors.jobType}
                    color={
                      registerFormik.touched.jobType &&
                      registerFormik.errors.jobType
                        ? "danger"
                        : "default"
                    }
                    isInvalid={
                      registerFormik.touched.jobType &&
                      registerFormik.errors.jobType
                    }
                    {...registerFormik.getFieldProps("jobType")}
                  >
                    {jobs.map((job) => (
                      <SelectItem key={job.title} value={job.title}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="mb-3 w-full md:w-1/3">
                  <div className="flex flex-row-reverse items-center gap-x-3">
                    <IconBuildingCommunity color="#4CAF50" stroke={2} />
                    <label className="mb-2 block text-primary">
                      مناطق العمل
                    </label>
                  </div>
                  <Select
                    variant="bordered"
                    size="sm"
                    id="workArea"
                    dir="rtl"
                    label="اختر مناطق العمل"
                    selectionMode="multiple"
                    selectedKeys={values}
                    className="w-full p-0 outline-none"
                    onSelectionChange={handleSelectionChange}
                    errorMessage={registerFormik.errors.workArea}
                    color={
                      registerFormik.touched.workArea &&
                      registerFormik.errors.workArea
                        ? "danger"
                        : "default"
                    }
                    isInvalid={
                      registerFormik.touched.workArea &&
                      registerFormik.errors.workArea
                    }
                  >
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 md:flex-row-reverse">
            <div className="w-full md:w-1/2">
              <label className="mb-2 block text-primary">كلمة السر</label>
              <Input
                id="password"
                variant="bordered"
                placeholder="كلمة السر"
                color={
                  registerFormik.touched.password &&
                  registerFormik.errors.password
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.password &&
                  registerFormik.errors.password
                }
                errorMessage={registerFormik.errors.password}
                {...registerFormik.getFieldProps("password")}
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
                variant="bordered"
                placeholder="اعادة كلمة السر "
                color={
                  registerFormik.touched.confirmPassword &&
                  registerFormik.errors.confirmPassword
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  registerFormik.touched.confirmPassword &&
                  registerFormik.errors.confirmPassword
                }
                errorMessage={registerFormik.errors.confirmPassword}
                {...registerFormik.getFieldProps("confirmPassword")}
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
            className="mt-4 bg-primary px-6 py-2 font-bold text-white"
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
    </>
  );
}
