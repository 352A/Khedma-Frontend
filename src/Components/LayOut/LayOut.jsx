import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export default function LayOut() {
  const location = useLocation();
  return (
    <>
      <div className="sm:min-h-screen">
        <div
          className={
            location.pathname === "/" || location.pathname === "/home"
              ? "fixed top-0 -z-40 h-24 w-full bg-primary"
              : ""
          }
        ></div>
        <NavBar />
        <Outlet />
        <ScrollToTopButton />
      </div>
      <Footer />
    </>
  );
}
