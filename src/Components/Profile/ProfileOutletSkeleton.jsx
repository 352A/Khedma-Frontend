import { Card, Skeleton } from "@nextui-org/react";

export default function ProfileOutletSkeleton() {
  return (
    <Card className="my-3 h-[300px] space-y-5 rounded-2xl bg-gray-100 p-5">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="ml-auto w-3/5 rounded-lg">
          <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="ml-auto w-4/5 rounded-lg">
          <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="ml-auto w-2/5 rounded-lg">
          <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
