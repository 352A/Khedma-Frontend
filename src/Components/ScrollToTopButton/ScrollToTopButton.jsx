import { useEffect, useState } from "react";
import { IconChevronsUp } from "@tabler/icons-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 transform rounded-full bg-primary p-3 text-white shadow-lg transition-all duration-300 ${
          isVisible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-50 opacity-0"
        } hover:bg-complementary focus:ring-complementary`}
      >
        <IconChevronsUp stroke={2} />
      </button>
    </div>
  );
}
