import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function LoginTabs({ onClose }) {
  const { accountType, setAccountType } = useContext(authContext);

  return (
    <>
      <div className="flex w-full flex-col py-1">
        <Card className="rounded-none bg-secondary shadow-none">
          <CardBody className="overflow-hidden text-right">
            <Tabs
              fullWidth
              color={"primary"}
              size="md"
              aria-label="Tabs form"
              selectedKey={accountType}
              onSelectionChange={setAccountType}
            >
              <Tab
                key="user"
                title={
                  <span className={accountType === "user" ? "text-white" : ""}>
                    عميل
                  </span>
                }
              >
                <LoginForm onClose={onClose} />
              </Tab>
              <Tab
                key="craftsman"
                title={
                  <span
                    className={accountType === "craftsman" ? "text-white" : ""}
                  >
                    مقدم خدمة
                  </span>
                }
              >
                <LoginForm onClose={onClose} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
