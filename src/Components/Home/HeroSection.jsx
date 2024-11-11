import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

function HeroCarousel() {
  return (
    <section className="-z-50 grid grid-cols-2 overflow-hidden bg-primary px-28 pb-24 max-lg:grid-cols-1 max-lg:justify-items-center lg:px-8 xl:px-20">
      <div className="content-end max-lg:row-start-2 max-lg:w-[30rem]">
        <Image
          alt="painter"
          src="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020442/Categories%20and%20Jobs/Khedma%20Website%20Images/yhmtn7mlbxazy5g4s4vj.png"
          className="z-0 w-[60rem] drop-shadow-sm lg:mt-20"
          disableSkeleton
          loading="eager"
        />
      </div>
      <div className="mt-20 grid grid-rows-3 gap-2 max-lg:gap-7 xl:px-24">
        <h1
          dir="rtl"
          className="text-5xl font-bold leading-snug max-md:text-center"
        >
          أهلاً بيك في <span className="font-black">خدمة</span>
        </h1>
        <p dir="rtl" className="text-[1.3rem] max-md:text-center">
          المنصة الأولى في مصر اللي بتجمع أفضل المستقلين في مختلف المجالات عشان
          يساعدوك في تلبية احتياجاتك اليومية بسرعة وكفاءة.
        </p>
        <div className="flex justify-end gap-4 max-md:justify-center max-sm:items-center">
          <Button
            as={RouterLink}
            to="/services"
            variant=""
            radius="full"
            className="text-slate-100 underline underline-offset-4"
            size="lg"
          >
            تصفح الخدمات
          </Button>
          <Button
            as={RouterLink}
            to="/Register"
            variant="solid"
            radius="full"
            className="bg-complementary text-slate-100"
            size="lg"
          >
            عميل جديد؟
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
