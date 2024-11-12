import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Context/AuthContext";
import Portfolio from "../../Shared/Profile/Components/Portfolio/Portfolio";

const portfolioEndPoint = `craftsman/portfolio`;

export default function Gallery() {
  const { token, bearerKey } = useContext(authContext);
  const [portfolio, setPortfolio] = useState([]);

  async function getPortfolio() {
    try {
      const { data } = await api.get(portfolioEndPoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setPortfolio(data.portfolio);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getPortfolio();
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title> خدمة | معرض الأعمال</title>
      </Helmet>
      <div>
        <Portfolio portfolio={portfolio} getPortfolio={getPortfolio} />
      </div>
    </>
  );
}
