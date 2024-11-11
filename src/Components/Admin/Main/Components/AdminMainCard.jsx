import { children } from "react";

export default function AdminMainCard({ children, color, span }) {
  return (
    <div
      dir="rtl"
      className={`relative h-64 animate-gradient grid-cols-2 bg-gradient-animation bg-400% bg-no-repeat col-span-${span} justify-items-center overflow-hidden rounded-2xl bg-${color} bg-no-repeat shadow-sm transition-transform delay-75 duration-300 ease-in-out hover:scale-105 max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1`}
    >
      {children}
    </div>
  );
}
