import React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

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
import { SearchIcon } from "../../../assets/Icons/SearchIcon";
import { ChevronDownIcon } from "../../../assets/Icons/ChevronDownIcon";
import { columns, statusOptions, jobCategoryOptions } from "./data";

const ApplicationsEndpoint = "admin/craftsmenApplications";

const statusColorMap = {
  approved: "success",
  pending: "warning",
  rejected: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "firstName",
  "lastName",
  "jobType",
  "jobCategory",
  "status",
  "actions",
  "city",
  "email",
  "documents",
];

export default function Applications() {
  const { token, bearerKey } = useContext(authContext);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const { data } = await api.get(ApplicationsEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setUsers(data.craftsmenApplications);
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobCategoryFilter, setJobCategoryFilter] = useState(new Set([]));
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
        user.craftsmanDetails.email.includes(filterValue),
      );
    }

    if (statusFilter !== "all" && statusFilter.size > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        statusFilter.has(user.status),
      );
    }

    if (jobCategoryFilter.size > 0) {
      if (jobCategoryFilter.has("all")) {
      } else {
        filteredUsers = filteredUsers.filter((user) =>
          jobCategoryFilter.has(user.craftsmanDetails.jobCategory),
        );
      }
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, jobCategoryFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let first, second;

      if (
        sortDescriptor.column === "firstName" ||
        sortDescriptor.column === "lastName" ||
        sortDescriptor.column === "jobType" ||
        sortDescriptor.column === "jobCategory" ||
        sortDescriptor.column === "city"
      ) {
        first = a.craftsmanDetails[sortDescriptor.column];
        second = b.craftsmanDetails[sortDescriptor.column];
      } else {
        first = a[sortDescriptor.column];
        second = b[sortDescriptor.column];
      }

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
      case "firstName":
        return <>{user.craftsmanDetails.firstName}</>;
      case "lastName":
        return <>{user.craftsmanDetails.lastName}</>;
      case "email":
        return <>{user.craftsmanDetails.email}</>;
      case "jobType":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold mt-1 text-tiny capitalize text-default-500">
              {user.craftsmanDetails.jobType}
            </p>
          </div>
        );
      case "jobCategory":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold mt-1 text-tiny capitalize text-default-500">
              {user.craftsmanDetails.jobCategory}
            </p>
          </div>
        );
      case "city":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold mt-1 text-tiny capitalize text-default-500">
              {user.craftsmanDetails.city}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue === "pending"
              ? "قيد الانتظار"
              : cellValue === "approved"
                ? "موثق"
                : cellValue === "rejected"
                  ? "مرفوض"
                  : "غير مكتمل"}
          </Chip>
        );
      case "documents":
        return <p>{Object.keys(user.documents).length}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Button
              color="primary"
              size="sm"
              variant="solid"
              as={RouterLink}
              to={`/admin-dashboard/verify-craftsman-account/${user.craftsmanId}`}
            >
              تحقق
            </Button>
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
                  حالة الطلب
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="status"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
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
                  مجال العمل
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Job Category"
                closeOnSelect={true}
                selectionMode="multiple"
                selectedKeys={Array.from(jobCategoryFilter)}
                onSelectionChange={(keys) => {
                  setJobCategoryFilter(new Set(keys));
                }}
              >
                {jobCategoryOptions.map((jobCategory) => (
                  <DropdownItem key={jobCategory.uid} className="capitalize">
                    {jobCategory.name}
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
            {users.length} عدد الطلبات
          </span>
          <label className="flex items-center text-small text-default-400">
            عدد الصفوف للصفحة :
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
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
      isCompact
      removeWrapper
      aria-label="craftsmen applications table"
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
          <TableRow key={item.craftsmanId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
