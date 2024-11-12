import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { authContext } from "../../../Context/AuthContext";
import AdminHeader from "./Components/AdminHeader";
import AdminMainCard from "./Components/AdminMainCard";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

function Main() {
  const usersEndpoint = "admin/statistics/users";
  const craftsmenEndpoint = "admin/statistics/craftsmen";
  const offersEndpoint = "admin/statistics/offers";
  const earningsEndpoint = "admin/statistics/earnings";

  const { token, bearerKey } = useContext(authContext);

  const [usersStats, setUsersStats] = useState([]);
  const [craftsmenStats, setCraftsmenStats] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [offersStats, setOffersStats] = useState([]);

  useEffect(() => {
    if (token) {
      getEarnings();
      getUsersStats();
      getCraftsmenStats();
      getOffersStats();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [token]);

  const getUsersStats = async () => {
    try {
      const { data } = await api.get(usersEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setUsersStats(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCraftsmenStats = async () => {
    try {
      const { data } = await api.get(craftsmenEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setCraftsmenStats(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOffersStats = async () => {
    try {
      const { data } = await api.get(offersEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setOffersStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getEarnings = async () => {
    try {
      const { data } = await api.get(earningsEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setEarnings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const chartData = {
    labels: ["مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر"],
    datasets: [
      {
        label: "ارباح الموقع",
        data: [5000, 7000, 8000, 6500, 9000, 12000, 26000],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Website Earnings Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <section dir="rtl" className="grid grid-cols-4 gap-7">
        <AdminHeader color="gray-800/5" span="3" />
        <AdminMainCard color="gray-800/5">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h2 className="text-center text-3xl">الارباح الشهرية</h2>
            <p className="text-center text-6xl font-bold">25730</p>
            <p className="text-center text-4xl font-bold">ج. م.</p>
          </div>
        </AdminMainCard>
        <AdminMainCard color="gray-800/5">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h2 className="text-center text-3xl">عدد العملاء</h2>
            <p className="text-center text-7xl font-bold">
              {usersStats.totalUsers}
            </p>
            <p className="text-center text-4xl font-bold">عميل</p>
          </div>
        </AdminMainCard>
        <AdminMainCard color="gray-800/5">
          <div className="flex flex-col justify-center gap-4 p-8">
            <h2 className="text-center text-3xl">مقدمي الخدمات</h2>
            <p className="text-center text-7xl font-bold">
              {craftsmenStats.totalCraftsmen}
            </p>
            <p className="text-center text-4xl font-bold">مستقل</p>
          </div>
        </AdminMainCard>

        <AdminMainCard color="gray-800/5" span="2">
          <div className="flex h-full justify-center py-4">
            <Line data={chartData} options={options} />
          </div>
        </AdminMainCard>
      </section>
    </>
  );
}

export default Main;
