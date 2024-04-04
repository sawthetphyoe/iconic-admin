"use client";

import React from "react";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table, { TableColumn } from "@/components/common/Table";
import { BranchDto } from "@/types/branches.types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const BranchTable: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const GetAllBranchesQuery = useGetAllBranches();

  if (GetAllBranchesQuery.isPending) return <Loading />;

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
      title: "No. of Staff",
      dataIndex: "staffCount",
    },
    {
      title: "No. of Products",
      dataIndex: "itemCount",
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
