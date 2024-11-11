import {
  IconUser,
  IconMail,
  IconMapPin,
  IconDeviceMobile,
  IconBuildings,
  IconBriefcase2,
} from "@tabler/icons-react";
import { Card, CardBody, Divider, CardHeader, Image } from "@nextui-org/react";
import femaleProfilePicture from "../../../assets/Images/blank-profile-picture-female.jpg";
import maleProfilePicture from "../../../assets/Images/blank-profile-picture-male.jpg";

export default function CraftsmanDetails({ application }) {
  return (
    <>
      <div className="flex flex-col-reverse gap-5 md:flex-row">
        <Card dir="rtl" className="flex-grow" shadow="none">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-xl font-medium text-primary">
                المعلومات الشخصية
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="text-right">
            <p className="my-2">
              <IconUser
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {`${application?.firstName} ${application?.lastName}`}
            </p>
            <p className="mb-2">
              <IconBriefcase2
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {application?.jobType}
            </p>
            <p className="mb-2">
              <IconDeviceMobile
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {application?.phone}
            </p>
            <p className="mb-2">
              <IconMail
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {application?.email}
            </p>
            <p className="mb-2">
              <IconBuildings
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {application?.address}
            </p>
            <p className="mb-2">
              <IconMapPin
                color="#4CAF50"
                size={20}
                className="me-1 inline-block"
              />
              {application?.city}
            </p>
          </CardBody>
          <Divider />
        </Card>
        <Image
          width={250}
          height={300}
          alt="avatar"
          src={
            application?.gender === "male"
              ? maleProfilePicture
              : femaleProfilePicture
          }
          className="object-cover"
        />
      </div>
    </>
  );
}
