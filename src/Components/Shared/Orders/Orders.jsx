import { Link as LinkasRouterLink } from "react-router-dom";
import { Listbox, Avatar, ListboxItem, Chip } from "@nextui-org/react";
import { IconCash, IconCalendarFilled } from "@tabler/icons-react";
import OrderStatusBadge from "./OrderStatusBadge";

export default function Orders({ allOrders, role }) {
  const formattedOrders = allOrders
    ? allOrders.map((order) => {
        const date = new Date(order.updatedAt);
        const formattedDate = date.toLocaleDateString("ar-EG");
        const startDate = new Date(
          order.orderDetails.startDate,
        ).toLocaleDateString("ar-EG");
        const deliveryDate = new Date(
          order.orderDetails.deliveryDate,
        ).toLocaleDateString("ar-EG");

        const details = role === "user" ? "craftsmanDetails" : "userDetails";

        return {
          id: order._id,
          title: order.orderDetails.offerTitle,
          description: order.orderDetails.offerDescription,
          status: order.status,
          date: formattedDate,
          customerName: `${order[details].firstName} ${order[details].lastName}`,
          userPic: order[details]?.profilePic,
          amount: order.orderDetails.amount,
          startDate,
          deliveryDate,
          isDeliveredByCraftsman: order.isDeliveredByCraftsman,
          isDeliveredByUser: order.isDeliveredByUser,
        };
      })
    : [];

  return (
    <div className="mx-12 ms-auto h-80 w-full overflow-auto rounded-lg border p-4 scrollbar-hide">
      <label
        id="orders-list-label"
        className="absolute -top-[9999px] left-[-9999px]"
      >
        قائمة الطلبات
      </label>
      <Listbox
        emptyContent="لا يوجد طلبات"
        dir="rtl"
        items={formattedOrders.reverse()}
        aria-labelledby="orders-list-label"
        variant="light"
        className="mt-2"
      >
        {(item) => (
          <ListboxItem
            as={LinkasRouterLink}
            to={`/order-details/${item.id}`}
            key={item.id}
            aria-labelledby={`order-title-${item.id}`}
            aria-describedby={`order-description-${item.id}`}
            description={
              <>
                <p id={`order-description-${item.id}`} className="mt-2">
                  {item.description}
                </p>
                <div className="my-4 flex flex-wrap gap-2">
                  <Chip
                    color="secondary"
                    variant="bordered"
                    size="sm"
                    startContent={<IconCalendarFilled size={15} />}
                    className="px-1 font-bold tracking-wider text-primary"
                  >
                    {item.date}
                  </Chip>
                  <Chip
                    color="secondary"
                    variant="bordered"
                    size="sm"
                    startContent={<IconCalendarFilled size={15} />}
                    className="px-1 font-bold tracking-wider text-primary"
                  >
                    {item.startDate}
                  </Chip>
                  <Chip
                    variant="solid"
                    size="sm"
                    color="primary"
                    startContent={<IconCash size={15} />}
                    className="px-2 font-bold tracking-wider text-white"
                  >
                    {item.amount} جم
                  </Chip>
                  <div className="absolute left-4 top-4 font-bold tracking-wider">
                    <OrderStatusBadge
                      orderStatus={item.status}
                      isDeliveredByCraftsman={item.isDeliveredByCraftsman}
                      isDeliveredByUser={item.isDeliveredByUser}
                      role={role}
                      size="sm"
                      iconSize={15}
                    />
                  </div>
                </div>
              </>
            }
            startContent={
              <Avatar
                alt={item.userPic}
                className="me-1 mt-1 flex-shrink-0 self-start"
                size="sm"
                src={item.userPic}
              />
            }
            className="mt-2 bg-gray-100 p-4 even:bg-gray-50"
          >
            <h2 className="text-gray-800">{item.customerName}</h2>
            <div
              className="mt-1 text-tiny text-primary"
              id={`orders-title-${item.id}`}
            >
              {item.title}
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}
