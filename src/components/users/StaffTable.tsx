"use client";

import React from "react";
import Table, { TableColumn } from "@/components/common/Table";
import { useRouter } from "next/navigation";

type TableDataType = {
  name: string;
  age: number;
  address: string;
  city: string;
  country: string;
  phone: string;
};

const StaffTable: React.FC = () => {
  const data: TableDataType[] = [
    {
      name: "Saw Thet",
      age: 20,
      address: "yangon",
      city: "yangon",
      country: "myanmar",
      phone: "0977777777",
    },
    {
      name: "Moe Pann",
      age: 19,
      address: "yangon",
      city: "yangon",
      country: "myanmar",
      phone: "0977777777",
    },
  ];

  const columns: TableColumn<TableDataType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value, t) => {
        return <p>{value}</p>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      containerClassname={"w-full"}
      titleClassname={"text-sm font-semibold"}
      rowClassname={"cursor-pointer"}
      onRowClick={(record) => {
        console.log(record);
      }}
    />
  );
};

export default StaffTable;
