import { Skeleton } from "@nextui-org/react";

export default function DashboardSkeleton() {
  return (
    <>
      <section
        dir="rtl"
        className="mx-28 my-12 grid grid-cols-4 gap-4 max-xl:mx-12 max-lg:mx-2 max-lg:grid-cols-5 max-sm:my-4 max-sm:grid-cols-1"
      >
        <article
          id="sidebar"
          className="max-lg:order-2 max-lg:col-span-2 max-sm:hidden"
        >
          <div>
            <Skeleton className="relative mb-2 flex h-96 flex-col gap-4 rounded-xl px-6 pb-7 pt-7 shadow-sm max-md:w-full"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-72 rounded-lg"></Skeleton>
            <Skeleton className="mt-2 h-72 rounded-lg"></Skeleton>
          </div>
        </article>

        <article
          id="main"
          className="col-span-3 grid grid-cols-2 grid-rows-[auto_1fr] gap-4 max-lg:order-1 max-lg:col-span-3 max-lg:flex max-lg:flex-col"
        >
          <Skeleton className="relative col-span-2 grid h-64 grid-cols-2 justify-items-center overflow-hidden rounded-2xl bg-cover bg-no-repeat max-lg:col-span-1 max-lg:h-fit max-lg:grid-cols-1"></Skeleton>

          <Skeleton className="h-16 rounded-lg"></Skeleton>

          <Skeleton className="h-16 rounded-lg"></Skeleton>
        </article>

        {/* <Skeleton className="h-96 rounded-lg max-lg:order-2 max-lg:col-span-2 max-sm:hidden"></Skeleton>

        <Skeleton className="col-span-3 grid h-72 w-full grid-cols-2 grid-rows-[auto_1fr] gap-4 rounded-lg max-lg:order-1 max-lg:col-span-3 max-lg:flex max-lg:flex-col"></Skeleton>
        <Skeleton className="h-72 rounded-lg"></Skeleton>
        <Skeleton className="h-24 rounded-lg"></Skeleton>
        <Skeleton className="h-24 rounded-lg"></Skeleton> */}
      </section>
    </>
  );
}
