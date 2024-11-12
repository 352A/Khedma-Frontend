import api from "../../utils/api";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../../Context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconSquareRoundedCheck,
  IconTrashFilled,
  IconPlayerPlayFilled,
  IconCarambolaFilled,
} from "@tabler/icons-react";
import DetailsForm from "./DetailsForm";
import SendRatingForm from "./SendRatingForm";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderDetailsForm({
  orderID,
  orderDetails,
  getOrderDetails,
}) {
  const inProgressEndpoint = `craftsman//orders/${orderID}/inProgress`;
  const craftsmanCompletedEndpoint = `craftsman//orders/${orderID}/completed`;
  const craftsmanCanceledEndpoint = `craftsman//orders/${orderID}/cancelled`;
  const userCanceledEndpoint = `user/orders/${orderID}/cancelled`;
  const userCompletedEndpoint = `user/orders/${orderID}/completed`;

  const { token, bearerKey, userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    getOrderDetails();
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

  async function setOrderStatusHandler(endPoint) {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        endPoint,
        {},
        {
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(data);
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10 rounded-2xl bg-gray-100 p-5 shadow">
        <div className="mb-6 flex w-full flex-row flex-wrap items-center justify-between gap-y-4">
          <h2 className="text-lg font-extrabold md:text-3xl">تفاصيل الطلب</h2>
          <div>
            <OrderStatusBadge
              orderStatus={orderDetails?.status}
              isDeliveredByCraftsman={orderDetails?.isDeliveredByCraftsman}
              isDeliveredByUser={orderDetails?.isDeliveredByUser}
              role={userData.role}
              size="lg"
              iconSize={20}
            />
          </div>
        </div>

        <DetailsForm details={orderDetails.orderDetails} />

        {userData.role === "craftsman" ? (
          <div>
            {orderDetails?.status === "pending" && (
              <div className="flex flex-row items-center gap-x-2">
                <Button
                  radius="full"
                  className="font-bold text-white"
                  isDisabled={isLoading}
                  onPress={() => {
                    onOpen();
                    setButtonStatus("in progress");
                  }}
                  color="primary"
                >
                  <IconPlayerPlayFilled stroke={2} size={20} />
                  ابدأ العمل
                </Button>
                <Button
                  type="submit"
                  radius="full"
                  className="font-bold text-white"
                  color="danger"
                  onPress={() => {
                    onOpen();
                    setButtonStatus("cancel");
                  }}
                >
                  <>
                    <IconTrashFilled stroke={2} size={20} />
                    الغاء
                  </>
                </Button>
              </div>
            )}
            {orderDetails?.status === "arrived" &&
            !orderDetails?.isDeliveredByCraftsman ? (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-white"
                isDisabled={isLoading}
                color="primary"
                onPress={() => {
                  onOpen();
                  setButtonStatus("arrived");
                }}
              >
                <>
                  <IconSquareRoundedCheck stroke={2} size={20} />
                  اكتمل
                </>
              </Button>
            ) : (
              ""
            )}
            {orderDetails?.status === "completed" && (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-white"
                color="warning"
                onPress={() => {
                  onOpen();
                  setButtonStatus("review");
                }}
              >
                <>
                  <IconCarambolaFilled stroke={2} size={20} />
                  تقييم
                </>
              </Button>
            )}
            {orderDetails?.status === "arrived" &&
            orderDetails?.isDeliveredByCraftsman ? (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-gray-800"
                isDisabled
                color="secondary"
              >
                <>
                  <IconCarambolaFilled stroke={2} size={20} />
                  يمكنك اعطاء تقيم بعد انهاء الطلب من طرف العميل
                </>
              </Button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            {orderDetails?.status === "pending" && (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-white"
                color="danger"
                onPress={() => {
                  onOpen();
                  setButtonStatus("cancel");
                }}
              >
                <>
                  <IconTrashFilled stroke={2} size={20} />
                  الغاء الطلب
                </>
              </Button>
            )}
            {orderDetails?.status === "arrived" &&
            !orderDetails?.isDeliveredByUser ? (
              <Button
                radius="full"
                className="font-bold text-white"
                isDisabled={isLoading}
                color="primary"
                onPress={() => {
                  onOpen();
                  setButtonStatus("arrived");
                }}
              >
                اكتمل <IconSquareRoundedCheck stroke={2} size={20} />
              </Button>
            ) : (
              ""
            )}
            {orderDetails?.status === "arrived" &&
            orderDetails?.isDeliveredByUser ? (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-gray-800"
                isDisabled
                color="secondary"
              >
                <>
                  <IconCarambolaFilled stroke={2} size={20} />
                  يمكنك اعطاء تقيم بعد انهاء الطلب من طرف المستقل
                </>
              </Button>
            ) : (
              ""
            )}
            {orderDetails?.status === "completed" && (
              <Button
                type="submit"
                radius="full"
                className="font-bold text-white"
                color="warning"
                onPress={() => {
                  onOpen();
                  setButtonStatus("review");
                }}
              >
                <>
                  <IconCarambolaFilled stroke={2} size={20} />
                  تقييم
                </>
              </Button>
            )}
          </div>
        )}
      </div>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        dir="rtl"
        placement="top"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">
            {buttonStatus === "cancel" ? (
              <p>الغاء الطلب ؟</p>
            ) : buttonStatus === "in progress" ? (
              <p>بدأ العمل</p>
            ) : buttonStatus === "review" ? (
              <p>ارسال تقييم</p>
            ) : (
              <p>اتمام الخدمة</p>
            )}
          </ModalHeader>
          <ModalBody>
            {buttonStatus === "cancel" ? (
              <p>هل أنت متأكد من الغاء الطلب ؟ </p>
            ) : buttonStatus === "in progress" ? (
              <p>لقد قمت بالتواصل مع العميل و مستعد للبدأ</p>
            ) : buttonStatus === "review" ? (
              <SendRatingForm orderID={orderID} onClose={onClose} />
            ) : (
              <p>لقد قمت بانجاز الخدمة بنجاح</p>
            )}
          </ModalBody>
          <ModalFooter dir="ltr">
            {buttonStatus != "review" && (
              <Button color="primary" variant="light" onPress={onClose}>
                رجوع
              </Button>
            )}
            {buttonStatus === "cancel" ? (
              <>
                {userData.role === "craftsman" ? (
                  <Button
                    radius="full"
                    className="font-bold text-white"
                    isDisabled={isLoading}
                    color="danger"
                    onPress={() => {
                      setOrderStatusHandler(craftsmanCanceledEndpoint);
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
                    color="danger"
                    onPress={() => {
                      setOrderStatusHandler(userCanceledEndpoint);
                      onClose();
                    }}
                  >
                    الغاء
                    <IconTrashFilled stroke={2} size={20} />
                  </Button>
                )}
              </>
            ) : buttonStatus === "in progress" ? (
              <Button
                radius="full"
                className="font-bold text-white"
                isDisabled={isLoading}
                color="primary"
                onPress={() => {
                  onClose();
                  setOrderStatusHandler(inProgressEndpoint);
                }}
              >
                ابدأ
                <IconPlayerPlayFilled stroke={2} size={20} />
              </Button>
            ) : buttonStatus === "arrived" ? (
              <>
                {userData.role === "craftsman" ? (
                  <Button
                    radius="full"
                    className="font-bold text-white"
                    isDisabled={isLoading}
                    color="primary"
                    onPress={() => {
                      setOrderStatusHandler(craftsmanCompletedEndpoint);
                      onClose();
                    }}
                  >
                    اكتمل <IconSquareRoundedCheck stroke={2} size={20} />
                  </Button>
                ) : (
                  <Button
                    radius="full"
                    className="font-bold text-white"
                    isDisabled={isLoading}
                    color="primary"
                    onPress={() => {
                      setOrderStatusHandler(userCompletedEndpoint);
                      onClose();
                    }}
                  >
                    اكتمل <IconSquareRoundedCheck stroke={2} size={20} />
                  </Button>
                )}
              </>
            ) : (
              ""
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
