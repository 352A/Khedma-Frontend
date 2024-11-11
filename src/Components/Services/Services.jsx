import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import { Image } from "@nextui-org/react";

import services from "../../constants/services";
import { useEffect } from "react";

export default function Services() {
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const gridSquareVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> خدمة | الخدمات</title>
      </Helmet>
      <h1 className="mt-16 text-center text-3xl font-bold text-primary">
        تصفح جميع الخدمات
      </h1>
      <div className="flex flex-col gap-10 overflow-x-hidden"></div>
      <motion.section
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
        className="my-16 grid gap-10 px-48 max-xl:grid-cols-2 max-xl:px-24 max-lg:grid-cols-1 max-sm:px-6 sm:grid-cols-2 sm:px-6 lg:px-36 xl:grid-cols-3"
      >
        {services.map((card, index) => (
          <RouterLink key={card.subtitle} to={`/jobs/${card.category}`}>
            <motion.div
              key={index}
              variants={gridSquareVariants}
              className="before:bg-primary/155 relative flex h-60 items-center justify-center gap-10 overflow-hidden rounded-lg bg-slate-200 bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-sm before:backdrop-brightness-50"
              style={{ backgroundImage: `url(${card.backgroundImage})` }}
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="absolute right-10 text-[2.5rem] font-bold leading-tight text-slate-100">
                {card.title}
                <span className="block">{card.subtitle}</span>
              </h1>
              <motion.div
                className="flex"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.05, 1],
                  x: [0, -100, -100],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: card.scaleDelay,
                }}
              >
                <Image
                  isBlurred
                  className="h-60 object-cover drop-shadow-sm"
                  src={card.imgSrc}
                  alt={card.imgAlt}
                  disableSkeleton
                />
              </motion.div>
            </motion.div>
          </RouterLink>
        ))}
      </motion.section>
    </>
  );
}
