import { Helmet } from "react-helmet-async";
import { Accordion, AccordionItem } from "@nextui-org/react";
import ContactPopup from "./ContactPopup";
import { useEffect, useContext } from "react";
import ContactUsers from "./ContactUsers";
import { Divider } from "@nextui-org/react";
import { profileContext } from "../../Context/ProfileContext";
import { IconInfoSquareRoundedFilled } from "@tabler/icons-react";

export default function Contact() {
  const { userProfileData } = useContext(profileContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const defaultContent = [
    "يمكنك التسجيل عن طريق النقر على زر 'تسجيل' في الصفحة الرئيسية. قم بملء بياناتك الشخصية ومعلومات الاتصال، ثم اتبع التعليمات لإنشاء حسابك",
    "بعد تسجيل الدخول، يمكنك استخدام ميزة البحث أو التصفح حسب الفئات لاكتشاف فرص العمل المتاحة. يمكنك أيضًا تفعيل التنبيهات لتصلك الإشعارات عند توفر فرص عمل تناسب مهاراتك",
    "يتم تحديد التكلفة إما من خلال العميل الذي يقدم عرضًا أو من خلالك كفري لانسر. تأكد من مناقشة التفاصيل بوضوح قبل بدء العمل للوصول إلى اتفاق يناسب الطرفين",
    "نحن نوفر نظام دفع آمن حيث يتم إيداع المبلغ لدى الموقع قبل بدء العمل، ويتم تحريره لك بمجرد الانتهاء من المشروع وموافقة العميل",
    "نعم، يمكنك التفاوض مع العملاء حول الأسعار والمواعيد النهائية. تأكد من توضيح توقعاتك ومهاراتك لضمان الوصول إلى اتفاق عادل",
    "تأكد من إضافة معلومات كاملة عن مهاراتك وخبراتك، وأضف نماذج من أعمالك السابقة. أيضًا، احرص على الحصول على تقييمات إيجابية من العملاء السابقين لتحسين مصداقيتك.",
    "نقدم عدة طرق للدفع تشمل التحويلات البنكية، بطاقات الائتمان، والمحافظ الإلكترونية. اختر الطريقة الأنسب لك عند استلام مستحقاتك",
    "نعم، يمكنك التواصل مع العملاء من خلال نظام المراسلة على الموقع. يُفضل استخدام هذا النظام لضمان توثيق كافة المحادثات والاتفاقات",
    "نعم، يمكنك تعديل أو إلغاء العرض المقدم قبل أن يقبله العميل. بعد القبول، سيكون من الأفضل التواصل مع العميل في حالة الحاجة إلى إجراء أي تعديلات",
    "نعم، الموقع يحتسب عمولة بسيطة مقابل تسهيل العمل بينك وبين العميل. يمكنك معرفة نسبة العمولة قبل بدء العمل على المشروع",
  ];

  const titles = [
    "كيف يمكنني التسجيل كمستقل على الموقع؟",
    "كيف أجد فرص العمل المناسبة لي؟",
    "كيف يتم تحديد تكلفة المشروع؟",
    "كيف يمكنني ضمان استلام مستحقاتي بعد الانتهاء من المشروع؟",
    "هل يمكنني التفاوض على أسعار المشروعات؟",
    "كيف يمكنني تحسين ملفي الشخصي لجذب المزيد من العملاء؟",
    "ما هي طرق الدفع المتاحة على الموقع؟",
    "هل يمكنني التواصل مباشرة مع العملاء؟",
    "هل يمكنني تعديل أو إلغاء عرضي بعد تقديمه؟",
    "هل هناك عمولات يتم خصمها من أرباحي؟",
  ];

  return (
    <>
      <Helmet>
        <title>خدمة | تواصل معنا</title>
      </Helmet>
      <section className="my-12 px-64 max-lg:px-12 max-sm:px-4">
        <h1 className="mx-auto mb-12 w-fit rounded-3xl border-2 border-primary px-4 py-4 text-center text-3xl font-extrabold text-gray-600 md:text-3xl">
          الأسئلة الشائعة
        </h1>
        <Accordion variant="splitted" dir="rtl">
          {defaultContent.map((content, index) => (
            <AccordionItem
              key={index}
              aria-label={`Accordion ${index + 1}`}
              title={
                <span className="text-sm sm:text-[1rem] md:text-lg lg:text-xl">
                  {titles[index]}
                </span>
              }
              dir="rtl"
              className="text-xs sm:text-sm md:text-[1rem] lg:text-lg"
              startContent={
                <IconInfoSquareRoundedFilled className="text-primary/45" />
              }
            >
              {content}
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      {!userProfileData ? (
        <section>
          <ContactPopup />
        </section>
      ) : (
        <>
          <Divider className="my-4" />
          <section>
            <ContactUsers userProfileData={userProfileData} />
          </section>
        </>
      )}
    </>
  );
}
