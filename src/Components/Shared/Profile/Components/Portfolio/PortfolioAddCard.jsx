import { Card, CardFooter } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import PortfolioForm from "./PortfolioForm";

export default function PortfolioAddCard({ getPortfolio }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-full min-w-72 md:w-1/3">
      <Card
        isFooterBlurred
        className="flex h-[300px] w-full items-center justify-center bg-gray-800 shadow-none"
      >
        <IconPlus
          size={150}
          className="cursor-pointer text-gray-200"
          stroke={1}
          onClick={onOpen}
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 text-white dark:border-default-100">
          <p className="text-xs">
            يمكنك اضافه اعمالك الي المعرض لزياده فرصة قبولك في الطلبات
          </p>
        </CardFooter>
      </Card>

      <Modal
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        size="md"
        dir="rtl"
      >
        <ModalContent className="bg-gray-200 p-2">
          {(onClose) => (
            <>
              <ModalHeader className="text-primary">
                <h3>اضافة عمل للمعرض</h3>
              </ModalHeader>
              <ModalBody>
                <PortfolioForm onClose={onClose} getPortfolio={getPortfolio} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
