const columns = [
  { name: "أحداث", uid: "actions" },
  { name: "حساب موقوف", uid: "isBlocked", sortable: true },
  { name: "حساب معلق", uid: "isSuspended", sortable: true },
  { name: "مديونية", uid: "accountDebt", sortable: true },
  { name: "موثق", uid: "verified", sortable: true },
  { name: "المدينة", uid: "city", sortable: true },
  { name: "المهنة", uid: "jobType", sortable: true },
  { name: "مجال العمل", uid: "jobCategory", sortable: true },
  { name: "حالة الاتصال", uid: "status", sortable: true },
  { name: "البريد الالكتروني", uid: "email" },
  { name: "الاسم الأخير", uid: "lastName", sortable: true },
  { name: "الاسم الأول", uid: "firstName", sortable: true },
  { name: "ID", uid: "_id" },
];

const verifyOptions = [
  { name: "الكل", uid: "all" },
  { name: "موثق", uid: "false" },
  { name: "غير موثق", uid: "true" },
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

export { columns, jobCategoryOptions, verifyOptions };
