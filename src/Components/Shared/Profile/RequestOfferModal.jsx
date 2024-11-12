import { useState, useContext } from "react";
import api from "../../utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  DateRangePicker,
} from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import formatDateToISO from "../../utils/convertISOToCustomFormat";
import { I18nProvider } from "@react-aria/i18n";
import { IconCash, IconCreditCard } from "@tabler/icons-react";
import { authContext } from "../../../Context/AuthContext";
import { cities } from "../../../constants/cities";

export default function OfferModal({
  userData,
  isOpen,
  onOpenChange,
  onClose,
}) {
  const { token, bearerKey } = useContext(authContext);
  const endpoint = `user/offers/${userData._id}`;
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    jobCategory: userData?.jobCategory || "",
    jobType: userData?.jobType || "",
    offerTitle: "",
    offerDescription: "",
    city: "",
    address: "",
    amount: "",
    paymentMethod: "",
    startDate: "",
    deliveryDate: "",
  };

  const validationSchema = Yup.object({
    offerTitle: Yup.string()
      .required("عنوان الخدمة مطلوب")
      .max(100, "يجب ألا يتجاوز عنوان الخدمة 100 حرف"),
    offerDescription: Yup.string()
      .required("وصف الخدمة مطلوب")
      .min(20, "يجب ألا يقل وصف الخدمة عن 20 حرف")
      .max(1000, "يجب ألا يتجاوز وصف الخدمة 1000 حرف"),
    city: Yup.string().required("يجب تحديد المدينة"),
    address: Yup.string()
      .required("العنوان مطلوب")
      .min(5, "يجب أن يتكون العنوان من 5 أحرف على الأقل")
      .max(50, "يجب أن لا يتجاوز العنوان 50 حرفًا")
      .matches(
        /^[\u0600-\u06FF0-9\s\p{P}]+$/u,
        "العنوان يجب أن يحتوي على أحرف عربية وأرقام وعلامات ترقيم فقط",
      ),
    amount: Yup.number().required("المبلغ مطلوب").min(0, "يجب تحديد المبلغ"),
    paymentMethod: Yup.string().required("يجب تحديد وسيلة الدفع"),
    startDate: Yup.string()
      .required("تاريخ البدء مطلوب")
      .test(
        "is-future-date",
        "تاريخ البدء يجب أن يكون بعد اليوم",
        function (value) {
          return value >= today(getLocalTimeZone()).toString();
        },
      ),
    deliveryDate: Yup.string().required("تاريخ الانتهاء مطلوب"),
  });

  function handleSuccessResponse() {
    toast.success("🎉 ! تم ارسال طلبك بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    onClose();
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
      await api.post(endpoint, values, {
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

  const offerRequestFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        dir="rtl"
        className="mx-2 p-2"
        placement="top"
        size="xl"
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                طلب خدمة جديدة
              </ModalHeader>
              <form onSubmit={offerRequestFormik.handleSubmit}>
                <ModalBody>
                  <Input
                    id="offerTitle"
                    type="text"
                    label="عنوان الخدمة"
                    color={
                      offerRequestFormik.touched.offerTitle &&
                      offerRequestFormik.errors.offerTitle
                        ? "danger"
                        : ""
                    }
                    isInvalid={
                      offerRequestFormik.touched.offerTitle &&
                      offerRequestFormik.errors.offerTitle
                    }
                    errorMessage={offerRequestFormik.errors.offerTitle}
                    {...offerRequestFormik.getFieldProps("offerTitle")}
                  />
                  <Textarea
                    id="offerDescription"
                    label="وصف الخدمة"
                    placeholder="اكتب وصف الخدمة المطلوبة.."
                    color={
                      offerRequestFormik.touched.offerDescription &&
                      offerRequestFormik.errors.offerDescription
                        ? "danger"
                        : ""
                    }
                    isInvalid={
                      offerRequestFormik.touched.offerDescription &&
                      offerRequestFormik.errors.offerDescription
                    }
                    errorMessage={offerRequestFormik.errors.offerDescription}
                    {...offerRequestFormik.getFieldProps("offerDescription")}
                  />
                  <div className="flex gap-2">
                    <Input
                      id="amount"
                      type="text"
                      label="المبلغ (ج.م.)"
                      className="w-2/5"
                      color={
                        offerRequestFormik.touched.amount &&
                        offerRequestFormik.errors.amount
                          ? "danger"
                          : ""
                      }
                      isInvalid={
                        offerRequestFormik.touched.amount &&
                        offerRequestFormik.errors.amount
                      }
                      errorMessage={offerRequestFormik.errors.amount}
                      {...offerRequestFormik.getFieldProps("amount")}
                    />
                    <Select
                      id="paymentMethod"
                      label="وسيلة الدفع"
                      className="w-3/5"
                      color={
                        offerRequestFormik.touched.paymentMethod &&
                        offerRequestFormik.errors.paymentMethod
                          ? "danger"
                          : ""
                      }
                      disabled={!offerRequestFormik.values.paymentMethod}
                      isInvalid={
                        offerRequestFormik.touched.paymentMethod &&
                        offerRequestFormik.errors.paymentMethod
                      }
                      errorMessage={offerRequestFormik.errors.paymentMethod}
                      {...offerRequestFormik.getFieldProps("paymentMethod")}
                    >
                      <SelectItem key="cash" startContent={<IconCash />}>
                        كاش
                      </SelectItem>
                      <SelectItem key="visa" startContent={<IconCreditCard />}>
                        بطاقة ائتمان
                      </SelectItem>
                    </Select>
                  </div>
                  <Select
                    id="city"
                    label="المدينة"
                    color={
                      offerRequestFormik.touched.city &&
                      offerRequestFormik.errors.city
                        ? "danger"
                        : ""
                    }
                    disabled={!offerRequestFormik.values.city}
                    isInvalid={
                      offerRequestFormik.touched.city &&
                      offerRequestFormik.errors.city
                    }
                    errorMessage={offerRequestFormik.errors.city}
                    {...offerRequestFormik.getFieldProps("city")}
                  >
                    {cities.map((city) => (
                      <SelectItem key={city}>{city}</SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    id="address"
                    type="text"
                    label="العنوان"
                    color={
                      offerRequestFormik.touched.address &&
                      offerRequestFormik.errors.address
                        ? "danger"
                        : ""
                    }
                    isInvalid={
                      offerRequestFormik.touched.address &&
                      offerRequestFormik.errors.address
                    }
                    errorMessage={offerRequestFormik.errors.address}
                    {...offerRequestFormik.getFieldProps("address")}
                  />

                  <I18nProvider locale="en-GB">
                    <DateRangePicker
                      dir="rtl"
                      label="اختر مدة بداية و نهاية الخدمة"
                      defaultValue={{
                        start: today(getLocalTimeZone()),
                        end: today(getLocalTimeZone()),
                      }}
                      description="*اختر نفس التاريخ ان كانت الخدمة تستغرق يوم واحد"
                      variant="solid"
                      color={
                        offerRequestFormik.touched.startDate &&
                        offerRequestFormik.errors.startDate
                          ? "danger"
                          : ""
                      }
                      isInvalid={
                        offerRequestFormik.touched.startDate &&
                        offerRequestFormik.errors.startDate
                      }
                      errorMessage={offerRequestFormik.errors.startDate}
                      onChange={(date) => {
                        offerRequestFormik.setFieldValue(
                          "startDate",
                          formatDateToISO(date.start),
                        );
                        offerRequestFormik.setFieldValue(
                          "deliveryDate",
                          formatDateToISO(date.end),
                        );
                      }}
                    />
                  </I18nProvider>
                </ModalBody>
                <ModalFooter dir="ltr">
                  <Button color="danger" variant="light" onPress={onClose}>
                    إغلاق
                  </Button>
                  <Button type="submit" color="primary" disabled={isLoading}>
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
                      "إرسال"
                    )}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
