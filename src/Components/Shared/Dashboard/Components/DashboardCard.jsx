import { children } from "react";

export default function DashboardCard({ children, color, span }) {
  return (
    <div
      dir="rtl"
      className={`relative grid h-24 grid-cols-2 items-center col-span-${span} justify-items-center overflow-hidden rounded-2xl bg-${color} bg-cover bg-no-repeat shadow-sm transition-transform delay-75 duration-300 ease-in-out hover:scale-105 max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1`}
    >
      {children}
    </div>
  );
}
