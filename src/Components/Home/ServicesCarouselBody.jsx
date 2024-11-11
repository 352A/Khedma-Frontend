import Carousel from "../UI/Carousel/Carousel";
import ServiceCard from "./ServiceCard";

const OPTIONS = {
  align: "start",
  dragFree: true,
  loop: true,
  slidesToScroll: "auto",
};

const SLIDES = [
  <ServiceCard
    title="كهربائي"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056671/Categories%20and%20Jobs/Jobs/grym2ax9ghr7hvcwt2nz.png"
    to={"كهربائي"}
  />,
  <ServiceCard
    title="عاملة منزلية"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056672/Categories%20and%20Jobs/Jobs/p4ottpnb521ldqq7yqw5.png"
    to={"عاملة-منزلية"}
  />,
  <ServiceCard
    title="طباخ"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056665/Categories%20and%20Jobs/Jobs/jfoqg9s3vqntrim8cqwx.png"
    to={"طباخ"}
  />,
  <ServiceCard
    title="نقاش"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056678/Categories%20and%20Jobs/Jobs/bu92ni0ewiampeostkvc.png"
    to={"نقاش"}
  />,
  <ServiceCard
    title="ميكانيكي"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056675/Categories%20and%20Jobs/Jobs/qfbllx04xkbvzzae3ff5.png"
    to={"ميكانيكي"}
  />,
  <ServiceCard
    title="سباك"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056680/Categories%20and%20Jobs/Jobs/aqik7zufk7gvdwgpssgs.png"
    to={"سباك"}
  />,
  <ServiceCard
    title="ترزي"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056681/Categories%20and%20Jobs/Jobs/wfktrx8mfaoktukhyu6z.png"
    to={"ترزي"}
  />,
  <ServiceCard
    title="خدمات توصيل"
    imgSrc="https://res.cloudinary.com/dkfw12iyl/image/upload/v1728056669/Categories%20and%20Jobs/Jobs/xgja6mhue1sc3otaunj6.png"
    to={"خدمات-توصيل"}
  />,
];

export function ServicesCarouselTitle() {
  return (
    <h1 className="text-center text-2xl md:text-4xl">
      محتاج <span className="font-bold text-primary">خدمة</span> ايه النهاردة؟
    </h1>
  );
}

export function ServicesCarouselCards() {
  return (
    <div className="mx-auto mt-16 flex items-center justify-center gap-6 max-lg:flex-col">
      <Carousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}

function ServicesCarouselBody() {
  return (
    <>
      <ServicesCarouselTitle />
      <ServicesCarouselCards />
    </>
  );
}

export default ServicesCarouselBody;
