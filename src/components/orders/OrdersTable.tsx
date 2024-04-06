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
import { OrderDto } from "@/types/orders.types";
type OrdersTableProps = {
  dataSource: OrderDto[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ dataSource }) => {
  const router = useRouter();
  const pathname = usePathname();

  const columns: TableColumn<OrderDto>[] = [
    {
      title: "Order ID",
      dataIndex: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentType",
    },
    {
      title: "No. of Items",
      dataIndex: "orderItems",
      render: (orderItems: OrderDto["orderItems"]) =>
        orderItems.reduce((acc, item) => acc + item.quantity, 0),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Ordered Date",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "",
      dataIndex: "id",
      render: () => (
        <div className={"flex px-4 w-full justify-end"}>
          <MdOutlineKeyboardArrowRight size={20} />
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      rowClassname={"cursor-pointer"}
      onRowClick={(record) => {
        router.push(`${pathname}/${record.id}`);
      }}
    />
  );
};

export default OrdersTable;
