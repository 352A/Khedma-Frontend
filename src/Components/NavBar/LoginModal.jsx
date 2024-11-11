import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import LoginTabs from "../Authentication/Login/LoginTabs";
import { Link as RouterLink } from "react-router-dom";

export default function LoginModal({ activeLink }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {activeLink === "/login" ||
      activeLink === "/register" ||
      activeLink === "/forget-code" ||
      activeLink === "/reset-password" ||
      activeLink === "/register-form" ? (
        <Button
          as={RouterLink}
          to="/login"
          className="rounded-full bg-secondary"
        >
          تسجيل الدخول
        </Button>
      ) : (
        <Button onPress={onOpen} className="rounded-full bg-secondary">
          تسجيل الدخول
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-secondary"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="p-5"></ModalHeader>
              <ModalBody>
                <LoginTabs onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
