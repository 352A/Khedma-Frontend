import { IconBookmarkFilled, IconFileUpload } from "@tabler/icons-react";
import { useContext, useRef, useState } from "react";
import { authContext } from "../../../../../Context/AuthContext";
import api from "../../../../utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { Button, Input, Textarea } from "@nextui-org/react";

export default function PortfolioForm({ onClose, card, getPortfolio }) {
  const { token, bearerKey } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(card?.portfolioPic || null);
  const inputRefUpload = useRef(null);
  const updateEndpoint = `craftsman/portfolio/${card?._id}`;
  const addEndpoint = `craftsman/portfolio`;

  const initialValues = {
    title: card?.title || "",
    description: card?.description || "",
    image: "",
  };

  const addValidationSchema = Yup.object({
    title: Yup.string()
      .required("عنوان العمل مطلوب")
      .max(50, "يجب ألا يتجاوز عنوان العمل 50 حرف"),
    description: Yup.string()
      .required("وصف العمل مطلوب")
      .min(20, "يجب ألا يقل وصف العمل عن 20 حرف")
      .max(500, "يجب ألا يتجاوز وصف العمل 500 حرف"),
    image: Yup.mixed().required("صورة العمل مطلوبة"),
  });

  const UpdateValidationSchema = Yup.object({
    title: Yup.string().max(50, "يجب ألا يتجاوز عنوان العمل 50 حرف"),
    description: Yup.string()
      .min(20, "يجب ألا يقل وصف العمل عن 20 حرف")
      .max(500, "يجب ألا يتجاوز وصف العمل 500 حرف"),
  });

  function handleSuccessResponse() {
    toast.success("🎉 ! تمت العملية بنجاح", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setPreview(null);
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

  async function addPortfolio(values) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image", values.image);
      await api.post(addEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  async function updatePortfolio(values) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image", values.image);
      await api.put(updateEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  function handleSelectImg(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);

      portfolioFormik.setFieldValue("image", file);
    } else {
      toast.error("برجاء رفع صورة صحيحة", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  const portfolioFormik = useFormik({
    initialValues: initialValues,
    onSubmit: card ? updatePortfolio : addPortfolio,
    validationSchema: card ? UpdateValidationSchema : addValidationSchema,
  });

  return (
    <>
      <form onSubmit={portfolioFormik.handleSubmit}>
        <Input
          id="title"
          type="text"
          label="العنوان"
          className="mt-2"
          {...portfolioFormik.getFieldProps("title")}
          isInvalid={
            portfolioFormik.touched.title && portfolioFormik.errors.title
          }
          errorMessage={portfolioFormik.errors.title}
        />

        <Textarea
          id="description"
          label="الوصف"
          className="mt-3"
          {...portfolioFormik.getFieldProps("description")}
          isInvalid={
            portfolioFormik.touched.description &&
            portfolioFormik.errors.description
          }
          errorMessage={portfolioFormik.errors.description}
        />

        <input
          id="image"
          type="file"
          hidden
          accept="image/*"
          onChange={handleSelectImg}
          ref={inputRefUpload}
        />
        <Button
          onClick={() => inputRefUpload.current.click()}
          radius="full"
          className="mt-3 w-full bg-white px-6 py-2"
          variant="shadow"
        >
          <>
            <IconFileUpload />
            اختر صورة
          </>
        </Button>
        {portfolioFormik.touched.image && portfolioFormik.errors.image ? (
          <p
            className={`${
              portfolioFormik.touched.image && portfolioFormik.errors.image
                ? "text-danger"
                : ""
            } mt-1 text-xs`}
          >
            {portfolioFormik.errors.image}
          </p>
        ) : (
          ""
        )}
        {preview && (
          <figure className="mt-3 flex max-h-64 w-full items-center justify-center overflow-auto rounded-xl scrollbar-hide">
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg object-cover"
            />
          </figure>
        )}

        <Button
          type="submit"
          color="primary"
          disabled={isLoading}
          radius="full"
          className="mt-4 w-full"
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
              <IconBookmarkFilled />
              حفظ
            </>
          )}
        </Button>
      </form>
    </>
  );
}
