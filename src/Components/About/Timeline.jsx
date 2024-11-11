import React from "react";

const Timeline = () => {
  const events = [
    {
      id: 1,
      title: "البحث",
      description: "استخدم ميزات البحث المتقدمة للعثور على المحترف الذي تحتاجه",
      position: "left",
    },
    {
      id: 2,
      title: "مراجعة",
      description: "تصفح الملفات الشخصية واطلع على المراجعات، وقارن المؤهلات",
      position: "right",
    },
    {
      id: 3,
      title: "التوظيف",
      description: "تواصل مع المحترف المختار وناقش مشروعك",
      position: "left",
    },
    {
      id: 4,
      title: "الانتهاء",
      description:
        "بمجرد الانتهاء من العمل، اترك ملاحظاتك وتأكد من أن كل شيء يسير بسلاسة",
      position: "right",
    },
  ];

  return (
    <div className="relative my-8 flex flex-col items-center">
      {/* Main vertical line */}
      <div className="absolute h-full w-1 bg-primary"></div>
      {events.map((event) => (
        <div
          key={event.id}
          className={`mb-8 flex w-full items-center justify-${
            event.position === "left" ? "end" : "start"
          }`}
        >
          {event.position === "left" && (
            <div className="relative w-1/3 transform rounded-lg border-r-4 border-primary bg-white p-4 pt-10 text-right shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg">
              {/* Number in the top-right corner */}
              <div className="absolute right-[30px] top-[15px] mr-[-10px] mt-[-10px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white">
                {event.id}
              </div>
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="mt-2">{event.description}</p>
            </div>
          )}

          {/* Spacer for the vertical line */}
          <div className="w-1/12"></div>

          {event.position === "right" && (
            <div className="relative w-1/3 transform rounded-lg border-l-4 border-primary bg-white p-4 pt-10 text-right shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg">
              {/* Number in the top-right corner */}
              <div className="absolute right-[30px] top-[15px] mr-[-10px] mt-[-10px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white">
                {event.id}
              </div>
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="mt-2">{event.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
