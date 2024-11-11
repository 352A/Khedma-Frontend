import { useState } from "react";

import { NavbarContent, NavbarItem, Button, Badge } from "@nextui-org/react";
import {
  IconBellFilled,
  IconMessageFilled,
  IconMessageDown,
} from "@tabler/icons-react";

import DropDown from "./DropDown";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

function NavbarDropdown({ activeLink }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavbarContent>
      <NavbarItem className="gap-3 max-sm:mx-auto">
        <DropDown />

        <Dropdown placement="bottom">
          <DropdownTrigger>
            {/* <Badge
          content="+1"
          shape="circle"
          size="sm"
          className="bg-rose-600 text-slate-100 max-md:hidden"
        > */}
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
              className={`${activeLink === "/home" ? "text-slate-100" : "text-complementary"} transition-transform duration-200 hover:rotate-45 active:rotate-45 max-md:hidden`}
            >
              <IconBellFilled />
            </Button>
            {/* </Badge> */}
          </DropdownTrigger>
          <DropdownMenu
            aria-label="notifications"
            variant="flat"
            className="rounded-xl border-2"
          >
            <DropdownItem key="notifications" className="h-14 gap-2">
              <p className="text-center">لا توجد اشعارات جديدة</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom">
          <DropdownTrigger>
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 messages"
              variant="light"
              className={`${activeLink === "/home" ? "text-slate-100" : "text-complementary"} max-md:hidden`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? <IconMessageDown /> : <IconMessageFilled />}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="messages"
            variant="flat"
            className="rounded-xl border-2"
          >
            <DropdownItem key="messages" className="h-14 gap-2">
              <p className="text-center">لا توجد رسائل جديدة</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NavbarContent>
  );
}

export default NavbarDropdown;
