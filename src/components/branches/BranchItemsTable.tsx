"use client";

import React from "react";
import Table, { TableColumn } from "@/components/common/Table";

const dataSources: { id: string; name: string; price: number }[] = [
  { id: "1", name: "i Phone 17 Super Pro Max", price: 1000 },
  { id: "2", name: "MacBook M16 Cloud", price: 40000 },
];

const BranchItemsTable: React.FC = () => {
  const columns: TableColumn<{ id: string; name: string; price: number }>[] = [
    {
      title: "No.",
      dataIndex: "id",
      width: "20%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Item Name",
      dataIndex: "name",
      width: "40%",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  return (
    <Table
      loading={true}
      dataSource={dataSources}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      onRowClick={(record) => {
        console.log({ record });
      }}
    />
  );
};

export default BranchItemsTable;
