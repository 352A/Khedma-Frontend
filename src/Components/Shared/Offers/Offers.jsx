import { Link as LinkasRouterLink } from "react-router-dom";
import { Listbox, Avatar, ListboxItem, Chip } from "@nextui-org/react";
import {
  IconStopwatch,
  IconCash,
  IconCalendarFilled,
  IconBan,
} from "@tabler/icons-react";

export default function Offers({ allOffers, userData }) {
  const formattedOffers = allOffers
    ? allOffers.map((offer) => {
        const date = new Date(offer.updatedAt);
        const formattedDate = date.toLocaleDateString("ar-EG");
        const userDetails =
          userData?.role === "user" ? "craftsmanDetails" : "userDetails";
        return {
          id: offer._id,
          title: offer.offerTitle,
          description: offer.offerDescription,
          status: offer.status,
          date: formattedDate,
          userPic: offer[userDetails].profilePic,
          amount: offer.amount,
        };
      })
    : [];

  return (
    <div className="mx-12 ms-auto h-80 w-full overflow-auto rounded-lg border p-4 scrollbar-hide">
      <label
        id="offers-list-label"
        className="absolute -top-[9999px] left-[-9999px]"
      >
        قائمة الطلبات
      </label>
      <Listbox
        emptyContent="لا يوجد عروض"
        dir="rtl"
        items={formattedOffers.reverse()}
        aria-labelledby="offers-list-label"
        variant="light"
        className="mt-2"
      >
        {(item) => (
          <ListboxItem
            as={LinkasRouterLink}
            to={`/offer-details/${item.id}`}
            key={item.id}
            aria-labelledby={`offer-title-${item.id}`}
            aria-describedby={`offer-description-${item.id}`}
            description={
              <>
                <p id={`offer-description-${item.id}`} className="mt-2">
                  {item.description}
                </p>
                <div className="mt-4 flex">
                  <Chip
                    color="secondary"
                    variant="bordered"
                    size="sm"
                    startContent={<IconCalendarFilled size={16} />}
                    className="px-1 font-bold tracking-wider text-primary"
                  >
                    {item.date}
                  </Chip>
                  <Chip
                    variant="solid"
                    size="sm"
                    color="primary"
                    className="mr-2 px-2 font-bold tracking-wider"
                    startContent={<IconCash size={18} />}
                  >
                    {item.amount} جم
                  </Chip>
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
            endContent={
              item.status === "pending" ? (
                <IconStopwatch className="text-warning" />
              ) : (
                <IconBan className="text-danger" />
              )
            }
            className="mt-2 bg-gray-100 p-4 even:bg-gray-50"
          >
            <span id={`offer-title-${item.id}`}>{item.title}</span>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}
