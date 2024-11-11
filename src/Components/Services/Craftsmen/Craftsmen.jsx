import api from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { profileContext } from "../../../Context/ProfileContext";
import CraftsmenSkeleton from "./CraftsmenSkeleton";
import CraftsmanCard from "./CraftsmanCard";
import { cities } from "../../../constants/cities";
import { IconBuildingCommunity } from "@tabler/icons-react";
import { Select, SelectItem } from "@nextui-org/react";
import { Helmet } from "react-helmet-async";

export default function Craftsmen() {
  const { userProfileData } = useContext(profileContext);
  const { job } = useParams();
  const endPoint = `craftsman/job-type/${job}`;
  const token = sessionStorage.getItem("token");
  const [craftsmen, setCraftsmen] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCraftsmen(selectedCity = "") {
    try {
      setLoading(true);
      const { data } = await api.get(endPoint, {
        params: { city: selectedCity },
      });
      setCraftsmen(data.craftsmen || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && userProfileData) {
      if (userProfileData?.city) {
        getCraftsmen(userProfileData.city);
      }
    } else if (!token) {
      getCraftsmen("");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [userProfileData]);

  const handleCityChange = (newCity) => {
    getCraftsmen(newCity);
  };

  return (
    <>
      <Helmet>
        <title> خدمة | مقدمي الخدمات</title>
      </Helmet>
      <div dir="rtl" className="my-16 px-12">
        <h1 className="text-center text-3xl font-bold text-primary">
          مقدمي الخدمات
        </h1>

        <div className="my-8 w-[200px]">
          <div className="mb-1 flex flex-row items-center gap-x-3">
            <IconBuildingCommunity color="#4CAF50" stroke={2} />
            <label className="mb-2 block text-primary">المدينة</label>
          </div>
          <Select
            variant="bordered"
            size="sm"
            id="city"
            dir="rtl"
            label="اختر المدينة"
            className="w-full p-0 outline-none"
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <SelectItem key="">الكل</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>

        {loading && craftsmen ? (
          <CraftsmenSkeleton />
        ) : craftsmen.length === 0 ? (
          <p className="my-28 text-center text-2xl text-gray-600">
            لا يوجد مقدمي خدمات في هذه المنطقة حاليا
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {craftsmen.map((craftsman) => (
              <CraftsmanCard key={craftsman._id} craftsman={craftsman} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
