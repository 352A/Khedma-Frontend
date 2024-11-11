import { QuotesIcon } from "../../../../assets/Icons/QuotesIcon";

export default function Bio({ userData }) {
  return (
    <div
      dir="rtl"
      className="col-span-3 flex flex-col rounded-3xl bg-gray-100 p-5 text-lg font-medium text-gray-800"
    >
      <span className="fill-primary/35">
        <QuotesIcon width={60} height={60} />
      </span>
      <p className="px-8 py-4 text-center">{userData?.careerDescription}</p>
    </div>
  );
}
