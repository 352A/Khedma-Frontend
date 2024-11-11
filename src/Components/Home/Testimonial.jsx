import TestimonialCarousel from "../UI/Carousel/TestimonialCarousel";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import { IconStarFilled } from "@tabler/icons-react";

const testimonials = [
  {
    name: "أحمد الحداد",
    username: "@ahmed",
    img: "https://nextui.org/avatars/avatar-7.png",
    quote: "“التطبيق سهل جدًا و وفريق العمل محترف”",
  },
  {
    name: "محمد عمران",
    username: "@mohamed",
    img: "https://nextui.org/avatars/avatar-9.png",
    quote: "“الأسعار معقولة جدًا والخدمة سريعة، هستخدمه تاني أكيد”",
  },
  {
    name: "مصطفى ضياء",
    username: "@mostafa",
    img: "https://nextui.org/avatars/avatar-10.png",
    quote: "“التطبيق ده ساعدني أجيب كهربائي بسرعة بدل ما أفضل أدور بالساعات”",
  },
  {
    name: "مدحت شلبي",
    username: "@medhat",
    img: "https://nextui.org/avatars/avatar-6.png",
    quote: "“أقدر أقول إن ده أحسن تطبيق خدمات نزلته، بيوفرلي كل اللي محتاجه”",
  },
  {
    name: "شادي عبدالله",
    username: "@shady",
    img: "https://nextui.org/avatars/avatar-8.png",
    quote: "“ده التطبيق اللي كنت مستنيه، دلوقتي أي مشكلة عندي حلها في دقيقة”",
  },
];

const OPTIONS = { loop: true };
const SLIDES = testimonials.map((testimonial, index) => (
  <TestimonialCard
    key={index}
    customerName={testimonial.name}
    username={testimonial.username}
    img={testimonial.img}
    quote={testimonial.quote}
  />
));

function TestimonialCard({ customerName, username, img, quote }) {
  const stars = Array(5).fill(0);
  return (
    <Card className="my-16 h-64 w-64" isBlurred>
      <CardHeader className="items-center justify-center">
        <div className="flex flex-col items-center gap-5 py-2">
          <Avatar
            isBordered
            color="primary"
            radius="full"
            size="lg"
            src={img}
          />
          <div className="flex flex-col justify-center gap-1">
            <h4
              dir="rtl"
              className="text-center text-small font-semibold leading-none text-default-600"
            >
              {customerName}
            </h4>
            <h5 className="text-center text-small tracking-tight text-default-400">
              {username}
            </h5>
            <div className="flex gap-1">
              {stars.map((_, index) => (
                <IconStarFilled
                  key={index}
                  className="w-4 text-amber-500"
                ></IconStarFilled>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-5 py-1 text-small tracking-wide text-default-500">
        <p dir="rtl" className="text-center">
          {quote}
        </p>
      </CardBody>
    </Card>
  );
}

function Testimonial() {
  return (
    <>
      <h1 className="mb-12 text-center text-4xl font-bold"> آراء عملاءنا</h1>
      <div className="mb-16">
        <TestimonialCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
}

export default Testimonial;
