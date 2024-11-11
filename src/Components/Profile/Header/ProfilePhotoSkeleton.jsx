import { Card, Skeleton } from "@nextui-org/react";

export default function ProfilePhotoSkeleton() {
  return (
    <>
      <Card className="w-full space-y-5 bg-gray-100 p-4" radius="lg">
        <Skeleton className="m-auto h-[100px] w-[100px] rounded-full sm:h-[150px] sm:w-[150px]">
          <div className="h-24 rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="m-auto w-1/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="m-auto w-2/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
        </div>
      </Card>
    </>
  );
}
