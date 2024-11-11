import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import femaleProfilePicture from "../../../assets/Images/blank-profile-picture-female.jpg";
import maleProfilePicture from "../../../assets/Images/blank-profile-picture-male.jpg";
import { Link as LinkasRouterLink } from "react-router-dom";

import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import Stars from "./Stars";

export default function CraftsmanCard({ craftsman }) {
  const avatar = craftsman?.profilePic
    ? craftsman.profilePic
    : craftsman?.gender === "female"
      ? femaleProfilePicture
      : maleProfilePicture;

  return (
    <>
      <Card
        isBlurred
        className="cursor-pointer rounded-3xl border-2 bg-gray-800 py-4 text-white duration-100 hover:scale-105 hover:border-primary"
        as={LinkasRouterLink}
        to={`/profile-details/${craftsman._id}`}
        dir="rtl"
      >
        <CardHeader className="flex-col">
          <div className="flex w-full justify-between px-2">
            <div className="flex flex-col gap-2">
              <Chip size="sm" color="primary">
                {craftsman.jobCategory}
              </Chip>
              <Chip size="sm" className="text-tiny font-bold uppercase">
                {craftsman.jobType}
              </Chip>
            </div>

            <IconRosetteDiscountCheckFilled className="text-primary" />
          </div>
          <div className="relative">
            <Chip
              size="sm"
              color={craftsman.status === "online" ? "primary" : "danger"}
              variant="dot"
              className="absolute -bottom-1 left-1/2 z-10 mx-auto -translate-x-1/2 border-none bg-white"
            >
              {craftsman.status === "online" ? "متصل" : "غير متصل"}
            </Chip>

            <Avatar
              alt="Card background"
              src={avatar}
              className="mx-auto mt-4 h-36 w-36 text-center text-large"
            />
          </div>
        </CardHeader>
        <CardBody className="items-start gap-y-2 overflow-visible py-2">
          <div className="mx-auto flex flex-col justify-center gap-1 text-center">
            <h4 className="text-large font-bold">
              {`${craftsman.firstName} ${craftsman.lastName}`}
            </h4>
            <p className="text-primary">{craftsman.city}</p>
            <Stars rating={craftsman.averageRating} />
          </div>
          <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center gap-2">
            {craftsman.workArea.map((area) => (
              <Chip color="primary" variant="flat" key={area}>
                {area}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
