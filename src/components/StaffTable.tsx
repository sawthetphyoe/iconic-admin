"use client";

import React from "react";
import Table, { TableColumn } from "@/components/Table";

type TableDataType = {
  name: string;
  age: number;
};

const StaffTable: React.FC = () => {
  const data: TableDataType[] = [
    { name: "saw thet", age: 20 },
    {
      name: "moe pann",
      age: 19,
    },
  ];

  const columns: TableColumn<TableDataType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value) => {
        return <p>{value}</p>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      titleClassname={"text-base font-medium"}
      rowClassname={"cursor-pointer"}
      onRowClick={(record) => {
        console.log(record);
      }}
    />
  );
};

export default StaffTable;
