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

const PaymentTypesTable: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const GetAllPaymentTypesQuery = useGetAllPaymentTypes();

  if (GetAllPaymentTypesQuery.isPending) return <Loading />;

  if (GetAllPaymentTypesQuery.isError) return <Error />;

  const dataSources = GetAllPaymentTypesQuery.data.payload;

  const columns: TableColumn<PaymentTypeDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Payment Type",
      dataIndex: "name",
    },
    {
      title: "No. of Orders",
      dataIndex: "id",
      render: () => "—",
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
      dataSource={dataSources}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      // rowClassname={"cursor-pointer"}
    />
  );
};

export default PaymentTypesTable;
