const columns = [
  { name: "أحداث", uid: "actions" },
  { name: "حساب موقوف", uid: "isBlocked", sortable: true },
  { name: "حساب معلق", uid: "isSuspended", sortable: true },
  { name: "حالة الاتصال", uid: "status", sortable: true },
  { name: "تاريخ انشاء الحساب", uid: "createdAt", sortable: true },
  { name: "المدينة", uid: "city", sortable: true },
  { name: "البريد الالكتروني", uid: "email" },
  { name: "الاسم الأخير", uid: "lastName", sortable: true },
  { name: "الاسم الأول", uid: "firstName", sortable: true },
  { name: "ID", uid: "_id" },
];

export { columns };
