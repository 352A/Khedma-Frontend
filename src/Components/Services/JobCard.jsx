import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, Image, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";

const ServiceCard = ({ title, imgSrc, description }) => {
  return (
    <Tooltip
      closeDelay={0}
      placement="top"
      dir="rtl"
      className="w-64 bg-gray-800"
      content={
        <div className="flex px-1 py-2">
          <div>
            <div className="text-lg font-medium text-primary">{title}</div>
            <div className="mt-2 break-words text-sm leading-relaxed text-slate-100">
              {description}
            </div>
          </div>
        </div>
      }
    >
      <Card
        shadow="sm"
        className="group relative flex h-72 w-52 cursor-pointer justify-center bg-gradient-to-b from-primary to-complementary"
        as={RouterLink}
        to={`/craftsmen/${title.replace(/\s+/g, "-")}`}
      >
        <CardHeader className="absolute top-0 z-20 flex">
          <h1 className="mx-auto text-[1.5rem] leading-relaxed text-slate-100">
            {title}
          </h1>
          <motion.div
            className="absolute -z-20 h-96 w-96 translate-x-4 rounded-[150%] bg-complementary shadow-sm transition-transform duration-[350ms] ease-in-out group-hover:scale-150"
            style={{
              boxShadow: "inset 10px 40px 150px rgba(76, 175, 80, 0.2)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </CardHeader>
        <Image
          alt={imgSrc}
          src={imgSrc}
          className="z-20 mt-[4rem] h-[15rem] overflow-visible object-cover drop-shadow-lg group-hover:scale-125"
          disableSkeleton
        />
      </Card>
    </Tooltip>
  );
};

export default ServiceCard;
