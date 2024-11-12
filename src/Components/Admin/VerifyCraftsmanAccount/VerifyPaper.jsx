import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  Image,
  Button,
  CardFooter,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import {
  IconBan,
  IconBookmarkFilled,
  IconCircleDashedCheck,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";

export default function VerifyPaper({
  title,
  document,
  approveEndpoint,
  rejectEndpoint,
  approveMessage,
  getCraftsmanApplication,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rejectForm, setRejectForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { token, bearerKey } = useContext(authContext);

  const handleOpen = () => {
    onOpen();
  };

  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string()
      .required("ادخل سبب رفض المستند")
      .matches(
        /^[\u0600-\u06FF\s]+$/,
        "يجب أن تحتوي الرسالة على أحرف عربية فقط",
      )
      .min(5, "يجب أن تتكون الرسالة من 5 أحرف على الأقل")
      .max(50, "يجب أن لا تتجاوز الرسالة عن 50 حرفًا"),
  });

  function handleSuccessResponse(resetForm = () => {}) {
    toast.success("👏 ! تمت العملية بنجاح", {
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
    getCraftsmanApplication();
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

  async function onSubmit(values, { resetForm }) {
    setIsLoading(true);
    setRejectForm(true);
    try {
      await api.patch(
        rejectEndpoint,
        {},
        {
          params: {
            response: values.message,
          },
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(resetForm);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function approvePaper() {
    setIsLoading(true);
    setRejectForm(true);
    try {
      await api.patch(
        approveEndpoint,
        {},
        {
          params: {
            response: approveMessage,
          },
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse();
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const sendRejectEmailFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <Card dir="rtl" className="w-fll bg-gray-800 lg:w-1/3" shadow="none">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-xl font-medium text-white">{title} </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="items-center justify-start text-right">
          <Image
            isZoomed
            alt="national id"
            className="max-h-52 w-full cursor-pointer"
            src={document.secure_url}
            onClick={handleOpen}
          />
        </CardBody>
        {document.status === "approved" ? (
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Button color="primary" disabled>
              <IconCircleDashedCheck stroke={2} />
              تم الموافقة علي المستند
            </Button>
          </CardFooter>
        ) : document.status === "rejected" ? (
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Button color="danger" disabled>
              <IconBan stroke={2} />
              تم رفض المستند
            </Button>
          </CardFooter>
        ) : rejectForm ? (
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Button color="primary" onClick={approvePaper}>
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
                  <IconCircleDashedCheck stroke={2} />
                  موافقة
                </>
              )}
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setRejectForm(false);
              }}
            >
              <IconBan stroke={2} />
              رفض
            </Button>
          </CardFooter>
        ) : (
          <CardFooter>
            <form
              onSubmit={sendRejectEmailFormik.handleSubmit}
              className="flex w-full flex-col gap-y-4"
            >
              <Textarea
                isRequired
                label="سبب الرفض"
                labelPlacement="outside"
                placeholder="سبب الرفض"
                className="w-full"
                color={
                  sendRejectEmailFormik.touched.message &&
                  sendRejectEmailFormik.errors.message
                    ? "danger"
                    : ""
                }
                isInvalid={
                  sendRejectEmailFormik.touched.message &&
                  sendRejectEmailFormik.errors.message
                }
                errorMessage={sendRejectEmailFormik.errors.message}
                {...sendRejectEmailFormik.getFieldProps("message")}
              />
              <div className="flex gap-x-2">
                <Button color="primary" type="submit">
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
                      <IconBookmarkFilled stroke={2} />
                      حفظ
                    </>
                  )}
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setRejectForm(true);
                    sendRejectEmailFormik.resetForm();
                  }}
                >
                  <IconCircleXFilled stroke={2} />
                  الغاء
                </Button>
              </div>
            </form>
          </CardFooter>
        )}
        <Divider />
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="items-center">
                <Image
                  alt="national id"
                  className="m-auto block h-full w-full"
                  src={document.secure_url}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  اغلاق
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
