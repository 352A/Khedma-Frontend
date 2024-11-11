import { useRef } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";

const ServiceCard = ({ title, imgSrc, to }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });
  return (
    <Card
      dir="rtl"
      shadow="sm"
      className="group relative flex h-72 w-52 cursor-pointer justify-center bg-gradient-to-b from-primary to-complementary"
      as={RouterLink}
      to={`/craftsmen/${to}`}
    >
      <CardHeader className="absolute top-0 z-20 flex">
        <h1 className="mx-auto text-[1.5rem] font-medium leading-relaxed text-slate-100">
          {title}
        </h1>
        <motion.div
          ref={ref}
          className="absolute -z-20 h-96 w-96 translate-x-4 rounded-[150%] bg-complementary shadow-sm transition-transform duration-[350ms] ease-in-out group-hover:scale-150"
          style={{
            boxShadow: "inset 10px 40px 150px rgba(76, 175, 80, 0.2)",
          }}
          initial={{ width: "70rem", height: "70rem", opacity: 0 }}
          animate={
            isInView ? { width: "26rem", height: "26rem", opacity: 1 } : {}
          }
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      </CardHeader>
      <Image
        alt={imgSrc}
        src={imgSrc}
        className="z-20 mt-[4rem] h-[15rem] object-cover drop-shadow-lg group-hover:scale-125"
        disableSkeleton
      />
    </Card>
  );
};

export default ServiceCard;
