import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";
import UpdateDetailsForm from "./UpdateDetailsForm";
import Details from "../../Shared/Profile/Components/Details";
import Stars from "../../Shared/Profile/Components/Stars";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ThreeDots } from "react-loader-spinner";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { IconCashRegister } from "@tabler/icons-react";
import UpdateDetailsSkeleton from "./UpdateDetailsSkeleton";

export default function UpdateDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { token, bearerKey } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const detailsEndPoint = `user/${id}/profile`;
  const handleDebtEndpoint = `admin/debt/craftsman/${id}`;

  const initialValues = {
    debtAmount: "",
  };

  const validationSchema = Yup.object({
    debtAmount: Yup.string()
      .required("قيمة المبلغ مطلوبة")
      .typeError("يجب ادخال رقم"),
  });

  function handleSuccessResponse(resetForm) {
    toast.success("👏 ! تم التعديل بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    getDetails();
    onClose();
    resetForm();
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
    try {
      const { data } = await api.patch(handleDebtEndpoint, values, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse(resetForm);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const debtFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  async function getDetails() {
    try {
      const { data } = await api.get(detailsEndPoint);
      setDetails(data.existingUser);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDetails();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {!details ? (
        <UpdateDetailsSkeleton />
      ) : (
        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-9 rounded-xl border bg-gray-800 px-10 py-5">
            <UpdateDetailsForm details={details} getDetails={getDetails} />
          </div>
          <figure className="col-span-3 rounded-xl bg-gray-800 p-8">
            <Details userData={details} />
            <Stars rating={details.averageRating} />
            <p className="my-3 text-center text-white">
              {details.role === "user" ? "عميل" : "مستقل"}
            </p>
            {details.role === "craftsman" && (
              <>
                <p className="text-center text-white">
                  مديونية :
                  {details.accountDebt === 0
                    ? " لا يوجد"
                    : ` ${details.accountDebt}  جنية `}
                </p>
                <Button
                  className="my-3 w-full bg-white"
                  onPress={() => {
                    onOpen();
                  }}
                >
                  تعديل المديونية
                  <IconCashRegister />
                </Button>
              </>
            )}
          </figure>
        </section>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        dir="rtl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={debtFormik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  تعديل المديونية
                </ModalHeader>
                <ModalBody>
                  <p>
                    تعديل مديونية المستقل
                    <span className="font-bold text-gray-800">
                      {`  ${details.firstName} ${details.lastName}`}
                    </span>
                  </p>
                  <Input
                    className="my-3"
                    id="debtAmount"
                    type="number"
                    placeholder="المبلغ"
                    variant="solid"
                    isInvalid={
                      debtFormik.touched.debtAmount &&
                      debtFormik.errors.debtAmount
                    }
                    errorMessage={debtFormik.errors.debtAmount}
                    {...debtFormik.getFieldProps("debtAmount")}
                  />
                </ModalBody>
                <ModalFooter dir="ltr">
                  <Button color="danger" variant="light" onPress={onClose}>
                    رجوع
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                    radius="full"
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
                      "تعديل"
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
