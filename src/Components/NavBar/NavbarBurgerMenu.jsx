import { Link as RouterLink } from "react-router-dom";
import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

import { publicRoutes } from "../utils/routes";

function NavbarBurgerMenu({ isMenuOpen, handleLinkClick }) {
  return (
    <>
      <NavbarContent className="justify md:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="max-md:mx-auto md:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-auto my-12 flex min-h-screen flex-col gap-12 text-center align-middle">
          {publicRoutes.map((route) => (
            <NavbarMenuItem key={route.link} className="mx-auto">
              <RouterLink
                className="text-xl"
                to={route.link}
                onClick={() => handleLinkClick()}
              >
                {route.title}
              </RouterLink>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="mx-auto">
            <RouterLink
              className="text-xl text-primary"
              to="/login"
              onClick={() => handleLinkClick()}
            >
              تسجيل الدخول
            </RouterLink>
          </NavbarMenuItem>
          <NavbarMenuItem className="mx-auto">
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              variant="solid"
              radius="full"
              className="bg-complementary text-slate-100 sm:hidden"
              onClick={() => handleLinkClick()}
            >
              حساب جديد
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </>
  );
}

export default NavbarBurgerMenu;
