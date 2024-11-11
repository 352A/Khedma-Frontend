import { Button, Textarea } from "@nextui-org/react";
import { categories } from "../../../constants/categories";
import { cities } from "../../../constants/cities";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function UpdateDetailsForm({ details, getDetails }) {
  const { id, role } = useParams();
  const { token, bearerKey } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [values, setValues] = useState(new Set([...(details?.workArea || [])]));
  const [jobs, setJobs] = useState([]);

  const userEndPoint = `admin/updateUser/${id}`;
  const craftsmanEndPoint = `admin/updateCraftsman/${id}`;

  const endPoint = role === "craftsman" ? craftsmanEndPoint : userEndPoint;

  const generalInitialValues = {
    firstName: details.firstName,
    lastName: details.lastName,
    phone: details.phone,
    email: details.email,
    username: details.username,
    gender: details.gender,
    address: details.address,
    city: details.city,
  };

  const craftsmanInitialValues = {
    jobCategory: details.jobCategory,
    jobType: details.jobType,
    workArea: details.workArea,
  };

  const initialValues =
    role === "craftsman"
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
    adminUpdateDetailsFormik.setFieldValue("jobCategory", selectedCategory);
    const selectedCat = categories.find(
      (category) => category.catName === selectedCategory,
    );
    setJobs(selectedCat?.jobs || []);
    adminUpdateDetailsFormik.setFieldValue("jobType", "");
  };

  const getJobType = () => {
    const selectedCat = categories.find(
      (category) => category.catName === details?.jobCategory,
    );
    setJobs(selectedCat?.jobs || []);
  };

  const handleSelectionChange = (selected) => {
    const selectedArray = Array.from(selected);
    setValues(selected);
    adminUpdateDetailsFormik.setFieldValue("workArea", selectedArray);
  };

  const validationSchema = Yup.object(
    role === "craftsman"
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
          authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse();
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
      getDetails();
    }
  }

  const adminUpdateDetailsFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { resetForm } = adminUpdateDetailsFormik;

  useEffect(() => {
    if (role === "craftsman") {
      getJobType();
    }
  }, []);

  return (
    <form
      onSubmit={adminUpdateDetailsFormik.handleSubmit}
      className="pt-4"
      aria-labelledby="user-info-heading"
    >
      <div className="mb-6 flex flex-row-reverse items-center justify-between">
        <h2 className="text-lg font-extrabold text-white md:text-3xl">
          {role === "user" ? "بيانات المستخدم" : "بيانات المستقل"}
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
            variant="solid"
            color={
              adminUpdateDetailsFormik.touched.firstName &&
              adminUpdateDetailsFormik.errors.firstName
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.firstName &&
              adminUpdateDetailsFormik.errors.firstName
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.firstName}
            {...adminUpdateDetailsFormik.getFieldProps("firstName")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.firstName &&
              adminUpdateDetailsFormik.errors.firstName
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
            variant="solid"
            color={
              adminUpdateDetailsFormik.touched.lastName &&
              adminUpdateDetailsFormik.errors.lastName
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.lastName &&
              adminUpdateDetailsFormik.errors.lastName
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.lastName}
            {...adminUpdateDetailsFormik.getFieldProps("lastName")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.lastName &&
              adminUpdateDetailsFormik.errors.lastName
                ? "true"
                : "false"
            }
            aria-describedby="lastNameError"
          />
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-4 md:flex-row-reverse">
        <div className="mb-3 w-full md:w-1/2">
          <label className="mb-2 block text-primary">البريد الالكتروني</label>
          <Input
            id="email"
            type="email"
            placeholder="البريد الالكتروني"
            variant="solid"
            endContent={<IconMail color="#4CAF50" stroke={2} />}
            aria-readonly="true"
            color={
              adminUpdateDetailsFormik.touched.email &&
              adminUpdateDetailsFormik.errors.email
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.email &&
              adminUpdateDetailsFormik.errors.email
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.email}
            {...adminUpdateDetailsFormik.getFieldProps("email")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.email &&
              adminUpdateDetailsFormik.errors.email
                ? "true"
                : "false"
            }
            aria-describedby="emailError"
          />
        </div>
        <div className="mb-3 w-full md:w-1/2">
          <label className="mb-2 block text-primary">اسم المستخدم</label>
          <Input
            id="username"
            type="text"
            placeholder="اسم المستخدم"
            variant="solid"
            endContent={<IconUser color="#4CAF50" stroke={2} />}
            aria-readonly="true"
            color={
              adminUpdateDetailsFormik.touched.username &&
              adminUpdateDetailsFormik.errors.username
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.username &&
              adminUpdateDetailsFormik.errors.username
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.username}
            {...adminUpdateDetailsFormik.getFieldProps("username")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.username &&
              adminUpdateDetailsFormik.errors.username
                ? "true"
                : "false"
            }
            aria-describedby="usernameError"
          />
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-4 md:flex-row-reverse">
        <div className="mb-3 w-full md:w-1/2">
          <label className="mb-2 block text-primary">الموبايل</label>
          <Input
            id="phone"
            type="tel"
            placeholder="الموبايل"
            variant="solid"
            endContent={<IconDeviceMobile color="#4CAF50" stroke={2} />}
            aria-readonly="true"
            color={
              adminUpdateDetailsFormik.touched.phone &&
              adminUpdateDetailsFormik.errors.phone
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.phone &&
              adminUpdateDetailsFormik.errors.phone
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.phone}
            {...adminUpdateDetailsFormik.getFieldProps("phone")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.phone &&
              adminUpdateDetailsFormik.errors.phone
                ? "true"
                : "false"
            }
            aria-describedby="phoneError"
          />
        </div>
        <div className="mb-3 w-full md:w-1/2">
          <label className="mb-2 block text-primary">العنوان</label>
          <Input
            id="address"
            type="tel"
            placeholder="العنوان"
            variant="solid"
            color={
              adminUpdateDetailsFormik.touched.address &&
              adminUpdateDetailsFormik.errors.address
                ? "danger"
                : ""
            }
            isInvalid={
              adminUpdateDetailsFormik.touched.address &&
              adminUpdateDetailsFormik.errors.address
            }
            isDisabled={!isUpdate}
            errorMessage={adminUpdateDetailsFormik.errors.address}
            endContent={<IconAddressBook color="#4CAF50" stroke={2} />}
            {...adminUpdateDetailsFormik.getFieldProps("address")}
            aria-invalid={
              adminUpdateDetailsFormik.touched.address &&
              adminUpdateDetailsFormik.errors.address
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
            defaultSelectedKeys={[details.gender]}
            variant="solid"
            dir="rtl"
            size="sm"
            color={
              adminUpdateDetailsFormik.touched.gender &&
              adminUpdateDetailsFormik.errors.gender
                ? "danger"
                : ""
            }
            errorMessage={details.gender}
            startContent={<IconGenderMale color="#4CAF50" stroke={2} />}
            isInvalid={
              adminUpdateDetailsFormik.touched.gender &&
              adminUpdateDetailsFormik.errors.gender
            }
            isDisabled={!isUpdate}
            aria-label="الجنس"
            aria-invalid={
              adminUpdateDetailsFormik.touched.gender &&
              !!adminUpdateDetailsFormik.errors.gender
            }
            aria-required="true"
            {...adminUpdateDetailsFormik.getFieldProps("gender")}
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
            defaultSelectedKeys={[details.city]}
            variant="solid"
            dir="rtl"
            size="sm"
            color={
              adminUpdateDetailsFormik.touched.city &&
              adminUpdateDetailsFormik.errors.city
                ? "danger"
                : ""
            }
            errorMessage={adminUpdateDetailsFormik.errors.city}
            startContent={<IconBuildings color="#4CAF50" stroke={2} />}
            isInvalid={
              adminUpdateDetailsFormik.touched.city &&
              adminUpdateDetailsFormik.errors.city
            }
            isDisabled={!isUpdate}
            aria-label="المدينة"
            aria-invalid={
              adminUpdateDetailsFormik.touched.city &&
              !!adminUpdateDetailsFormik.errors.city
            }
            aria-required="true"
            {...adminUpdateDetailsFormik.getFieldProps("city")}
          >
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {role === "craftsman" && (
        <>
          <div className="flex flex-col gap-3 md:flex-row-reverse">
            <div className="mb-3 w-full md:w-1/3">
              <label htmlFor="jobCategory" className="mb-2 block text-primary">
                مجال العمل
              </label>
              <Select
                id="jobCategory"
                defaultSelectedKeys={[details.jobCategory]}
                value={[details.jobCategory]}
                variant="solid"
                dir="rtl"
                size="sm"
                color={
                  adminUpdateDetailsFormik.touched.jobCategory &&
                  adminUpdateDetailsFormik.errors.jobCategory
                    ? "danger"
                    : ""
                }
                errorMessage={adminUpdateDetailsFormik.errors.jobCategory}
                startContent={<IconCategory color="#4CAF50" stroke={2} />}
                isDisabled={!isUpdate}
                isInvalid={
                  adminUpdateDetailsFormik.touched.jobCategory &&
                  adminUpdateDetailsFormik.errors.jobCategory
                }
                aria-label="مجال العمل"
                aria-invalid={
                  adminUpdateDetailsFormik.touched.jobCategory &&
                  !!adminUpdateDetailsFormik.errors.jobCategory
                }
                aria-required="true"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <SelectItem key={category.catName} value={category.catName}>
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
                defaultSelectedKeys={[details.jobType]}
                variant="solid"
                dir="rtl"
                size="sm"
                color={
                  adminUpdateDetailsFormik.touched.jobType &&
                  adminUpdateDetailsFormik.errors.jobType
                    ? "danger"
                    : ""
                }
                errorMessage={adminUpdateDetailsFormik.errors.jobType}
                startContent={<IconBriefcase2 color="#4CAF50" stroke={2} />}
                isDisabled={!isUpdate}
                isInvalid={
                  adminUpdateDetailsFormik.touched.jobType &&
                  adminUpdateDetailsFormik.errors.jobType
                }
                aria-label="المهنة"
                aria-invalid={
                  adminUpdateDetailsFormik.touched.jobType &&
                  !!adminUpdateDetailsFormik.errors.jobType
                }
                aria-required="true"
                {...adminUpdateDetailsFormik.getFieldProps("jobType")}
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
                variant="solid"
                dir="rtl"
                size="sm"
                selectionMode="multiple"
                selectedKeys={values}
                className="w-full p-0 outline-none"
                onSelectionChange={handleSelectionChange}
                errorMessage={adminUpdateDetailsFormik.errors.workArea}
                startContent={
                  <IconBuildingCommunity color="#4CAF50" stroke={2} />
                }
                isDisabled={!isUpdate}
                color={
                  adminUpdateDetailsFormik.touched.workArea &&
                  adminUpdateDetailsFormik.errors.workArea
                    ? "danger"
                    : ""
                }
                isInvalid={
                  adminUpdateDetailsFormik.touched.workArea &&
                  adminUpdateDetailsFormik.errors.workArea
                }
                aria-label="مناطق العمل"
                aria-invalid={
                  adminUpdateDetailsFormik.touched.workArea &&
                  !!adminUpdateDetailsFormik.errors.workArea
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
  );
}
