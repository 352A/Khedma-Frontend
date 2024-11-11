const columns = [
  { name: "أحداث", uid: "actions" },
  { name: "حالة الاتصال", uid: "status", sortable: true },
  { name: "الصلاحية", uid: "role", sortable: true },
  { name: "البريد الالكتروني", uid: "email" },
  { name: "الاسم الأخير", uid: "lastName", sortable: true },
  { name: "الاسم الأول", uid: "firstName", sortable: true },
  { name: "ID", uid: "_id" },
];

const roleOptions = [
  { name: "رئيسي", uid: "rootAdmin" },
  { name: "فرعي", uid: "subAdmin" },
];

export { columns, roleOptions };
