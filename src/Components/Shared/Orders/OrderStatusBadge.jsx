import { Chip } from "@nextui-org/react";
import {
  IconCircleDashedCheck,
  IconClockPause,
  IconProgress,
  IconSquareRoundedCheck,
  IconStopwatch,
} from "@tabler/icons-react";
export default function OrderStatusBadge({
  orderStatus,
  isDeliveredByCraftsman,
  isDeliveredByUser,
  role,
  size,
  iconSize,
}) {
  return (
    <>
      {orderStatus === "pending" ? (
        <Chip
          variant="flat"
          color="warning"
          radius="lg"
          size={size}
          className="px-2 text-warning"
          startContent={
            <IconStopwatch
              size={iconSize}
              className="inline-block text-warning"
            />
          }
        >
          قيد الانتظار
        </Chip>
      ) : orderStatus === "in progress" ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-gray-800 px-2 text-white"
          startContent={
            <IconProgress size={iconSize} className="inline-block text-white" />
          }
        >
          قيد التنفيذ
        </Chip>
      ) : orderStatus === "completed" ? (
        <Chip
          variant="flat"
          color="primary"
          radius="lg"
          size={size}
          className="px-2"
          startContent={
            <IconSquareRoundedCheck size={iconSize} className="inline-block" />
          }
        >
          اكتمل
        </Chip>
      ) : orderStatus === "arrived" &&
        role === "user" &&
        isDeliveredByCraftsman ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-primary px-2 text-white"
          startContent={
            <IconCircleDashedCheck
              size={iconSize}
              className="inline-block text-white"
            />
          }
        >
          تم الانهاء من المستقل
        </Chip>
      ) : orderStatus === "arrived" && role === "user" && isDeliveredByUser ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-warning px-2 text-white"
          startContent={
            <IconClockPause
              size={iconSize}
              className="inline-block text-white"
            />
          }
        >
          في انتظار المستقل
        </Chip>
      ) : orderStatus === "arrived" &&
        role === "craftsman" &&
        isDeliveredByCraftsman ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-warning px-2 text-white"
          startContent={
            <IconClockPause
              size={iconSize}
              className="inline-block text-white"
            />
          }
        >
          في انتظار العميل
        </Chip>
      ) : orderStatus === "arrived" &&
        role === "craftsman" &&
        isDeliveredByUser ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-primary px-2 text-white"
          startContent={
            <IconCircleDashedCheck
              size={iconSize}
              className="inline-block text-white"
            />
          }
        >
          تم الانهاء من العميل
        </Chip>
      ) : orderStatus === "arrived" ? (
        <Chip
          variant="flat"
          radius="lg"
          size={size}
          className="bg-blue px-2 text-white"
          startContent={
            <IconCircleDashedCheck
              size={iconSize}
              className="inline-block text-white"
            />
          }
        >
          تم الوصول
        </Chip>
      ) : (
        ""
      )}
    </>
  );
}
