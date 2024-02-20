"use client";

import React from "react";
import Table, { TableColumn } from "@/components/common/Table";
import { StaffRole } from "@/lib/enums";

const dataSources: { id: string; name: string; role: StaffRole }[] = [
  { id: "1", name: "Saw Thet", role: StaffRole.Admin },
  { id: "2", name: "Moe Pann", role: StaffRole.Admin },
];

const BranchStaffTable: React.FC = () => {
  const columns: TableColumn<{ id: string; name: string; role: StaffRole }>[] =
    [
      {
        title: "No.",
        dataIndex: "id",
        width: "20%",
        render: (_, __, index) => index + 1,
      },
      {
        title: "Staff Name",
        dataIndex: "name",
        width: "40%",
      },
      {
        title: "Role",
        dataIndex: "role",
      },
    ];

  return (
    <Table
      dataSource={[]}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      onRowClick={(record) => {
        console.log({ record });
      }}
    />
  );
};

export default BranchStaffTable;
