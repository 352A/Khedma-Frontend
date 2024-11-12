import { useState, useContext } from "react";
import api from "../../utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { authContext } from "../../../Context/AuthContext";
import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";

export default function SendRatingForm({ orderID, onClose }) {
  const { token, bearerKey, userData } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const craftsmanEndPoint = `craftsman/reviews/${orderID}`;
  const userEndPoint = `user/reviews/${orderID}`;
  const endpoint =
    userData.role === "craftsman" ? craftsmanEndPoint : userEndPoint;
  const initialValues = {
    reviewTitle: "",
    reviewDescription: "",
    rating: 3,
  };

  const validationSchema = Yup.object({
    reviewTitle: Yup.string()
      .required("ضع عنوان للتقييم")
      .max(100, "يجب ألا يتجاوز عنوان التقييم 100 حرف"),
    reviewDescription: Yup.string()
      .required("وصف الخدمة مطلوب")
      .max(1000, "يجب ألا يتجاوز التقييم  1000 حرف"),
  });

  function handleSuccessResponse() {
    toast.success("🎉 ! تم ارسال تقييمك بنجاح", {
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
      await api.post(endpoint, values, {
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

  const sendRatingFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <form onSubmit={sendRatingFormik.handleSubmit}>
      <Input
        id="reviewTitle"
        type="text"
        label="عنوان التقييم"
        className="mb-4"
        color={
          sendRatingFormik.touched.reviewTitle &&
          sendRatingFormik.errors.reviewTitle
            ? "danger"
            : ""
        }
        isInvalid={
          sendRatingFormik.touched.reviewTitle &&
          sendRatingFormik.errors.reviewTitle
        }
        errorMessage={sendRatingFormik.errors.reviewTitle}
        {...sendRatingFormik.getFieldProps("reviewTitle")}
      />
      <Textarea
        id="reviewDescription"
        className="mb-4"
        placeholder="اكتب تقييمك .."
        color={
          sendRatingFormik.touched.reviewDescription &&
          sendRatingFormik.errors.reviewDescription
            ? "danger"
            : ""
        }
        isInvalid={
          sendRatingFormik.touched.reviewDescription &&
          sendRatingFormik.errors.reviewDescription
        }
        errorMessage={sendRatingFormik.errors.reviewDescription}
        {...sendRatingFormik.getFieldProps("reviewDescription")}
      />
      <div className="mb-6 h-full w-full items-center justify-center gap-2">
        <Slider
          dir="ltr"
          aria-label="Volume"
          size="lg"
          color="warning"
          value={sendRatingFormik.values.rating}
          onChange={(r) => sendRatingFormik.setFieldValue("rating", r)}
          startContent={
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={() =>
                sendRatingFormik.setFieldValue(
                  "rating",
                  sendRatingFormik.values.rating > 1
                    ? sendRatingFormik.values.rating - 1
                    : 1,
                )
              }
            >
              <IconCarambola className="text-2xl text-warning" />
            </Button>
          }
          minValue={1}
          maxValue={5}
          endContent={
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={() =>
                sendRatingFormik.setFieldValue(
                  "rating",
                  sendRatingFormik.values.rating < 5
                    ? sendRatingFormik.values.rating + 1
                    : 5,
                )
              }
            >
              <IconCarambolaFilled className="text-2xl text-warning" />
            </Button>
          }
        />
        <p className="text-center text-small font-medium text-default-500">
          التقييم : {sendRatingFormik.values.rating}
        </p>
      </div>

      <Button
        radius="full"
        className="font-bold text-white"
        isDisabled={isLoading}
        color="warning"
        type="submit"
      >
        ارسال
      </Button>
    </form>
  );
}
