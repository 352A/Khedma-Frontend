import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext";
import { Button, Textarea } from "@nextui-org/react";
import { categories } from "../../../constants/categories";
import { cities } from "../../../constants/cities";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  IconMail,
  IconTrash,
  IconDeviceMobile,
  IconUser,
  IconAddressBook,
  IconGenderMale,
  IconCategory,
  IconBuildings,
  IconBriefcase2,
  IconBuildingCommunity,
  IconBookmark,
  IconEdit,
  IconFileDescription,
} from "@tabler/icons-react";
import { profileContext } from "../../../Context/ProfileContext";

const userEndPoint = "user/profile";
const craftsmanEndPoint = "craftsman/profile";

export default function PersonalDetails() {
  const { token, bearerKey } = useContext(authContext);
  const { userProfileData, getUserProfileData } = useContext(profileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const endPoint =
    userProfileData.role === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const [values, setValues] = useState(
    new Set([...(userProfileData.workArea || [])]),
  );
  const [jobs, setJobs] = useState([]);

  const generalInitialValues = {
    firstName: userProfileData.firstName || "",
    lastName: userProfileData.lastName || "",
    gender: userProfileData.gender || "",
    address: userProfileData.address || "",
    city: userProfileData.city || "",
  };

  const craftsmanInitialValues = {
    jobCategory: userProfileData.jobCategory || "",
    jobType: userProfileData.jobType || "",
    workArea: userProfileData.workArea || "",
    careerDescription: userProfileData.careerDescription || "",
  };

  const initialValues =
    userProfileData.role === "craftsman"
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
  };

  const craftsmanValidationSchemaObj = {
    jobCategory: Yup.string().required("مجال العمل مطلوب"),
    jobType: Yup.string().required("المهنة مطلوبة"),
    workArea: Yup.array()
      .of(Yup.string().required("المنطقة مطلوبة"))
      .min(1, "يجب تحديد منطقة واحدة على الأقل")
      .max(5, "يمكنك تحديد 5 مناطق فقط")
      .required("يجب تحديد منطقة العمل"),
    careerDescription: Yup.string()
      .matches(
        /^[\u0621-\u064A\u0660-\u0669A-Za-z0-9\s\p{P}]+$/u,
        "وصف المهنة يجب أن يحتوي على أحرف عربية أو إنجليزية وأرقام وعلامات ترقيم فقط",
      )
      .min(10, "وصف المهنة يجب ألا يقل عن 10 أحرف")
      .max(500, "وصف المهنة يجب ألا يزيد عن 500 حرفًا")
      .required("وصف المهنة مطلوب"),
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    updateProfileFormik.setFieldValue("jobCategory", selectedCategory);
    const selectedCat = categories.find(
      (category) => category.catName === selectedCategory,
    );
    setJobs(selectedCat?.jobs || []);
    updateProfileFormik.setFieldValue("jobType", "");
  };

  const getJobType = () => {
    const selectedCat = categories.find(
      (category) => category.catName === userProfileData.jobCategory,
    );
    setJobs(selectedCat?.jobs || []);
  };

  const handleSelectionChange = (selected) => {
    const selectedArray = Array.from(selected);
    setValues(selected);
    updateProfileFormik.setFieldValue("workArea", selectedArray);
  };

  const validationSchema = Yup.object(
    userProfileData.role === "craftsman"
      ? { ...craftsmanValidationSchemaObj, ...generalValidationSchemaObj }
      : generalValidationSchemaObj,
  );

  function handleSuccessResponse() {
    toast.success("👏 ! تم تعديل البيانات بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    getUserProfileData();
    setIsUpdate(!isUpdate);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      errorMessage = err.response.data.message;
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
      await api.put(endPoint, values, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse();
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const updateProfileFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { resetForm } = updateProfileFormik;

  useEffect(() => {
    if (userProfileData.role === "craftsman") {
      getJobType();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> خدمة | بيانات المستخدم</title>
      </Helmet>
      <div className="lg:px-14">
        <form
          onSubmit={updateProfileFormik.handleSubmit}
          className="pt-4"
          aria-labelledby="user-info-heading"
        >
          <div className="mb-6 flex flex-row-reverse items-center justify-between">
            <h2 className="text-lg font-extrabold md:text-3xl">
              بيانات المستخدم
            </h2>
            <Button
              radius="full"
              aria-pressed={isUpdate ? "false" : "true"}
              onClick={() => setIsUpdate(!isUpdate)}
              className={`bg-primary px-6 py-2 font-bold text-white ${isUpdate ? "hidden" : ""}`}
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
                <>
                  تعديل <IconEdit stroke={2} size={20} />
                </>
              )}
            </Button>
            <Button
              radius="full"
              className={`bg-danger px-6 py-2 font-bold text-white ${!isUpdate ? "hidden" : ""}`}
              isDisabled={isLoading}
              onClick={() => {
                setIsUpdate(!isUpdate);
                resetForm({ values: initialValues });
              }}
              aria-label="Cancel editing"
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
                <>
                  <>
                    الغاء
                    <IconTrash stroke={2} size={20} />
                  </>
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-x-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الاسم الاول</label>
              <Input
                id="firstName"
                type="text"
                placeholder="الاسم الأول"
                variant="flat"
                color={
                  updateProfileFormik.touched.firstName &&
                  updateProfileFormik.errors.firstName
                    ? "danger"
                    : ""
                }
                isInvalid={
                  updateProfileFormik.touched.firstName &&
                  updateProfileFormik.errors.firstName
                }
                isDisabled={!isUpdate}
                errorMessage={updateProfileFormik.errors.firstName}
                {...updateProfileFormik.getFieldProps("firstName")}
                aria-invalid={
                  updateProfileFormik.touched.firstName &&
                  updateProfileFormik.errors.firstName
                    ? "true"
                    : "false"
                }
                aria-describedby="firstNameError"
              />
            </div>

            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم العائلة</label>
              <Input
                id="lastName"
                type="text"
                placeholder="اسم العائلة"
                variant="flat"
                color={
                  updateProfileFormik.touched.lastName &&
                  updateProfileFormik.errors.lastName
                    ? "danger"
                    : ""
                }
                isInvalid={
                  updateProfileFormik.touched.lastName &&
                  updateProfileFormik.errors.lastName
                }
                isDisabled={!isUpdate}
                errorMessage={updateProfileFormik.errors.lastName}
                {...updateProfileFormik.getFieldProps("lastName")}
                aria-invalid={
                  updateProfileFormik.touched.lastName &&
                  updateProfileFormik.errors.lastName
                    ? "true"
                    : "false"
                }
                aria-describedby="lastNameError"
              />
            </div>
          </div>

          <div className="mb-3 flex flex-col gap-4 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">
                البريد الالكتروني
              </label>
              <Input
                value={userProfileData?.email}
                isDisabled
                id="email"
                type="email"
                placeholder="البريد الالكتروني"
                variant="flat"
                endContent={<IconMail color="#4CAF50" stroke={2} />}
                aria-readonly="true"
              />
            </div>
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">اسم المستخدم</label>
              <Input
                id="username"
                value={userProfileData?.username}
                type="text"
                isDisabled
                placeholder="اسم المستخدم"
                variant="flat"
                endContent={<IconUser color="#4CAF50" stroke={2} />}
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="mb-3 flex flex-col gap-4 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">الموبايل</label>
              <Input
                id="phone"
                value={userProfileData?.phone}
                isDisabled
                type="tel"
                placeholder="الموبايل"
                variant="flat"
                endContent={<IconDeviceMobile color="#4CAF50" stroke={2} />}
                aria-readonly="true"
              />
            </div>
            <div className="mb-3 w-full md:w-1/2">
              <label className="mb-2 block text-primary">العنوان</label>
              <Input
                id="address"
                type="tel"
                placeholder="العنوان"
                variant="flat"
                color={
                  updateProfileFormik.touched.address &&
                  updateProfileFormik.errors.address
                    ? "danger"
                    : ""
                }
                isInvalid={
                  updateProfileFormik.touched.address &&
                  updateProfileFormik.errors.address
                }
                isDisabled={!isUpdate}
                errorMessage={updateProfileFormik.errors.address}
                endContent={<IconAddressBook color="#4CAF50" stroke={2} />}
                {...updateProfileFormik.getFieldProps("address")}
                aria-invalid={
                  updateProfileFormik.touched.address &&
                  updateProfileFormik.errors.address
                    ? "true"
                    : "false"
                }
                aria-describedby="addressError"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/2">
              <label htmlFor="gender" className="mb-2 block text-primary">
                الجنس
              </label>
              <Select
                id="gender"
                defaultSelectedKeys={[userProfileData.gender]}
                variant="flat"
                dir="rtl"
                size="sm"
                color={
                  updateProfileFormik.touched.gender &&
                  updateProfileFormik.errors.gender
                    ? "danger"
                    : ""
                }
                errorMessage={userProfileData.gender}
                startContent={<IconGenderMale color="#4CAF50" stroke={2} />}
                isInvalid={
                  updateProfileFormik.touched.gender &&
                  updateProfileFormik.errors.gender
                }
                isDisabled={!isUpdate}
                aria-label="الجنس"
                aria-invalid={
                  updateProfileFormik.touched.gender &&
                  !!updateProfileFormik.errors.gender
                }
                aria-required="true"
                {...updateProfileFormik.getFieldProps("gender")}
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
              <label htmlFor="city" className="mb-2 block text-primary">
                المدينة
              </label>
              <Select
                id="city"
                defaultSelectedKeys={[userProfileData.city]}
                variant="flat"
                dir="rtl"
                size="sm"
                color={
                  updateProfileFormik.touched.city &&
                  updateProfileFormik.errors.city
                    ? "danger"
                    : ""
                }
                errorMessage={updateProfileFormik.errors.city}
                startContent={<IconBuildings color="#4CAF50" stroke={2} />}
                isInvalid={
                  updateProfileFormik.touched.city &&
                  updateProfileFormik.errors.city
                }
                isDisabled={!isUpdate}
                aria-label="المدينة"
                aria-invalid={
                  updateProfileFormik.touched.city &&
                  !!updateProfileFormik.errors.city
                }
                aria-required="true"
                {...updateProfileFormik.getFieldProps("city")}
              >
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {userProfileData.role === "craftsman" && (
            <>
              <div className="flex flex-col gap-3 md:flex-row-reverse">
                <div className="mb-3 w-full md:w-1/3">
                  <label
                    htmlFor="jobCategory"
                    className="mb-2 block text-primary"
                  >
                    مجال العمل
                  </label>
                  <Select
                    id="jobCategory"
                    defaultSelectedKeys={[userProfileData.jobCategory]}
                    value={[userProfileData.jobCategory]}
                    variant="flat"
                    dir="rtl"
                    size="sm"
                    color={
                      updateProfileFormik.touched.jobCategory &&
                      updateProfileFormik.errors.jobCategory
                        ? "danger"
                        : ""
                    }
                    errorMessage={updateProfileFormik.errors.jobCategory}
                    startContent={<IconCategory color="#4CAF50" stroke={2} />}
                    isDisabled={!isUpdate}
                    isInvalid={
                      updateProfileFormik.touched.jobCategory &&
                      updateProfileFormik.errors.jobCategory
                    }
                    aria-label="مجال العمل"
                    aria-invalid={
                      updateProfileFormik.touched.jobCategory &&
                      !!updateProfileFormik.errors.jobCategory
                    }
                    aria-required="true"
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
                  <label htmlFor="jobType" className="mb-2 block text-primary">
                    المهنة
                  </label>
                  <Select
                    id="jobType"
                    defaultSelectedKeys={[userProfileData.jobType]}
                    variant="flat"
                    dir="rtl"
                    size="sm"
                    color={
                      updateProfileFormik.touched.jobType &&
                      updateProfileFormik.errors.jobType
                        ? "danger"
                        : ""
                    }
                    errorMessage={updateProfileFormik.errors.jobType}
                    startContent={<IconBriefcase2 color="#4CAF50" stroke={2} />}
                    isDisabled={!isUpdate}
                    isInvalid={
                      updateProfileFormik.touched.jobType &&
                      updateProfileFormik.errors.jobType
                    }
                    aria-label="المهنة"
                    aria-invalid={
                      updateProfileFormik.touched.jobType &&
                      !!updateProfileFormik.errors.jobType
                    }
                    aria-required="true"
                    {...updateProfileFormik.getFieldProps("jobType")}
                  >
                    {jobs.map((job) => (
                      <SelectItem key={job.title} value={job.title}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="mb-3 w-full md:w-1/3">
                  <label htmlFor="workArea" className="mb-2 block text-primary">
                    مناطق العمل
                  </label>
                  <Select
                    id="workArea"
                    variant="flat"
                    dir="rtl"
                    size="sm"
                    selectionMode="multiple"
                    selectedKeys={values}
                    className="w-full p-0 outline-none"
                    onSelectionChange={handleSelectionChange}
                    errorMessage={updateProfileFormik.errors.workArea}
                    startContent={
                      <IconBuildingCommunity color="#4CAF50" stroke={2} />
                    }
                    isDisabled={!isUpdate}
                    color={
                      updateProfileFormik.touched.workArea &&
                      updateProfileFormik.errors.workArea
                        ? "danger"
                        : ""
                    }
                    isInvalid={
                      updateProfileFormik.touched.workArea &&
                      updateProfileFormik.errors.workArea
                    }
                    aria-label="مناطق العمل"
                    aria-invalid={
                      updateProfileFormik.touched.workArea &&
                      !!updateProfileFormik.errors.workArea
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

              <div className="mt-4 w-full">
                <label
                  htmlFor="careerDescription"
                  className="block text-primary"
                >
                  أكتب وصف عن طبيعة عملك كمستقل موضحا فيها مهاراتك العملية
                </label>
                <Textarea
                  id="careerDescription"
                  dir="rtl"
                  placeholder="أكتب وصف لطبية عملك و مهاراتك"
                  variant="flat"
                  color={
                    updateProfileFormik.touched.careerDescription &&
                    updateProfileFormik.errors.careerDescription
                      ? "danger"
                      : ""
                  }
                  endContent={
                    <IconFileDescription color="#4CAF50" stroke={2} />
                  }
                  isInvalid={
                    updateProfileFormik.touched.careerDescription &&
                    updateProfileFormik.errors.careerDescription
                  }
                  isDisabled={!isUpdate}
                  aria-label="وصف العمل"
                  aria-invalid={
                    updateProfileFormik.touched.careerDescription &&
                    !!updateProfileFormik.errors.careerDescription
                  }
                  {...updateProfileFormik.getFieldProps("careerDescription")}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            radius="full"
            className={`mt-5 bg-primary font-bold text-white ${!isUpdate ? "hidden" : ""}`}
            isDisabled={isLoading}
            aria-label="Save changes"
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
              <>
                حفظ
                <IconBookmark stroke={2} size={20} />
              </>
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
