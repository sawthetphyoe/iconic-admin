"use client";

import React from "react";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import LoadingClient from "@/components/common/LoadingClient";
import Error from "@/components/common/Error";
import Table, { TableColumn } from "@/components/common/Table";
import { BranchDto } from "@/types/branch.types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const BranchTable: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const GetAllBranchesQuery = useGetAllBranches();

  if (GetAllBranchesQuery.isPending) return <LoadingClient />;

  if (GetAllBranchesQuery.isError) return <Error />;

  const dataSources = GetAllBranchesQuery.data.payload;

  const columns: TableColumn<BranchDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Branch Name",
      dataIndex: "name",
    },
    {
      title: "Staff Count",
      dataIndex: "staffCount",
    },
    {
      title: "Address",
      dataIndex: "address",
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
      dataSource={dataSources}
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

export default BranchTable;
