import { Avatar, Skeleton } from "@nextui-org/react";
export default function DetailsSkeleton() {
  return (
    <div
      dir="rtl"
      className="my-12 flex justify-center gap-12 max-md:flex-col max-md:px-4 md:mx-16 lg:mx-2"
    >
      <section className="flex gap-2 max-sm:flex-col md:flex-col">
        <Skeleton className="w-full rounded-lg md:w-[250px]">
          <div className="h-80 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300"></div>
        </Skeleton>
      </section>
      <div className="flex w-3/5 flex-col gap-8 max-md:w-full">
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-80 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
