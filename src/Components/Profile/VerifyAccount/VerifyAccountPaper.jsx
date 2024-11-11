import { useContext, useRef, useState } from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import { authContext } from "../../../Context/AuthContext";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { IconPlus } from "@tabler/icons-react";
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
} from "@nextui-org/react";

export default function VerifyAccountPaper({
  uploadEndPoint,
  updateEndPoint,
  paperUrl,
  status,
  getCraftsmanApplication,
  title,
}) {
  const { token, bearerKey } = useContext(authContext);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefUpload = useRef(null);
  const inputRefUpdate = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  const handleIconClickUpdate = () => {
    inputRefUpdate.current.click();
  };
  const handleIconClickUpload = () => {
    inputRefUpload.current.click();
  };

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
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setPreview(null);
  }

  function handleSuccessResponse() {
    toast.success(" تم رفع المستند بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
    });
    getCraftsmanApplication();
  }

  async function uploadPaper(formData) {
    setIsLoading(true);
    try {
      await api.post(uploadEndPoint, formData, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse();
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updatePaper(formData) {
    setIsLoading(true);
    try {
      await api.put(updateEndPoint, formData, {
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
    }
  }

  function handleSelectImg(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error(`برجاء رفع صوره  صحيحة`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      if (paperUrl) {
        updatePaper(formData);
      } else {
        uploadPaper(formData);
      }

      e.target.value = null;
    }
  }

  return (
    <>
      <Card dir="rtl" className="w-full bg-gray-800 lg:w-1/3" shadow="none">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-xl font-medium text-white">{title} </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="text-right">
          {paperUrl ? (
            <figure
              className={`${
                status === "pending"
                  ? "border-cyan-700"
                  : status === "approved"
                    ? "border-primary"
                    : status === "rejected"
                      ? "border-red-600"
                      : "border-white"
              } h-full overflow-hidden rounded-xl border-4 border-dashed p-2`}
            >
              <Image
                isZoomed
                alt="national id"
                className="h-full w-full cursor-pointer object-cover"
                src={preview || paperUrl}
                onClick={handleOpen}
              />
            </figure>
          ) : (
            <figure className="mb-4 flex h-[200px] items-center justify-center overflow-hidden rounded-xl border-4 border-dashed border-secondary object-cover">
              {!isLoading ? (
                <IconPlus stroke={2} size={50} className="text-secondary" />
              ) : (
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </figure>
          )}
        </CardBody>
        <CardFooter>
          {status === "rejected" ? (
            <>
              <Button
                type="submit"
                onClick={handleIconClickUpdate}
                disabled={isLoading}
                radius="full"
                className="w-full bg-red-600 px-6 py-2 text-white"
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
                  " تم رفض المستند انقر هنا للتعديل "
                )}
              </Button>
              <input
                ref={inputRefUpdate}
                type="file"
                id="uploadAvatar"
                onChange={handleSelectImg}
                accept="image/*"
                aria-label="upload"
                hidden
              />
            </>
          ) : status === "approved" || status === "pending" ? (
            <p
              className={`w-full rounded-full px-6 py-2 text-center text-white ${status === "pending" ? "bg-cyan-700" : "bg-primary"}`}
            >
              {status === "approved"
                ? "تم توثيق المستند بنجاح"
                : "المستند قيد المراجعة"}
            </p>
          ) : (
            <>
              <Button
                type="submit"
                onClick={handleIconClickUpload}
                disabled={isLoading}
                radius="full"
                className="w-full bg-secondary px-6 py-2 text-primary"
              >
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="25"
                    width="35"
                    color="#4CAF50"
                    radius="14"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  "اختر صورة"
                )}
              </Button>
              <input
                ref={inputRefUpload}
                type="file"
                id="uploadAvatar"
                onChange={handleSelectImg}
                accept="image/*"
                aria-label="upload"
                hidden
              />
            </>
          )}
        </CardFooter>
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
                  src={preview || paperUrl}
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
