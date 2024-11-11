import { useState } from "react";

import { Navbar } from "@nextui-org/react";

import NavbarActions from "./NavbarActions";
import NavbarLinks from "./NavbarLinks";
import NavbarBurgerMenu from "./NavbarBurgerMenu";
import NavbarLogo from "./NavbarLogo";
import NavbarDropdown from "./NavbarDropdown";

export default function NavBar() {
  const role = sessionStorage.getItem("role");

  const [activeLink, setActiveLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const [navbarBg, setNavbarBg] = useState("bg-primary/5");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     // Adjust scroll value for earlier change (70% of the viewport height)
  //     const threshold = window.innerHeight * 0.67;

  //     if (scrollPosition > threshold) {
  //       setNavbarBg("bg-primary");
  //     } else {
  //       setNavbarBg("bg-transparent");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navbarStyles = [
    "flex",
    "relative",
    "h-full",
    "items-center",
    "data-[active=true]:text-slate-100",
    "data-[active=true]:after:content-['']",
    "data-[active=true]:after:absolute",
    "data-[active=true]:after:bottom-0",
    "data-[active=true]:after:left-0",
    "data-[active=true]:after:right-0",
    "data-[active=true]:after:h-[6px]",
    "data-[active=true]:after:rounded-[2px]",
    "data-[active=true]:after:animate-slideInRight",
    `${activeLink === "/home" ? "data-[active=true]:after:bg-slate-100" : "data-[active=true]:after:bg-primary"}`,
  ];

  return (
    <>
      {
        <Navbar
          shouldHideOnScroll
          isBlurred={false}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className={`${activeLink === "/" || activeLink === "/home" ? "bg-primary" : "bg-white"}`}
          classNames={{
            item: navbarStyles,
          }}
        >
          {!role ? (
            <NavbarActions activeLink={activeLink} />
          ) : (
            <NavbarDropdown activeLink={activeLink} />
          )}

          <NavbarLinks
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            role={role}
          />

          <NavbarLogo role={role} />

          <NavbarBurgerMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleLinkClick={handleLinkClick}
          />
        </Navbar>
      }
    </>
  );
}
