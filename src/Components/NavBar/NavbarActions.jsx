import { Link as RouterLink } from "react-router-dom";
import { NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import LoginModal from "./LoginModal";

function NavbarActions({ activeLink }) {
  return (
    <NavbarContent>
      <NavbarItem className="max-sm:mx-auto">
        <Button
          as={RouterLink}
          to="/register"
          variant="solid"
          radius="full"
          className="hidden bg-complementary text-slate-100 sm:flex"
        >
          حساب جديد
        </Button>
        <Button
          as={RouterLink}
          to="/register"
          size="sm"
          variant="solid"
          radius="full"
          className="bg-complementary text-slate-100 sm:hidden"
        >
          حساب جديد
        </Button>
      </NavbarItem>
      <NavbarItem className="hidden md:flex">
        <LoginModal activeLink={activeLink} />
      </NavbarItem>
    </NavbarContent>
  );
}

export default NavbarActions;
