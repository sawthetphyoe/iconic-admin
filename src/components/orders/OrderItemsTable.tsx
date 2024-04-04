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
import { OrderDto, OrderItemDto } from "@/types/orders.types";
type OrderItemsTableProps = {
  dataSource: OrderItemDto[];
};

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ dataSource }) => {
  const columns: TableColumn<OrderItemDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      render: (product: OrderItemDto["product"]) => product.name,
    },
    {
      title: "Color",
      dataIndex: "product",
      render: (product: OrderItemDto["product"]) => product.variant.color,
    },
    {
      title: "Processor",
      dataIndex: "product",
      render: (product: OrderItemDto["product"]) => product.variant.processor,
    },
    {
      title: "RAM",
      dataIndex: "product",
      render: (product: OrderItemDto["product"]) => product.variant.ram,
    },
    {
      title: "Storage",
      dataIndex: "product",
      render: (product: OrderItemDto["product"]) => product.variant.storage,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
    />
  );
};

export default OrderItemsTable;
