"use client";

import React from "react";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table, { TableColumn } from "@/components/common/Table";
import { BranchDto } from "@/types/branches.types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import useGetAllPaymentTypes from "@/hooks/payment-types/useGetAllPaymentTypes";
import { PaymentTypeDto } from "@/types/paymentType.types";
import useGetAllCustomers from "@/hooks/customers/useGetAllCustomers";
import { CustomerDto } from "@/types/customers.types";
import { StaffDto } from "@/types/staff.types";
import dayjs from "dayjs";
type CustomersTableProps = {
  dataSource: CustomerDto[];
};

const CustomersTable: React.FC<CustomersTableProps> = ({ dataSource }) => {
  const router = useRouter();
  const pathname = usePathname();

  const columns: TableColumn<CustomerDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Member Type",
      dataIndex: "memberType",
    },
    {
      title: "Registered Date",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    // {
    //   title: "",
    //   dataIndex: "id",
    //   render: () => (
    //     <div className={"flex px-4 w-full justify-end"}>
    //       <MdOutlineKeyboardArrowRight size={20} />
    //     </div>
    //   ),
    // },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      rowClassname={"cursor-pointer"}
    />
  );
};

export default CustomersTable;
