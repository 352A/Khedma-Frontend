import { IconStar, IconStarFilled } from "@tabler/icons-react";

export default function Stars({ rating }) {
  return (
    <div className="my-4 flex flex-row-reverse items-center justify-center text-small text-warning">
      {Array.from({ length: 5 }).map((_, index) =>
        index < rating ? (
          <IconStarFilled key={index} size={20} />
        ) : (
          <IconStar key={index} size={20} />
        ),
      )}
    </div>
  );
}
