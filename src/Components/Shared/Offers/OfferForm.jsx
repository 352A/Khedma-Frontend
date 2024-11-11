import api from "../../utils/api";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authContext } from "../../../Context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Chip,
  Textarea,
  DateRangePicker,
} from "@nextui-org/react";
import {
  IconTrash,
  IconBookmark,
  IconEdit,
  IconCancel,
  IconThumbDownFilled,
  IconSquareRoundedCheckFilled,
  IconStopwatch,
  IconAddressBook,
  IconFileDescription,
  IconHome,
  IconPremiumRights,
  IconCalendarMonth,
  IconTrashFilled,
  IconCircleCheck,
} from "@tabler/icons-react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import formatDateToISO from "../../utils/convertISOToCustomFormat";
import convertISOToCustomFormat from "../../utils/convertISOToCustomFormat";
import { I18nProvider } from "@react-aria/i18n";
import DetailsForm from "../Orders/DetailsForm";

export default function OfferForm({ offerID, offerDetails, getofferDetails }) {
  const acceptEndpoint = `craftsman/offers/${offerID}/accept`;
  const rejectEndpoint = `craftsman/offers/${offerID}/reject`;
  const updateEndpoint = `user/offers/${offerID}/update`;
  const cancelEndpoint = `user/offers/${offerID}/cancel`;

  const { token, bearerKey, userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [acceptOffer, setAcceptOffer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    offerTitle: offerDetails?.offerTitle || "",
    offerDescription: offerDetails?.offerDescription || "",
    amount: offerDetails?.amount || 0,
    address: offerDetails?.address || "",
    startDate: convertISOToCustomFormat(offerDetails?.startDate),
    deliveryDate: convertISOToCustomFormat(offerDetails?.deliveryDate),
  };

  const validationSchema = Yup.object({
    offerTitle: Yup.string()
      .required("عنوان العرض مطلوب")
      .max(100, "يجب ألا يتجاوز عنوان العرض 100 حرف"),
    offerDescription: Yup.string()
      .min(20, "يجب ألا يقل وصف العرض عن 20 حرف")
      .max(1000, "يجب ألا يتجاوز وصف العرض 1000 حرف"),
    address: Yup.string()
      .required("العنوان مطلوب")
      .min(5, "يجب أن يتكون العنوان من 5 أحرف على الأقل")
      .max(50, "يجب أن لا يتجاوز العنوان 50 حرفًا")
      .matches(
        /^[\u0600-\u06FF0-9\s\p{P}]+$/u,
        "العنوان يجب أن يحتوي على أحرف عربية وأرقام وعلامات ترقيم فقط",
      ),
    amount: Yup.number().required("المبلغ مطلوب").min(0, "يجب تحديد المبلغ"),
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

  function handleSuccessResponse(data) {
    toast.success(`👏 ! ${data.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
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
      const { data } = await api.put(updateEndpoint, values, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse(data);
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
      setIsUpdate(!isUpdate);
    }
  }

  async function cancelOffer() {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        cancelEndpoint,
        {},
        {
          headers: {
            authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(data);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
      getofferDetails();
    }
  }

  async function acceptOfferHandler() {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        acceptEndpoint,
        {},
        {
          headers: {
            authorization: `${bearerKey}${token}`,
          },
        },
      );
      getofferDetails();
      handleSuccessResponse(data);
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
      setIsUpdate(!isUpdate);
    }
  }

  async function rejectOfferHandler() {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        rejectEndpoint,
        {},
        {
          headers: {
            authorization: `${bearerKey}${token}`,
          },
        },
      );
      getofferDetails();
      handleSuccessResponse(data);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const updateOfferFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  const { resetForm } = updateOfferFormik;

  return (
    <>
      <div className="rounded-2xl bg-gray-100 p-5 shadow">
        <div className="mb-6 flex w-full flex-row items-center justify-between">
          <h2 className="text-lg font-extrabold md:text-3xl">تفاصيل العرض</h2>
          <div>
            {offerDetails.status === "pending" ? (
              <Chip
                variant="flat"
                color="warning"
                radius="lg"
                size="lg"
                className="py-5 text-warning"
              >
                <IconStopwatch
                  size={30}
                  className="me-2 inline-block text-warning"
                />
                قيد الانتظار
              </Chip>
            ) : offerDetails.status === "accepted" ? (
              <Chip
                variant="flat"
                color="primary"
                radius="lg"
                size="lg"
                className="py-5 text-primary"
              >
                <IconSquareRoundedCheckFilled
                  size={30}
                  className="me-2 inline-block text-primary"
                />
                تم الموافقة
              </Chip>
            ) : offerDetails.status === "rejected" ? (
              <Chip
                variant="flat"
                color="danger"
                radius="lg"
                size="lg"
                className="py-5 text-danger"
              >
                <IconThumbDownFilled
                  size={30}
                  className="me-2 inline-block text-danger"
                />
                تم الرفض
              </Chip>
            ) : (
              <Chip
                variant="flat"
                color="danger"
                radius="lg"
                size="lg"
                className="py-5 text-danger"
              >
                <IconCancel
                  size={30}
                  className="me-2 inline-block text-danger"
                />
                تم الالغاء
              </Chip>
            )}
          </div>
        </div>

        {userData.role === "user" ? (
          <form onSubmit={updateOfferFormik.handleSubmit} className="">
            <div className="mb-4 w-full">
              <IconAddressBook
                color="#4CAF50"
                className="me-1 inline-block"
                stroke={2}
              />
              <label className="mb-1 text-primary">عنوان العرض</label>
              <Input
                id="offerTitle"
                type="text"
                placeholder="عنوان العرض"
                variant="solid"
                color={
                  updateOfferFormik.touched.offerTitle &&
                  updateOfferFormik.errors.offerTitle
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  updateOfferFormik.touched.offerTitle &&
                  updateOfferFormik.errors.offerTitle
                }
                isDisabled={!isUpdate}
                errorMessage={updateOfferFormik.errors.offerTitle}
                {...updateOfferFormik.getFieldProps("offerTitle")}
              />
            </div>
            <div className="mb-4 w-full">
              <IconFileDescription
                color="#4CAF50"
                className="me-1 inline-block"
                stroke={2}
              />
              <label className="mb-1 text-primary">تفاصيل العرض</label>
              <Textarea
                dir="rtl"
                placeholder="اكتب وصف الخدمة المطلوبة.."
                id="offerDescription"
                variant="flat"
                color={
                  updateOfferFormik.touched.offerDescription &&
                  updateOfferFormik.errors.offerDescription
                    ? "danger"
                    : ""
                }
                isInvalid={
                  updateOfferFormik.touched.offerDescription &&
                  updateOfferFormik.errors.offerDescription
                }
                isDisabled={!isUpdate}
                errorMessage={updateOfferFormik.errors.offerDescription}
                {...updateOfferFormik.getFieldProps("offerDescription")}
              />
            </div>
            <div className="mb-4 w-full">
              <IconHome
                color="#4CAF50"
                className="me-1 inline-block"
                stroke={2}
              />
              <label className="mb-1 text-primary">العنوان</label>
              <Input
                id="offerTitle"
                type="text"
                placeholder="العنوان"
                variant="solid"
                color={
                  updateOfferFormik.touched.address &&
                  updateOfferFormik.errors.address
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  updateOfferFormik.touched.address &&
                  updateOfferFormik.errors.address
                }
                isDisabled={!isUpdate}
                errorMessage={updateOfferFormik.errors.address}
                {...updateOfferFormik.getFieldProps("address")}
              />
            </div>
            <div className="mb-4 w-full">
              <IconPremiumRights
                color="#4CAF50"
                className="me-1 inline-block"
                stroke={2}
              />
              <label className="mb-1 text-primary">السعر</label>
              <Input
                id="amount"
                type="number"
                label="المبلغ (ج.م.)"
                variant="solid"
                color={
                  updateOfferFormik.touched.amount &&
                  updateOfferFormik.errors.amount
                    ? "danger"
                    : "primary"
                }
                isInvalid={
                  updateOfferFormik.touched.amount &&
                  updateOfferFormik.errors.amount
                }
                isDisabled={!isUpdate}
                errorMessage={updateOfferFormik.errors.amount}
                {...updateOfferFormik.getFieldProps("amount")}
              />
            </div>
            <div className="mb-10 w-full">
              <IconCalendarMonth
                color="#4CAF50"
                className="me-1 inline-block"
                stroke={2}
              />
              <label className="mb-1 text-primary">الفترة الزمنية</label>
              <I18nProvider locale="en-GB">
                <DateRangePicker
                  dir="rtl"
                  label="اختر مدة بداية و نهاية الخدمة"
                  defaultValue={{
                    start: parseDate(updateOfferFormik.values.startDate),

                    end: parseDate(updateOfferFormik.values.deliveryDate),
                  }}
                  description="*اختر نفس التاريخ ان كانت الخدمة تستغرق يوم واحد"
                  variant="solid"
                  color={
                    updateOfferFormik.touched.startDate &&
                    updateOfferFormik.errors.startDate
                      ? "danger"
                      : "primary"
                  }
                  isInvalid={
                    updateOfferFormik.touched.startDate &&
                    updateOfferFormik.errors.startDate
                  }
                  isDisabled={!isUpdate}
                  errorMessage={updateOfferFormik.errors.startDate}
                  onChange={(date) => {
                    updateOfferFormik.setFieldValue(
                      "startDate",
                      formatDateToISO(date.start),
                    );
                    updateOfferFormik.setFieldValue(
                      "deliveryDate",
                      formatDateToISO(date.end),
                    );
                  }}
                />
              </I18nProvider>
            </div>
            <div
              className={`${offerDetails?.status != "pending" && "hidden"} flex items-center gap-x-2`}
            >
              <Button
                radius="full"
                onClick={() => setIsUpdate(!isUpdate)}
                className={`bg-primary font-bold text-white ${isUpdate ? "hidden" : ""}`}
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
                    <IconEdit stroke={2} size={20} />
                    تعديل
                  </>
                )}
              </Button>
              <Button
                radius="full"
                className={`bg-danger font-bold text-white ${isUpdate ? "hidden" : ""}`}
                isDisabled={isLoading}
                onPress={() => onOpen()}
              >
                <IconCancel stroke={2} size={20} />
                الغاء العرض
              </Button>
              <Button
                type="submit"
                radius="full"
                className={`bg-primary font-bold text-white ${!isUpdate ? "hidden" : ""}`}
                isDisabled={isLoading}
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
                    <IconBookmark stroke={2} size={20} />
                    حفظ
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
                    <IconTrash stroke={2} size={20} />
                    الغاء
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <DetailsForm details={offerDetails} />
            {offerDetails?.status === "pending" && (
              <div className="flex flex-row-reverse items-center justify-end gap-x-2">
                <Button
                  radius="full"
                  className="font-bold text-white"
                  isDisabled={isLoading}
                  onPress={() => {
                    onOpen();
                    setAcceptOffer(true);
                  }}
                  color="danger"
                >
                  <IconTrashFilled stroke={2} size={20} />
                  الغاء العرض
                </Button>
                <Button
                  type="submit"
                  radius="full"
                  className="font-bold text-white"
                  isDisabled={isLoading}
                  color="primary"
                  onPress={() => {
                    onOpen();
                    setAcceptOffer(false);
                  }}
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
                      <IconCircleCheck stroke={2} size={20} />
                      قبول
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} dir="rtl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 px-10 text-2xl">
            {userData.role === "craftsman" ? (
              <>{acceptOffer ? "الغاء العرض" : "قبول العرض"}</>
            ) : (
              "الغاء العرض"
            )}
          </ModalHeader>
          <ModalBody>
            {userData.role === "craftsman" ? (
              <>
                {acceptOffer ? (
                  <p>هل أنت متأكد من الغاء العرض ؟ </p>
                ) : (
                  <p>هل تريد قبول العرض ؟ </p>
                )}
              </>
            ) : (
              <p>هل أنت متأكد من الغاء العرض ؟ </p>
            )}
          </ModalBody>
          <ModalFooter dir="ltr">
            <Button color="primary" variant="light" onPress={onClose}>
              رجوع
            </Button>
            {userData.role === "craftsman" ? (
              <>
                {acceptOffer ? (
                  <Button
                    radius="full"
                    className="font-bold text-white"
                    isDisabled={isLoading}
                    color="danger"
                    onPress={() => {
                      rejectOfferHandler();
                      onClose();
                    }}
                  >
                    الغاء
                    <IconTrashFilled stroke={2} size={20} />
                  </Button>
                ) : (
                  <Button
                    radius="full"
                    className="font-bold text-white"
                    isDisabled={isLoading}
                    color="primary"
                    onPress={() => {
                      acceptOfferHandler();
                      onClose();
                    }}
                  >
                    قبول
                    <IconCircleCheck stroke={2} size={20} />
                  </Button>
                )}
              </>
            ) : (
              <Button
                radius="full"
                className={`bg-danger font-bold text-white ${isUpdate ? "hidden" : ""}`}
                isDisabled={isLoading}
                onPress={() => {
                  cancelOffer();
                  onClose();
                }}
              >
                الغاء العرض
                <IconCancel stroke={2} size={20} />
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
