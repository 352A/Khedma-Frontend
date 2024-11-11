import {
  IconAddressBook,
  IconFileDescription,
  IconHome,
  IconPremiumRights,
  IconDeviceWatchOff,
  IconDeviceWatchStats2,
  IconBuildings,
  IconCreditCardPay,
  IconCategory,
  IconBriefcase2,
} from "@tabler/icons-react";
import { Input, Textarea } from "@nextui-org/react";
import convertISOToCustomFormat from "../../utils/convertISOToCustomFormat";

export default function DetailsForm({ details }) {
  return (
    <>
      <div className="mb-4">
        <IconAddressBook
          color="#4CAF50"
          className="me-2 inline-block"
          stroke={2}
        />
        <span className="text-primary">العنوان</span>
        <Input
          type="text"
          variant="solid"
          value={details?.offerTitle}
          isReadOnly
        />
      </div>
      <div className="mb-4 flex flex-col gap-x-2 md:flex-row">
        <div className="w-full">
          <IconCategory
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">نوع العمل</span>
          <Input
            type="text"
            variant="solid"
            value={details?.jobCategory}
            isReadOnly
          />
        </div>
        <div className="w-full">
          <IconBriefcase2
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">المهنة المطلوبة</span>
          <Input
            type="text"
            variant="solid"
            value={details?.jobType}
            isReadOnly
          />
        </div>
      </div>
      <div className="mb-4">
        <IconFileDescription
          color="#4CAF50"
          className="me-2 inline-block"
          stroke={2}
        />
        <span className="text-primary">الوصف</span>
        <Textarea
          type="text"
          variant="solid"
          value={details?.offerDescription}
          isReadOnly
        />
      </div>
      <div className="mb-4 flex flex-col gap-x-2 md:flex-row">
        <div className="w-full">
          <IconBuildings
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">المدينة</span>
          <Input type="text" variant="solid" value={details?.city} isReadOnly />
        </div>
        <div className="w-full">
          <IconHome color="#4CAF50" className="me-2 inline-block" stroke={2} />
          <span className="text-primary">العنوان</span>
          <Input
            type="text"
            variant="solid"
            value={details?.address}
            isReadOnly
          />
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-x-2 md:flex-row">
        <div className="w-full">
          <IconPremiumRights
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">السعر</span>
          <Input
            type="text"
            variant="solid"
            value={details?.amount}
            isReadOnly
          />
        </div>
        <div className="w-full">
          <IconCreditCardPay
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">طريقة الدفع</span>
          <Input
            type="text"
            variant="solid"
            value={details?.paymentMethod}
            isReadOnly
          />
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-x-2 md:flex-row">
        <div className="w-full">
          <IconDeviceWatchStats2
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">تاريخ البدء</span>
          <Input
            type="text"
            variant="solid"
            value={convertISOToCustomFormat(details?.startDate)}
            isReadOnly
          />
        </div>
        <div className="w-full">
          <IconDeviceWatchOff
            color="#4CAF50"
            className="me-2 inline-block"
            stroke={2}
          />
          <span className="text-primary">تاريخ الانتهاء</span>
          <Input
            type="text"
            variant="solid"
            value={convertISOToCustomFormat(details?.deliveryDate)}
            isReadOnly
          />
        </div>
      </div>
    </>
  );
}
