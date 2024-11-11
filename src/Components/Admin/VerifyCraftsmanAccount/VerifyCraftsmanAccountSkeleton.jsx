import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  Skeleton,
  CardFooter,
} from "@nextui-org/react";
export default function VerifyCraftsmanAccountSkeleton() {
  return (
    <>
      <div className="flex flex-col-reverse gap-5 md:flex-row">
        <Card dir="rtl" className="flex-grow" shadow="none">
          <CardHeader className="flex gap-3">
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <Divider />
          <CardBody className="text-right">
            <div className="space-y-3">
              <Skeleton className="my-2 w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </CardBody>
          <Divider />
        </Card>
        <Card className="h-[300] w-[250px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-52 rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      </div>
      <div className="mt-5 flex flex-col-reverse gap-5 md:flex-row-reverse">
        <Card dir="rtl" className="flex-grow" shadow="none">
          <CardHeader className="flex gap-3">
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <Divider />
          <CardBody className="text-right">
            <Skeleton className="rounded-lg">
              <div className="h-52 rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardFooter>
          <Divider />
        </Card>
        <Card dir="rtl" className="flex-grow" shadow="none">
          <CardHeader className="flex gap-3">
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <Divider />
          <CardBody className="text-right">
            <Skeleton className="rounded-lg">
              <div className="h-52 rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardFooter>
          <Divider />
        </Card>
        <Card dir="rtl" className="flex-grow" shadow="none">
          <CardHeader className="flex gap-3">
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardHeader>
          <Divider />
          <CardBody className="text-right">
            <Skeleton className="rounded-lg">
              <div className="h-52 rounded-lg bg-default-300"></div>
            </Skeleton>
          </CardBody>
          <CardFooter className="flex items-center justify-center gap-x-2">
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </CardFooter>
          <Divider />
        </Card>
      </div>
    </>
  );
}
