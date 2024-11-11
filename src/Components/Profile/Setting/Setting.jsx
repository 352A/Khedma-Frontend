import { Helmet } from "react-helmet-async";
import UpdatePassword from "./UpdatePassword";

export default function Setting() {
  return (
    <>
      <Helmet>
        <title> خدمة | اعدادات الحساب</title>
      </Helmet>
      <UpdatePassword />
    </>
  );
}
