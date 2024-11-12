import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { authContext } from "../../../Context/AuthContext";
import * as Yup from "yup";
import { useFormik } from "formik";

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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../../assets/Icons/VerticalDotsIcon";
import { SearchIcon } from "../../../assets/Icons/SearchIcon";
import { ChevronDownIcon } from "../../../assets/Icons/ChevronDownIcon";
import { columns, jobCategoryOptions, verifyOptions } from "./data";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const statusColorMap = {
  online: "success",
  offline: "warning",
  suspended: "danger",
};

const verificationColorMap = {
  true: "success",
  false: "danger",
};

const suspendColorMap = {
  true: "warning",
  false: "",
};

const INITIAL_VISIBLE_COLUMNS = [
  "firstName",
  "lastName",
  "jobType",
  "status",
  "actions",
  "email",
  "verified",
  "city",
  "accountDebt",
  "jobCategory",
  "isBlocked",
  "isSuspended",
];
export default function AllCraftsmen() {
  const { token, bearerKey } = useContext(authContext);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [accountStatus, setAccountStatus] = useState(null);

  const ApplicationsEndpoint = "admin/getAllCraftsmen";
  const handleDebtEndpoint = `admin/debt/craftsman/${currentUser?._id}`;
  const blockCraftsmanEndpoint = `admin/${currentUser?._id}/craftsman/block`;
  const unblockCraftsmanEndpoint = `admin/${currentUser?._id}/craftsman/unblock`;
  const suspendCraftsmanEndpoint = `admin/${currentUser?._id}/craftsman/suspend`;
  const unSuspendCraftsmanEndpoint = `admin/${currentUser?._id}/craftsman/unsuspend`;

  const endPoint =
    accountStatus === "block"
      ? blockCraftsmanEndpoint
      : accountStatus === "unBlock"
        ? unblockCraftsmanEndpoint
        : unSuspendCraftsmanEndpoint;

  const suspendInitialValues = {
    period: "",
  };

  const debtInitialValues = {
    debtAmount: "",
  };

  const suspendValidationSchema = Yup.object({
    period: Yup.number()
      .typeError("يجب إدخال رقم")
      .min(1, "يجب أن يكون العدد أكبر من 0")
      .required("المدة الزمنية مطلوبة"),
  });

  const debtValidationSchema = Yup.object({
    debtAmount: Yup.string()
      .required("قيمة المبلغ مطلوبة")
      .typeError("يجب ادخال رقم"),
  });

  function handleSuccessResponse(data) {
    toast.success(`👏 ${data.message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    getUsers();
    onClose();
  }

  function handleErrorResponse(err) {
    let errorMessage = "";
    if (err.response) {
      errorMessage = err.response.data.message;
    } else if (err.request) {
      errorMessage =
        " خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى لاحقًا.";
    } else {
      errorMessage = ".حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا";
    }
    toast.error(`${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  async function suspendOnSubmit(values) {
    setIsLoading(true);
    const formattedValues = {
      period: `${values.period} days`,
    };
    try {
      const { data } = await api.patch(
        suspendCraftsmanEndpoint,
        formattedValues,
        {
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(data);
    } catch (err) {
      console.log(err);
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function debtOnSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await api.patch(handleDebtEndpoint, values, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      handleSuccessResponse(data);
    } catch (err) {
      handleErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  const suspendFormik = useFormik({
    initialValues: suspendInitialValues,
    onSubmit: suspendOnSubmit,
    validationSchema: suspendValidationSchema,
  });

  const debtFormik = useFormik({
    initialValues: debtInitialValues,
    onSubmit: debtOnSubmit,
    validationSchema: debtValidationSchema,
  });

  async function getUsers() {
    try {
      const { data } = await api.get(ApplicationsEndpoint, {
        headers: {
          Authorization: `${bearerKey}${token}`,
        },
      });
      setUsers(data.allCraftsmen);
    } catch (err) {
      console.log(err);
    }
  }

  async function changeAccountStatus() {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        endPoint,
        {},
        {
          headers: {
            Authorization: `${bearerKey}${token}`,
          },
        },
      );
      handleSuccessResponse(data);
    } catch (err) {
      handleErrorResponse(err);
      console.log(err);
    } finally {
      setIsLoading(false);
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

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [verifyFilter, setverifyFilter] = useState("all");
  const [jobCategoryFilter, setJobCategoryFilter] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: null,
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

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

    if (verifyFilter.size > 0) {
      if (!jobCategoryFilter.has("all")) {
        filteredUsers = filteredUsers.filter((user) =>
          verifyFilter.has(user.verified.toString()),
        );
      }
    }

    if (jobCategoryFilter.size > 0) {
      if (!jobCategoryFilter.has("all")) {
        filteredUsers = filteredUsers.filter((user) =>
          jobCategoryFilter.has(user.jobCategory),
        );
      }
    }

    return filteredUsers;
  }, [users, filterValue, jobCategoryFilter, verifyFilter, hasSearchFilter]);

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
      case "verified":
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={verificationColorMap[user.verified]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "isBlocked":
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={suspendColorMap[user.isBlocked]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "isSuspended":
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={suspendColorMap[user.isSuspended]}
            size="sm"
            variant="dot"
          >
            {cellValue}
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
                <DropdownItem
                  color="primary"
                  variant="flat"
                  className="h-7"
                  textValue={user._id}
                >
                  <Button
                    className="w-full"
                    color="none"
                    as={RouterLink}
                    to={`/admin-dashboard/update-details/craftsman/${user._id}`}
                  >
                    تعديل بيانات المستقل
                  </Button>
                </DropdownItem>
                <DropdownItem
                  color="primary"
                  variant="flat"
                  className="h-7"
                  textValue={user._id}
                >
                  <Button
                    className="w-full"
                    color="none "
                    onPress={() => {
                      onOpen();
                      setCurrentUser(user);
                      setAccountStatus("debt");
                    }}
                  >
                    تعديل المديونية
                  </Button>
                </DropdownItem>
                {!user.isSuspended && !user.isBlocked && (
                  <DropdownItem
                    color="danger"
                    variant="flat"
                    className="h-7"
                    textValue={user._id}
                  >
                    <Button
                      className="w-full"
                      color="none "
                      onPress={() => {
                        onOpen();
                        setAccountStatus("suspend");
                        setCurrentUser(user);
                      }}
                    >
                      ايقاف مؤقت
                    </Button>
                  </DropdownItem>
                )}

                {!user.isBlocked && (
                  <DropdownItem
                    color="danger"
                    variant="flat"
                    className="h-7"
                    textValue={user._id}
                  >
                    <Button
                      className="w-full"
                      color="none "
                      onPress={() => {
                        onOpen();
                        setAccountStatus("block");
                        setCurrentUser(user);
                      }}
                    >
                      ايقاف نهائي
                    </Button>
                  </DropdownItem>
                )}

                {user.isSuspended && !user.isBlocked && (
                  <DropdownItem
                    color="warning"
                    variant="flat"
                    className="h-7"
                    textValue={user._id}
                  >
                    <Button
                      className="w-full"
                      color="none "
                      onPress={() => {
                        onOpen();
                        setAccountStatus("unSuspend");
                        setCurrentUser(user);
                      }}
                    >
                      انهاء فترة الايقاف
                    </Button>
                  </DropdownItem>
                )}

                {user.isBlocked && (
                  <DropdownItem
                    variant="flat"
                    color="warning"
                    className="h-7"
                    textValue={user._id}
                  >
                    <Button
                      className="w-full"
                      color="none "
                      onPress={() => {
                        onOpen();
                        setAccountStatus("unBlock");
                        setCurrentUser(user);
                      }}
                    >
                      استعادة الحساب
                    </Button>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "accountDebt":
        return (
          <p className="text center">
            {user.accountDebt === 0 ? "لا يوجد" : `${user.accountDebt} جنية`}
          </p>
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
                  التوثيق
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="verify"
                closeOnSelect={true}
                selectedKeys={verifyFilter}
                selectionMode="multiple"
                onSelectionChange={setverifyFilter}
              >
                {verifyOptions.map((verify) => (
                  <DropdownItem key={verify.uid} className="capitalize">
                    {verify.name}
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
            {users.length} : عدد مقدمي الخدمات
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
    <>
      <Table
        isStriped
        isCompact
        removeWrapper
        aria-label="all craftsmen table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        dir="rtl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {accountStatus === "debt" && (
                <form onSubmit={debtFormik.handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    تعديل المديونية
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      تعديل مديونية المستقل
                      <span className="font-bold text-gray-800">
                        {`  ${currentUser.firstName} ${currentUser.lastName}`}
                      </span>
                    </p>
                    <Input
                      className="my-3"
                      id="debtAmount"
                      type="number"
                      placeholder="المبلغ"
                      variant="solid"
                      isInvalid={
                        debtFormik.touched.debtAmount &&
                        debtFormik.errors.debtAmount
                      }
                      errorMessage={debtFormik.errors.debtAmount}
                      {...debtFormik.getFieldProps("debtAmount")}
                    />
                  </ModalBody>
                  <ModalFooter dir="ltr">
                    <Button color="danger" variant="light" onPress={onClose}>
                      رجوع
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isLoading}
                      radius="full"
                    >
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="35"
                          color="#fff"
                          radius="14"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "تعديل"
                      )}
                    </Button>
                  </ModalFooter>
                </form>
              )}

              {accountStatus === "suspend" && (
                <form onSubmit={suspendFormik.handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    ايقاف الحساب مؤقتا
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      ايقاف مؤقت لحساب العميل
                      <span className="font-bold text-gray-800">
                        {`  ${currentUser.firstName} ${currentUser.lastName}`}
                      </span>
                    </p>
                    <Input
                      className="my-3"
                      id="period"
                      type="number"
                      placeholder="عدد الايام"
                      variant="solid"
                      isInvalid={
                        suspendFormik.touched.period &&
                        suspendFormik.errors.period
                      }
                      errorMessage={suspendFormik.errors.period}
                      {...suspendFormik.getFieldProps("period")}
                    />
                  </ModalBody>
                  <ModalFooter dir="ltr">
                    <Button color="danger" variant="light" onPress={onClose}>
                      رجوع
                    </Button>
                    <Button
                      type="submit"
                      color="danger"
                      disabled={isLoading}
                      radius="full"
                    >
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="35"
                          color="#fff"
                          radius="14"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "ايقاف"
                      )}
                    </Button>
                  </ModalFooter>
                </form>
              )}
              {accountStatus === "block" && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ايقاف الحساب
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      ايقاف لحساب العميل
                      <span className="font-bold text-gray-800">
                        {`  ${currentUser.firstName} ${currentUser.lastName}`}
                      </span>
                    </p>
                  </ModalBody>
                  <ModalFooter dir="ltr">
                    <Button color="danger" variant="light" onPress={onClose}>
                      رجوع
                    </Button>
                    <Button
                      color="danger"
                      disabled={isLoading}
                      radius="full"
                      onPress={() => {
                        changeAccountStatus();
                      }}
                    >
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="35"
                          color="#fff"
                          radius="14"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "ايقاف"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
              {accountStatus === "unBlock" && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    استعادة الحساب
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      استعادة لحساب العميل
                      <span className="font-bold text-gray-800">
                        {`  ${currentUser.firstName} ${currentUser.lastName}`}
                      </span>
                    </p>
                  </ModalBody>
                  <ModalFooter dir="ltr">
                    <Button color="danger" variant="light" onPress={onClose}>
                      رجوع
                    </Button>
                    <Button
                      color="primary"
                      disabled={isLoading}
                      radius="full"
                      onPress={() => {
                        changeAccountStatus();
                      }}
                    >
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="35"
                          color="#fff"
                          radius="14"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "استعادة"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
              {accountStatus === "unSuspend" && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    انهاء فترة الايقاف
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      انهاء الايقاف لحساب العميل
                      <span className="font-bold text-gray-800">
                        {`  ${currentUser.firstName} ${currentUser.lastName}`}
                      </span>
                    </p>
                  </ModalBody>
                  <ModalFooter dir="ltr">
                    <Button color="danger" variant="light" onPress={onClose}>
                      رجوع
                    </Button>
                    <Button
                      color="primary"
                      disabled={isLoading}
                      radius="full"
                      onPress={() => {
                        changeAccountStatus();
                      }}
                    >
                      {isLoading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="35"
                          color="#fff"
                          radius="14"
                          ariaLabel="three-dots-loading"
                        />
                      ) : (
                        "انهاء"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
