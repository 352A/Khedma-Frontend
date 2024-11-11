import { Card, Skeleton } from "@nextui-org/react";

export default function ProfileSideBarSkeleton() {
  return (
    <>
      <Card className="w-full space-y-5 bg-gray-100 p-4" radius="lg">
        <div className="space-y-3">
          <Skeleton className="my-2 rounded-xl p-4">
            <div className="h-3 w-full bg-secondary"></div>
          </Skeleton>
          <Skeleton className="my-2 rounded-xl p-4">
            <div className="h-3 w-full bg-secondary"></div>
          </Skeleton>
          <Skeleton className="my-2 rounded-xl p-4">
            <div className="h-3 w-full bg-secondary"></div>
          </Skeleton>
        </div>
      </Card>
    </>
  );
}
