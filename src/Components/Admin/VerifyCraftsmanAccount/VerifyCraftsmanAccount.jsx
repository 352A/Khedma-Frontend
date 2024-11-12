import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Context/AuthContext";
import api from "../../utils/api";
import femaleProfilePicture from "../../../assets/Images/blank-profile-picture-female.jpg";
import maleProfilePicture from "../../../assets/Images/blank-profile-picture-male.jpg";
import VerifyCraftsmanAccountSkeleton from "./VerifyCraftsmanAccountSkeleton";
import {
  IconUser,
  IconMail,
  IconMapPin,
  IconDeviceMobile,
  IconBuildings,
  IconBriefcase2,
  IconRosetteDiscountCheckFilled,
  IconThumbDownFilled,
  IconStopwatch,
  IconMailForward,
} from "@tabler/icons-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import VerifyPaper from "./VerifyPaper";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function VerifyCraftsmanAccount() {
  const { token, bearerKey } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const craftsmanApplicationEndPoint = `admin/application/${id}`;
  const sendEmailStatusEndPoint = `admin/${application?._id}/sendApplicationStatusEmail`;
  const approveFrontNationalID = `admin/${application?._id}/approveFrontNationalID`;
  const rejectFrontNationalID = `admin/${application?._id}/rejectFrontNationalID`;
  const approveBackNationalID = `admin/${application?._id}/approveBackNationalID`;
  const rejectBackNationalID = `admin/${application?._id}/rejectBackNationalID`;
  const approveCertificate = `admin/${application?._id}/approveCertificateOfCriminal`;
  const rejectCertificateID = `admin/${application?._id}/rejectCertificateOfCriminal`;

  async function getCraftsmanApplication() {
    try {
      const { data } = await api.get(craftsmanApplicationEndPoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setApplication(data.craftsmanApplication);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSuccessResponse(response) {
    let errorMessage = response.data.message;
    toast.success(`👏 ! ${errorMessage}`, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: false,
      progress: undefined,
      theme: "colored",
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

  async function sendEmailStatus() {
    setIsLoading(true);
    try {
      const response = await api.patch(
        sendEmailStatusEndPoint,
        {},
        {
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(response);
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getCraftsmanApplication();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [token]);

  return (
    <>
      {!application ? (
        <VerifyCraftsmanAccountSkeleton />
      ) : (
        <>
          <div className="flex flex-col-reverse gap-5 md:flex-row">
            <Card
              dir="rtl"
              className="flex-grow bg-gray-800 text-white"
              shadow="none"
            >
              <CardHeader className="flex gap-3">
                <div className="flex w-full items-center justify-between">
                  <p className="text-2xl font-medium text-white">
                    المعلومات الشخصية
                  </p>
                  {application.status === "approved" ? (
                    <IconRosetteDiscountCheckFilled
                      className="text-primary"
                      size={35}
                    />
                  ) : application.status === "rejected" ? (
                    <IconThumbDownFilled className="text-danger" size={35} />
                  ) : (
                    <IconStopwatch className="text-warning" size={35} />
                  )}
                </div>
              </CardHeader>
              <Divider className="bg-white" />
              <CardBody className="text-right">
                <p className="my-2">
                  <IconUser
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {`${
                    application?.craftsmanDetails?.firstName
                  } ${application?.craftsmanDetails?.lastName}`}
                </p>
                <p className="mb-2">
                  <IconBriefcase2
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {application?.craftsmanDetails?.jobType}
                </p>
                <p className="mb-2">
                  <IconDeviceMobile
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {application?.craftsmanDetails?.phone}
                </p>
                <p className="mb-2">
                  <IconMail
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {application?.craftsmanDetails?.email}
                </p>
                <p className="mb-2">
                  <IconBuildings
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {application?.craftsmanDetails?.address}
                </p>
                <p className="mb-2">
                  <IconMapPin
                    color="#4CAF50"
                    size={20}
                    className="me-1 inline-block"
                  />
                  {application?.craftsmanDetails?.city}
                </p>
              </CardBody>
              <Divider />
            </Card>
            <Image
              width={250}
              height={300}
              alt="avatar"
              src={
                application?.craftsmanDetails?.profilePic
                  ? application.craftsmanDetails.profilePic
                  : application?.gender === "male"
                    ? maleProfilePicture
                    : femaleProfilePicture
              }
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex flex-col-reverse gap-5 lg:flex-row-reverse">
            {application.documents.frontNationalID && (
              <VerifyPaper
                document={application.documents.frontNationalID}
                title={"الوجة الأمامي لصورة البطاقة الشخصية"}
                approveMessage={"تمت الموافقة على صورة وجه البطاقة"}
                approveEndpoint={approveFrontNationalID}
                rejectEndpoint={rejectFrontNationalID}
                getCraftsmanApplication={getCraftsmanApplication}
              />
            )}
            {application.documents.backNationalID && (
              <VerifyPaper
                document={application.documents.backNationalID}
                title={"الوجة الخلفي لصورة البطاقة الشخصية"}
                approveMessage={"تمت الموافقة على صورة ظهر البطاقة"}
                approveEndpoint={approveBackNationalID}
                rejectEndpoint={rejectBackNationalID}
                getCraftsmanApplication={getCraftsmanApplication}
              />
            )}
            {application.documents.certificateOfCriminal && (
              <VerifyPaper
                document={application.documents.certificateOfCriminal}
                title={"صورة شخصية مع صورة البطاقة"}
                approveMessage={"تمت الموافقة على الصورة الشخصية"}
                approveEndpoint={approveCertificate}
                rejectEndpoint={rejectCertificateID}
                getCraftsmanApplication={getCraftsmanApplication}
              />
            )}
          </div>
          {application.documents.frontNationalID &&
          application.documents.backNationalID &&
          application.documents.certificateOfCriminal ? (
            <Button
              onClick={sendEmailStatus}
              color="primary"
              className="m-auto mt-7 flex w-1/2"
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
                  ارسل حالة الطلب
                  <IconMailForward />
                </>
              )}
            </Button>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
