import { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

import { profileContext } from "../../Context/ProfileContext";
import { authContext } from "../../Context/AuthContext";

import { publicRoutes, userRoutes, craftsmanRoutes } from "../utils/routes";

const Footer = () => {
  const { userProfileData } = useContext(profileContext);
  const { token } = useContext(authContext);

  const [role, setRole] = useState("guest");

  useEffect(() => {
    if (token) {
      if (userProfileData?.role === "user") {
        setRole("user");
      } else if (userProfileData?.role === "craftsman") {
        setRole("craftsman");
      }
    } else {
      setRole("guest");
    }
  }, [userProfileData, token]);

  const routes = (() => {
    switch (role) {
      case "user":
        return userRoutes;
      case "craftsman":
        return craftsmanRoutes;
      case "admin":
        return adminRoutes;
      default:
        return publicRoutes;
    }
  })();

  return (
    <>
      <footer
        dir="rtl"
        className="bg-gray-800 px-4 py-8 text-white sm:px-6 lg:px-24"
      >
        <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-center lg:px-44">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">حول الموقع</h3>
            <p className="w-5/6 text-sm">
              نحن نقدم أفضل الخدمات لتلبية احتياجاتك. تواصل معنا لمزيد من
              المعلومات.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">روابط سريعة</h3>
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route.link}>
                  <RouterLink to={route.link} className="hover:text-gray-400">
                    {route.title}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">روابط اخرى</h3>
            <ul className="space-y-2">
              {userProfileData?.role === "craftsman" ||
              userProfileData?.role === "user" ? (
                <>
                  <li>
                    <RouterLink to="/Terms" className="hover:text-gray-400">
                      الشروط و الاحكام
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      to="/profile/setting"
                      className="hover:text-gray-400"
                    >
                      اعدادات الحساب
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      to="/contact-us"
                      className="hover:text-gray-400"
                    >
                      طلب المساعدة
                    </RouterLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <RouterLink to="/register" className="hover:text-gray-400">
                      إنشاء حساب
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/login" className="hover:text-gray-400">
                      تسجيل الدخول
                    </RouterLink>
                  </li>
                </>
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-primary">تواصل معنا</h3>
            <p className="text-sm">البريد الإلكتروني: info@Khedma.com</p>
            <p className="text-sm">
              الهاتف: <bdo dir="ltr">+1234567890</bdo>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-8 border-t border-gray-700 pt-4 text-center"
        >
          <p className="text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} خدمة.
          </p>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
