import verifiedPhoto from "../../../assets/Images/verifiedCraftsman.svg";

export default function Verified() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <img src={verifiedPhoto} alt="verified" />
      <p className="my-2">تم توثيق حسابك بنجاح</p>
      <p> شكرا لك</p>
    </div>
  );
}
