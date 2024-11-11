import { Chip } from "@nextui-org/react";

export default function WorkArea({ userData }) {
  return (
    <div className="flex h-fit w-full flex-col gap-1 rounded-xl border-2 border-gray-100 bg-gray-800 px-5 py-5 shadow-sm">
      <h1 className="text-lg font-bold text-gray-100">أماكن العمل</h1>
      <div className="mt-4 grid grid-cols-2 gap-3 max-md:grid-cols-3">
        {userData?.workArea?.map((area) => (
          <Chip
            key={area}
            size="lg"
            variant="flat"
            color="primary"
            className="max-w-full rounded-full px-2 py-1 text-center text-tiny"
          >
            {area}
          </Chip>
        ))}
      </div>
    </div>
  );
}
