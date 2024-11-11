import { Helmet } from "react-helmet-async";
import TitleWithLine from "./TitleWithLine";
import BlobBackground from "./BlobBackground";
import Timeline from "./Timeline";
import { useEffect } from "react";
export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>خدمة | من نحن</title>
      </Helmet>
      <section
        className="relative h-[40vh] w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020416/Categories%20and%20Jobs/Khedma%20Website%20Images/gxhmtsacj7pinvbqwqkp.jpg)`,
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex h-full flex-col items-center justify-center text-center text-secondary">
          <h2 className="text-sm font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            من نحن؟
          </h2>

          <p className="mt-4 px-[5%] text-xs leading-relaxed text-secondary sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:px-[15%]">
            مرحبًا بكم في خدمة، منصتكم المثلى للعثور على وتوظيف المحترفين المهرة
            في مجموعة متنوعة من الحرف. نسعى دائمًا لتقديم الحلول الأمثل التي
            تجمع بين الجودة، السرعة، والاحترافية، لضمان تحقيق أهدافكم بكل ثقة
            وسهولة
          </p>

          {/* <a
            href="#timeline"
            className="xl:text-3x mt-4 rounded-full bg-primary px-4 py-2 text-base text-secondary transition hover:bg-lightGreen sm:text-lg md:px-6 md:py-3 md:text-xl lg:text-2xl"
          >
            عرض المزيد
          </a> */}
        </div>
      </section>
      {/* Start Our story section */}
      <section className="relative my-5 flex flex-col items-center sm:my-8 md:my-14 lg:my-20 xl:my-24 2xl:my-32">
        <TitleWithLine title="قصتنا" />
        <div className="flex flex-col items-center justify-between gap-5 px-[5%] md:flex-row md:px-[8%]">
          <BlobBackground imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020426/Categories%20and%20Jobs/Khedma%20Website%20Images/hibqtwk6haoylodw8rmd.jpg" />
          <p className="text-center text-xs sm:text-sm md:w-1/2 md:text-right md:text-lg lg:text-xl">
            ولدت خدمة من رغبتنا في تبسيط عملية العثور على وتوظيف المحترفين
            المهرة. لقد أدركنا التحديات التي يواجهها كل من العمال والعملاء في
            عالم العمل الحر، وهدفنا إلى تقديم حل يملأ هذه الفجوة. من بداياتنا
            المتواضعة، نما عملنا ليصبح منصة موثوقة تلتزم بتقديم الجودة
            والموثوقية. لقد شكلتنا التحديات والإنجازات التي حققناها في رحلتنا
            لنصبح المنصة التي نحن عليها اليوم
          </p>
        </div>
      </section>
      {/* End Our story section */}
      {/* Start Our vision section */}
      <section className="relative my-5 flex flex-col items-center sm:my-8 md:my-14 lg:my-20 xl:my-24 2xl:my-32">
        <TitleWithLine title=" رؤيتنا" />
        <div className="flex flex-col items-center gap-5 px-[5%] md:flex-row-reverse md:px-[8%]">
          <BlobBackground imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020426/Categories%20and%20Jobs/Khedma%20Website%20Images/u6z0ynaahmzl0qawkqua.jpg" />
          <p className="text-center text-xs sm:text-sm md:w-1/2 md:text-right md:text-lg lg:text-xl">
            تتمثل مهمتنا في خدمة في تقديم منصة بسيطة وموثوقة وشفافة لتوظيف
            المحترفين المهرة. نتصور عالمًا يكون فيه العثور على العامل المناسب
            سهلاً كما بضع نقرات. هدفنا هو تمكين كل من العمال والعملاء من خلال
            تقديم خدمة تعزز الثقة والكفاءة والتميز. نحن ملتزمون بتحويل تجربة
            العمل الحر وتحديد معايير جديدة في هذا المجال
          </p>
        </div>
      </section>
      {/* End Our vision section */}
      {/* Start Our provider section */}
      <section className="relative my-5 flex flex-col items-center sm:my-8 md:my-14 lg:my-20 xl:my-24 2xl:my-32">
        <TitleWithLine title="خدماتنا" />
        <div className="flex flex-col items-center justify-between gap-5 px-[5%] md:flex-row md:px-[8%]">
          <BlobBackground imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020426/Categories%20and%20Jobs/Khedma%20Website%20Images/olmj8jdby6pk71mhpevr.jpg" />
          <p className="text-center text-xs sm:text-sm md:w-1/2 md:text-right md:text-lg lg:text-xl">
            تتمثل مهمتنا في خدمة في تقديم منصة بسيطة وموثوقة وشفافة لتوظيف
            المحترفين المهرة. نتصور عالمًا يكون فيه العثور على العامل المناسب
            سهلاً كما بضع نقرات. هدفنا هو تمكين كل من العمال والعملاء من خلال
            تقديم خدمة تعزز الثقة والكفاءة والتميز. نحن ملتزمون بتحويل تجربة
            العمل الحر وتحديد معايير جديدة في هذا المجال
          </p>
        </div>
      </section>
      {/* End Our provider section */}
      <section className="my-32" id="timeline">
        <Timeline />
      </section>
    </>
  );
}
