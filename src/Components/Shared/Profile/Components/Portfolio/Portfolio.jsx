import PortfolioCard from "./PortfolioCard";
import { useLocation } from "react-router-dom";
import PortfolioAddCard from "./PortfolioAddCard";

export default function Portfolio({ portfolio, getPortfolio }) {
  const location = useLocation();
  return (
    <>
      <div dir="rtl" className="col-span-3 rounded-3xl bg-gray-100 md:p-5">
        <h2 className="mb-6 text-xl font-semibold text-gray-600">
          معرض الاعمال
        </h2>
        <div className="flex max-h-[400px] flex-col gap-5 overflow-auto bg-gray-100 scrollbar-hide md:flex-row">
          {location.pathname === "/profile/gallery" && portfolio.length < 5 && (
            <PortfolioAddCard getPortfolio={getPortfolio} />
          )}
          {portfolio.map((card, indx) => (
            <PortfolioCard key={indx} card={card} getPortfolio={getPortfolio} />
          ))}
        </div>
      </div>
    </>
  );
}
