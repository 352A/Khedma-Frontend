import { Button } from "@nextui-org/react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

export default function Actions({ onOpen }) {
  return (
    <Button
      onPress={onOpen}
      size="md"
      variant="solid"
      className="text-md mt-4 bg-gray-200"
    >
      <IconSquareRoundedPlusFilled />
      طلب خدمة
    </Button>
  );
}
