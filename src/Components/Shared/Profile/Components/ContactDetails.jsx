import {
  IconMail,
  IconMapPin,
  IconDeviceMobile,
  IconBuildings,
} from "@tabler/icons-react";

export default function ContactDetails({ userData }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-5 py-5 text-white shadow-sm">
      <h1 className="text-lg font-bold text-gray-100">بيانات الاتصال</h1>
      <div>
        <p className="mb-2">
          <IconDeviceMobile
            color="#4CAF50"
            size={20}
            className="me-1 inline-block"
          />
          {userData?.phone}
        </p>
        <p className="mb-2">
          <IconMail color="#4CAF50" size={20} className="me-1 inline-block" />
          {userData?.email}
        </p>
        <p className="mb-2">
          <IconBuildings
            color="#4CAF50"
            size={20}
            className="me-1 inline-block"
          />
          {userData?.address}
        </p>
        <p className="mb-2">
          <IconMapPin color="#4CAF50" size={20} className="me-1 inline-block" />
          {userData?.city}
        </p>
      </div>
    </div>
  );
}
