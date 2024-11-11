import { Link as RouterLink } from "react-router-dom";
import { NavbarBrand } from "@nextui-org/react";

import logo from "../../assets/Images/logo.png";

function NavbarLogo({ role }) {
  return (
    <NavbarBrand
      className="sm:justify-end"
      as={RouterLink}
      to={role ? "/dashboard" : "/"}
    >
      <img className="w-20 min-w-20 max-md:mx-auto" src={logo}></img>
    </NavbarBrand>
  );
}

export default NavbarLogo;
