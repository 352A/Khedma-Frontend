import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";

import { publicRoutes, userRoutes, craftsmanRoutes } from "../utils/routes";

function NavbarLinks({ activeLink, setActiveLink, role }) {
  const location = useLocation();

  const routes = (() => {
    switch (role) {
      case "user":
        return userRoutes;
      case "craftsman":
        return craftsmanRoutes;
      default:
        return publicRoutes;
    }
  })();

  useEffect(() => {
    const routeMap = {
      "/": "/",
      "/home": "/home",
      "/services": "/services",
      "/about-us": "/about-us",
      "/contact-us": "/contact-us",
      "/terms": "/terms",
      "/login": "/login",
      "/register": "/register",
      "/register-form": "/register-form",
      "/forget-code": "/forget-code",
      "/reset-password": "/reset-password",
      "/dashboard": "/dashboard",
      "/profile": "/profile",
      "/Terms": "/Terms",
    };

    setActiveLink(routeMap[location.pathname] || "");
  }, [location.pathname]);

  return (
    <>
      <NavbarContent
        className="hidden flex-row-reverse gap-7 md:flex"
        justify="center"
      >
        {routes.map((route) => (
          <NavbarItem key={route.link} isActive={activeLink === route.link}>
            <Link
              as={RouterLink}
              to={route.link}
              aria-current="page"
              className={
                activeLink === route.link && route.link === "/home"
                  ? "text-slate-100"
                  : "text-foreground"
              }
            >
              {route.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </>
  );
}

export default NavbarLinks;
