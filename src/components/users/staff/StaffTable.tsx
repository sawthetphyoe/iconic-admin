"use client";

import React from "react";
import Table, { TableColumn } from "@/components/common/Table";
import { StaffDto } from "@/types/staff.types";
import dayjs from "dayjs";
import getDisplayRole from "@/utils/getDisplayRole";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

type StaffTableProps = {
  dataSource: StaffDto[];
};

const StaffTable: React.FC<StaffTableProps> = ({ dataSource }) => {
  const router = useRouter();
  const pathname = usePathname();
  const columns: TableColumn<StaffDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (branch: StaffDto["branch"]) => (branch ? branch.name : "-"),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => getDisplayRole(text),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "",
      dataIndex: "id",
      width: "50px",
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
      titleClassname={"text-sm font-semibold"}
      rowClassname={"cursor-pointer"}
      onRowClick={(record) => {
        router.push(`${pathname}/${record.id}`);
      }}
    />
  );
};

export default StaffTable;
