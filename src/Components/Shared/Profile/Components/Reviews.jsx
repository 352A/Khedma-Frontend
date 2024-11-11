import { Avatar } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import Stars from "./Stars";

export default function Reviews({ reviews, maxHeight }) {
  const formattedReviews = reviews
    ? reviews.map((review) => {
        return {
          id: review.id,
          firstName: review.craftsmanDetails.firstName,
          lastName: review.craftsmanDetails.lastName,
          username: review.craftsmanDetails.username,
          profilePic: review.craftsmanDetails.profilePic,
          rating: review.rating,
          reviewDescription: review.reviewDescription,
        };
      })
    : [];

  return (
    <>
      <div
        dir="rtl"
        className="col-span-3 flex flex-col rounded-3xl bg-gray-100 p-5"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-600">التقييمات</h2>
        <Listbox
          dir="rtl"
          items={formattedReviews.reverse()}
          aria-label="Dynamic Actions"
          emptyContent="لا يوجد تقييمات"
          variant="flat"
          className={`${maxHeight} overflow-y-auto scrollbar-hide`}
        >
          {(item) => (
            <ListboxItem
              key={item.id}
              endContent={<Stars rating={item.rating} />}
              className="mt-2 cursor-default flex-col bg-gray-100 p-4 even:bg-gray-50 sm:flex-row"
              textValue="order"
            >
              <div className="flex gap-x-2">
                <Avatar
                  alt="avatar"
                  className="me-1 mt-1 flex-shrink-0 self-start"
                  src={item.profilePic}
                />
                <div>
                  <h2 className="text-primary">{`${item.firstName} ${item.lastName}`}</h2>
                  <p className="text-tiny text-gray-800">{item.username}@</p>
                  <div className="mt-1 text-gray-800">
                    {item.reviewDescription}
                  </div>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </>
  );
}
