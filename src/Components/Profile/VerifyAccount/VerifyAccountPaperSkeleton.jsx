import { Card, Skeleton } from "@nextui-org/react";

export default function VerifyAccountPaperSkeleton() {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="rounded-lg">
          <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <Card
        className="my-6 h-[200px] w-[200px] space-y-5 bg-secondary p-4"
        radius="lg"
      >
        <Skeleton className="rounded-lg">
          <div className="rounded-lg bg-default-300"></div>
        </Skeleton>
      </Card>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-10 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </>
  );
}
