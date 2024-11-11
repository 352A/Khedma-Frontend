import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { IconPaperclip } from "@tabler/icons-react";
import styles from "./contact.module.css";

export default function ContactForm({ userProfileData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const initialValues = {
    firstName: userProfileData?.firstName || "",
    lastName: userProfileData?.lastName || "",
    email: userProfileData?.email || "",
    phoneNumber: userProfileData?.phone || "",
    photo: "",
    message: "",
  };
  const csFormik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("الاسم الأول مطلوب"),
      lastName: Yup.string().required("اسم العائلة مطلوب"),
      email: Yup.string()
        .required("البريد الإلكتروني مطلوب")
        .email("يرجى إدخال بريد إلكتروني صحيح"),
      phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
      message: Yup.string().required("الرسالة مطلوبة"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const truncateFileName = (fileName) => {
    const maxLength = 15;
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength)}...`
      : fileName;
  };

  return (
    <div className={`${styles.sectionGap} my-12 flex flex-col items-center`}>
      <h1 className="mx-auto mb-12 w-fit rounded-3xl border-2 border-primary px-4 py-4 text-center text-3xl font-extrabold text-gray-600 md:text-3xl">
        تواصل معنا
      </h1>
      <div className="flex flex-col overflow-hidden rounded-2xl bg-gray-800 max-sm:w-full md:flex-row">
        <div className="flex w-full items-center px-6 py-6 max-md:hidden md:w-1/2">
          <div className="relative h-[40rem] w-[40rem] overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <img
              src="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020425/Categories%20and%20Jobs/Khedma%20Website%20Images/ubsnwdybkgnikivbiqwn.jpg"
              alt="Contact"
              className="h-full w-full object-cover opacity-80 shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex w-full flex-col p-8 md:w-1/2" dir="rtl">
          <h3 className="mb-4 text-center text-[1.1rem] text-sm font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
            رضاك هو هدفنا
          </h3>
          <h4 className="mb-6 text-center text-[1.1rem] text-sm font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
            نحن هنا لمساعدتك في الحصول على أفضل تجربة
          </h4>
          <form
            onSubmit={csFormik.handleSubmit}
            className="flex flex-col gap-4"
          >
            <Input
              id="firstName"
              label="الاسم الأول"
              {...csFormik.getFieldProps("firstName")}
              isInvalid={
                csFormik.touched.firstName && csFormik.errors.firstName
              }
              errorMessage={csFormik.errors.firstName}
              css={{
                backgroundColor: "4CB050",
                color: "#004d00",
                backdropFilter: "blur(5px)",
              }}
            />
            <Input
              id="lastName"
              label="اسم العائلة"
              {...csFormik.getFieldProps("lastName")}
              isInvalid={csFormik.touched.lastName && csFormik.errors.lastName}
              errorMessage={csFormik.errors.lastName}
              css={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "#004d00",
                backdropFilter: "blur(5px)",
              }}
            />
            <Input
              id="email"
              type="email"
              label="البريد الإلكتروني"
              {...csFormik.getFieldProps("email")}
              isInvalid={csFormik.touched.email && csFormik.errors.email}
              errorMessage={csFormik.errors.email}
              css={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "#004d00",
                backdropFilter: "blur(5px)",
              }}
            />
            <Input
              id="phoneNumber"
              label="رقم الهاتف"
              {...csFormik.getFieldProps("phoneNumber")}
              isInvalid={
                csFormik.touched.phoneNumber && csFormik.errors.phoneNumber
              }
              errorMessage={csFormik.errors.phoneNumber}
              css={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "#004d00",
                backdropFilter: "blur(5px)",
              }}
            />
            <textarea
              id="message"
              placeholder="رسالتك"
              className="w-full rounded border bg-green-300 p-2 text-black"
              {...csFormik.getFieldProps("message")}
              style={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000000",
                backdropFilter: "blur(5px)",
              }}
            />
            {csFormik.touched.message && csFormik.errors.message ? (
              <div className="text-red-500">{csFormik.errors.message}</div>
            ) : null}
            <div className="flex w-full items-center justify-between">
              <div className="relative w-full">
                {selectedFile && (
                  <div className="absolute left-4 top-7 z-10 -translate-y-1/2 transform text-white">
                    {truncateFileName(selectedFile.name)}
                  </div>
                )}
                <label
                  htmlFor="file-upload"
                  className="relative z-0 mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-primary p-2 hover:bg-primary-800"
                  style={{
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <IconPaperclip className="text-white" />
                  <span className="text-white">اضف صورة</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            <button
              type="submit"
              className="hover:scale-101 active:scale-98 relative overflow-hidden rounded bg-gray-50 px-4 py-2 font-bold text-secondary transition-transform duration-200 ease-in-out hover:shadow-md"
            >
              <span className="absolute inset-0 scale-0 transform rounded border-2 border-green-500 transition-transform duration-200 ease-in-out hover:scale-100"></span>
              <span className="relative z-10 text-primary">إرسال</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
