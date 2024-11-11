import { Avatar, Button } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

const messages = [
  "ممكن تيجي تصلح العطل ده في البيت؟",
  "هل ممكن تبعت فني يراجع السباكة عندي؟",
  "أنا محتاجة حد ينظم لي الحديقة، متاح؟",
  "ممكن تحددلي موعد لصيانة الأجهزة المنزلية؟",
  "أنا محتاجة حد يركب المطبخ الجديد، أنت متاح؟",
  "ممكن تيجي تشوف مشكلة في التكييف؟",
  "محتاج خدمة تنظيف شقة، إمتى ممكن تبدأ؟",
  "هل ممكن تصحح لي مشكلة في الأرضيات؟",
  "محتاج حد يصلح لي أبواب الشقة، هل أنت متاح؟",
  "هل ممكن تيجي تعمل صيانة لمدفأة الغاز؟",
];

const positions = [
  { bottom: "3.8rem", left: "10%" },
  { bottom: "8.5rem", left: "10%" },
];

function MessageCard({ message, index, imgSrc }) {
  const position = positions[index % positions.length];
  const delay = index * 2.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: [0, 1, 1, 1, 0], y: [100, 0, 0, 0, 100] }}
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        repeatDelay: 17.5,
        ease: "easeInOut",
      }}
      className="absolute max-sm:mx-2"
      style={{ bottom: position.bottom, left: position.left }}
    >
      <Card isBlurred dir="rtl" className="max-sm:mr-7">
        <CardBody>
          <div className="flex gap-4">
            <Avatar
              showFallback
              isBordered
              color="primary"
              src={imgSrc + (index + 1) + ".png"}
              className="flex-shrink-0"
            />
            <span className="my-auto text-right text-sm">{message}</span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

function FeatureSection() {
  return (
    <div className="relative mb-16 flex justify-center bg-gray-50 px-56 py-8 align-middle max-xl:m-12 max-xl:flex-col-reverse max-xl:rounded-2xl max-xl:bg-secondary max-xl:px-6 max-xl:py-8 max-sm:mx-4 max-sm:px-0">
      <img
        className="w-[25rem] rounded-2xl object-cover max-xl:mx-auto max-xl:mt-7"
        src="https://res.cloudinary.com/dkfw12iyl/image/upload/v1729020421/Categories%20and%20Jobs/Khedma%20Website%20Images/ojsf6drylak7elbrekpj.png"
        alt="delivery guy"
        loading="lazy"
      />

      {messages.map((message, index) => (
        <MessageCard
          key={index}
          message={message}
          index={index}
          imgSrc="https://nextui.org/avatars/avatar-"
        />
      ))}

      <div className="my-auto pl-20 max-xl:px-12 max-xl:text-center">
        <h1 dir="rtl" className="text-4xl">
          انضم لـ "خدمة" وابدأ رحلتك كمستقل!
        </h1>
        <p dir="rtl" className="mt-8 text-xl">
          إنت شاطر في مجال الصيانة، النقل، اللوجستيات، أو أي خدمات تانية؟ خدمة
          هو المنصة المثالية لعرض مهاراتك والوصول لعملاء محتاجين لخبراتك. سواء
          كنت متخصص في السباكة، الدهانات، أو أي خدمة تانية، خدمة بتجيب لك الفرص
          لحد عندك.
        </p>
        <Button
          as={RouterLink}
          to="/register"
          variant="solid"
          radius="full"
          size="lg"
          className="mt-8 bg-complementary text-slate-100"
        >
          انضم لنا
        </Button>
      </div>
    </div>
  );
}

export default FeatureSection;
