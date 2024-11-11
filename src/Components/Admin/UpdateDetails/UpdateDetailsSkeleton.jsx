import { Skeleton } from "@nextui-org/react";

export default function UpdateDetailsSkeleton() {
  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-9 rounded-xl border">
        <Skeleton className="w-full rounded-lg">
          <div className="h-screen w-full rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <figure className="col-span-3 rounded-xl">
        <Skeleton className="w-full rounded-lg">
          <div className="h-screen w-full rounded-lg bg-default-200"></div>
        </Skeleton>
      </figure>
    </section>
  );
}
