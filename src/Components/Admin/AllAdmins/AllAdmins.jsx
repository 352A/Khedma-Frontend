import { useContext, useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";
import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../../assets/Icons/VerticalDotsIcon";
import { SearchIcon } from "../../../assets/Icons/SearchIcon";
import { ChevronDownIcon } from "../../../assets/Icons/ChevronDownIcon";
import { columns, roleOptions } from "./data";

const AllAdminsEndPoint = "admin/getAllAdmins";

const statusColorMap = {
  online: "success",
  offline: "warning",
  suspended: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "firstName",
  "lastName",
  "jobType",
  "status",
  "actions",
  "email",
  "verified",
  "role",
];
export default function AllAdmins() {
  const { token, bearerKey } = useContext(authContext);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const { data } = await api.get(AllAdminsEndPoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setUsers(data.allAdmins);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getUsers();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [token]);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [roleFilter, setroleFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: null,
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.includes(filterValue),
      );
    }

    if (roleFilter !== "all" && roleFilter.size > 0) {
      filteredUsers = filteredUsers.filter((user) => roleFilter.has(user.role));
    }

    return filteredUsers;
  }, [users, filterValue, roleFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "role":
        return <>{cellValue === "rootAdmin" ? "رئيسي" : "فرعي"}</>;
      case "status":
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue === "online"
              ? "متصل"
              : cellValue === "offline"
                ? "غير متصل"
                : "موقوف"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Dropdown className="border-1 border-default-200 bg-background">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem color="primary" variant="flat">
                  تعديل
                </DropdownItem>
                <DropdownItem color="danger" variant="flat">
                  ايقاف
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-end gap-3">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  الصلاحية
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="role"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setroleFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role.uid} className="capitalize">
                    {role.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  الاعمدة
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns
                  .map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {column.name}
                    </DropdownItem>
                  ))
                  .reverse()}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Input
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            dir="rtl"
            placeholder="ابحث بالبريد الالكتروني..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {users.length} : عدد المديرين
          </span>
          <label className="flex items-center text-small text-default-400">
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            : عدد الصفوف للصفحة
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    roleFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-primary text-background",
          }}
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, paginatedItems.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isStriped
      isCompact
      removeWrapper
      aria-label="all craftsmen table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      dir="rtl"
      classNames={{
        header: "bg-background",
        body: "bg-background",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns.reverse()}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"لا يوجد حسابات"} items={paginatedItems}>
        {(item) => (
          <TableRow key={item._id.toString()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
