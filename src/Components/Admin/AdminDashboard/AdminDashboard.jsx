import SideBar from "./SideBar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title> خدمة | لوحة التحكم</title>
      </Helmet>
      <div className="flex h-[50%] justify-between">
        <div className="rounded-3x mx-auto w-full bg-gray-200 p-6 md:p-12">
          <Outlet />
        </div>
        <SideBar />
      </div>
    </>
  );
}

export default AdminDashboard;
