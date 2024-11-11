import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { authContext } from "../../../Context/AuthContext";
import { profileContext } from "../../../Context/ProfileContext";

import { Link as RouterLink } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  Divider,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import {
  IconHomeFilled,
  IconRosetteDiscountCheckFilled,
  IconLockFilled,
  IconMessageChatbotFilled,
  IconUserFilled,
  IconLogout,
  IconZoomCheckFilled,
  IconBriefcaseFilled,
  IconHelpHexagonFilled,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";
import AdminInfo from "./AdminInfo";
import api from "../../utils/api";

const endPoint = "admin/logout";

function SideBar() {
  const navigate = useNavigate();
  const { setToken, token, bearerKey } = useContext(authContext);
  const { setUserProfileData } = useContext(profileContext);
  const role = sessionStorage.getItem("role");

  const itemClasses = {
    base: "py-0 w-full ",
    title: "font-normal text-medium text-slate-100",
    trigger: "px-2 py-0  rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2 text-slate-100",
  };

  async function signOut() {
    try {
      const res = await api.patch(
        endPoint,
        {},
        {
          headers: {
            authorization: `${bearerKey}${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignOut = () => {
    signOut();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setToken(null);
    setUserProfileData(null);
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen w-1/5 bg-gray-800">
      <div className="mt-2 p-6 text-center">
        <AdminInfo />
      </div>
      <Listbox
        aria-label="main"
        itemClasses={{
          title: "font-normal text-medium text-slate-100",
          trigger: "px-2 py-0  rounded-lg h-14 flex items-center",
          indicator: "text-medium",
          content: "text-small px-2 text-slate-100",
        }}
        className="mx-auto mt-7 flex w-full max-w-[300px] flex-col px-5"
      >
        <ListboxItem
          dir="rtl"
          key="1"
          aria-label="dashboard"
          startContent={<IconHomeFilled className="text-primary" />}
          title="الرئيسية"
          as={RouterLink}
          to="/admin-dashboard"
        ></ListboxItem>
      </Listbox>
      <Accordion
        dir="rtl"
        showDivider={false}
        className="mx-auto flex w-full max-w-[300px] flex-col gap-1 p-5"
        variant="light"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="2"
          aria-label="Apps Permissions"
          startContent={
            <IconRosetteDiscountCheckFilled className="text-warning" />
          }
          subtitle="لديك 50 اشعار جديد"
          title="الحسابات"
        >
          <Listbox
            variant="solid"
            aria-label="Accounts list"
            className="px-3 text-gray-400"
          >
            <ListboxItem
              key="all users"
              aria-label="Review requests"
              startContent={<IconUserFilled className="text-blue" />}
              as={RouterLink}
              to="all-users"
            >
              العملاء
            </ListboxItem>
            <ListboxItem
              key="all craftsmen"
              aria-label="Review requests"
              startContent={<IconBriefcaseFilled className="text-primary" />}
              as={RouterLink}
              to="all-craftsmen"
              className="my-2"
            >
              مقدمي الخدمات
            </ListboxItem>

            {role === "rootAdmin" && (
              <ListboxItem
                key="all admins"
                aria-label="Review requests"
                startContent={<IconUsers className="text-warning" />}
                as={RouterLink}
                to="all-admins"
                className="my-2"
              >
                المديرين
              </ListboxItem>
            )}

            <ListboxItem
              key="applications"
              aria-label="Review requests"
              startContent={<IconZoomCheckFilled className="text-danger" />}
              as={RouterLink}
              to="applications"
              className="my-2"
            >
              توثيق الحسابات
            </ListboxItem>

            {role === "rootAdmin" && (
              <ListboxItem
                key="create admin"
                aria-label="Review requests"
                startContent={<IconUserCheck className="text-success" />}
                as={RouterLink}
                to="create-admin"
                className="my-2"
              >
                انشاء حساب مدير
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Customer service"
          classNames={{ subtitle: "text-danger" }}
          startContent={<IconHelpHexagonFilled className="text-blue" />}
          title={<p className="text-gray-100">خدمة العملاء</p>}
        >
          <Listbox
            variant="solid"
            aria-label="Accounts list"
            className="px-3 text-gray-400"
          >
            <ListboxItem
              key="password"
              startContent={<IconLockFilled className="text-danger" />}
              subtitle="لديك 10 اشعار جديد"
              title="تغير كلمة السر"
              as={RouterLink}
              to="change-password"
            ></ListboxItem>
            <ListboxItem
              key="requests"
              aria-label="Support requests"
              startContent={
                <IconMessageChatbotFilled className="text-slate-100 group-hover:text-primary" />
              }
              subtitle="لديك 20 اشعار جديد"
              title="طلبات الدعم"
              className="my-2"
              as={RouterLink}
              to="support-requests"
            ></ListboxItem>
          </Listbox>
        </AccordionItem>
      </Accordion>
      <Divider className="mx-auto w-3/4 bg-gray-700" />
      <Listbox
        dir="rtl"
        variant="solid"
        aria-label="Sign out"
        itemClasses={{
          title: "font-normal text-medium text-slate-100",
          trigger: "px-2 py-0  rounded-lg h-14 flex items-center",
          indicator: "text-medium",
          content: "text-small px-2 text-slate-100",
        }}
        className="mx-auto flex w-full max-w-[300px] flex-col gap-1 p-5"
      >
        <ListboxItem
          key="6"
          aria-label="Sign out"
          color="danger"
          startContent={
            <IconLogout className="text-danger group-hover:text-white" />
          }
          title="تسجيل الخروج"
          onClick={handleSignOut}
        ></ListboxItem>
      </Listbox>
    </div>
  );
}

export default SideBar;
