const columns = [
  { name: "أحداث", uid: "actions" },
  { name: "المستندات", uid: "documents" },
  { name: "المدينة", uid: "city", sortable: true },
  { name: "المهنة", uid: "jobType", sortable: true },
  { name: "مجال العمل", uid: "jobCategory", sortable: true },
  { name: "حالة الطلب", uid: "status", sortable: true },
  { name: "البريد الالكتروني", uid: "email" },
  { name: "الاسم الأخير", uid: "lastName", sortable: true },
  { name: "الاسم الأول", uid: "firstName", sortable: true },
  { name: "ID", uid: "craftsmanId" },
];

const statusOptions = [
  { name: "موثق", uid: "approved" },
  { name: "قيد الانتظار", uid: "pending" },
  { name: "مرفوض", uid: "rejected" },
];

const jobCategoryOptions = [
  { name: "كل المجالات", uid: "all" },
  { name: "خدمات الصيانة", uid: "خدمات الصيانة" },
  { name: "خدمات المنزل", uid: "خدمات المنزل" },
  { name: "خدمات السيارات", uid: "خدمات السيارات" },
  { name: "خدمات التكنولوجيا", uid: "خدمات التكنولوجيا" },
  { name: "خدمات الشركات", uid: "خدمات الشركات" },
  { name: "خدمات شخصية", uid: "خدمات شخصية" },
];

export { columns, statusOptions, jobCategoryOptions };
