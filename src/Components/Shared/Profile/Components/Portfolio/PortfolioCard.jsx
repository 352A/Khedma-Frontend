import {
  Card,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  CardHeader,
  Button,
} from "@nextui-org/react";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { authContext } from "../../../../../Context/AuthContext";
import PortfolioForm from "./PortfolioForm";
import { toast } from "react-toastify";
import api from "../../../../utils/api";
import { ThreeDots } from "react-loader-spinner";

export default function PortfolioCard({ card, getPortfolio }) {
  const { token, bearerKey } = useContext(authContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalStatus, setModalStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const endpoint = `craftsman/portfolio/${card._id}`;

  function handleSuccessResponse() {
    toast.success("🎉 ! تمت حذف العمل بنجاح", {
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
    getPortfolio();
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

  async function deletePortfolioItem() {
    setIsLoading(true);
    try {
      await api.delete(endpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
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

  return (
    <>
      <Card
        isFooterBlurred
        className="h-[300px] w-full flex-none shadow-none md:w-1/2 lg:w-1/3"
      >
        {location.pathname === "/profile/gallery" && (
          <CardHeader className="absolute top-1 z-10 flex items-start gap-x-2">
            <Button
              isIconOnly
              color="primary"
              aria-label="Like"
              variant="shadow"
              onClick={() => {
                onOpen();
                setModalStatus("update");
              }}
            >
              <IconEdit />
            </Button>
            <Button
              isIconOnly
              color="danger"
              variant="shadow"
              aria-label="Take a photo"
              onClick={() => {
                onOpen();
                setModalStatus("delete");
              }}
            >
              <IconTrashFilled />
            </Button>
          </CardHeader>
        )}
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 h-full w-full cursor-pointer object-cover"
          src={card.portfolioPic}
          onClick={() => {
            onOpen();
            setModalStatus("show");
          }}
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 text-white dark:border-default-100">
          <p className="text-xs">{card.title}</p>
        </CardFooter>
      </Card>

      <Modal
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="2xl"
        dir="rtl"
      >
        {modalStatus === "update" ? (
          <ModalContent className="bg-gray-200">
            {(onClose) => (
              <>
                <ModalHeader className="text-primary">
                  <h3>تعديل العمل</h3>
                </ModalHeader>
                <ModalBody>
                  <PortfolioForm
                    onClose={onClose}
                    card={card}
                    getPortfolio={getPortfolio}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        ) : modalStatus === "delete" ? (
          <ModalContent className="bg-gray-200">
            {(onClose) => (
              <>
                <ModalHeader>
                  <h3 className="text-danger">ازالة العمل</h3>
                </ModalHeader>
                <ModalBody className="items-start py-8">
                  <p>هل أنت متأكد من ازالة هذا العمل ؟</p>
                </ModalBody>
                <ModalFooter className="justify-start">
                  <Button
                    color="danger"
                    onClick={() => {
                      deletePortfolioItem();
                    }}
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
                      <>
                        <IconTrashFilled />
                        ازالة
                      </>
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        ) : (
          <ModalContent className="bg-gray-200">
            {(onClose) => (
              <>
                <ModalHeader className="text-primary">
                  <h3>{card.title}</h3>
                </ModalHeader>
                <ModalBody>
                  <p>{card.description}</p>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Image
                    alt="national id"
                    className="m-auto block max-h-96"
                    src={card.portfolioPic}
                  />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
