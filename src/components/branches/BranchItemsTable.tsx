"use client";

import React, { useEffect, useState } from "react";
import Table, { TableColumn } from "@/components/common/Table";
import { InventoryDto } from "@/types/inventories.types";
import { toast } from "react-toastify";
import useGetAllBranchItems from "@/hooks/branches/useGetAllBranchItems";
import { useParams } from "next/navigation";

const BranchItemsTable: React.FC = () => {
  const params = useParams();
  const [dataSource, setDataSource] = useState<Omit<InventoryDto, "branch">[]>(
    []
  );

  const GetAllBranchItemsQuery = useGetAllBranchItems({
    id: params.id as string,
  });

  useEffect(() => {
    if (GetAllBranchItemsQuery.isSuccess) {
      setDataSource(GetAllBranchItemsQuery.data.payload.dtoList);
    } else if (GetAllBranchItemsQuery.isError) {
      toast.error("Failed to fetch product items");
    }
  }, [GetAllBranchItemsQuery]);
  const columns: TableColumn<Omit<InventoryDto, "branch">>[] = [
    // {
    //   title: "No.",
    //   dataIndex: "id",
    //   render: (_, __, index) => index + 1,
    // },
    {
      title: "Name",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.name,
    },
    {
      title: "Color",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.variant.color,
    },
    {
      title: "Processor",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.variant.processor,
    },
    {
      title: "RAM",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.variant.ram,
    },
    {
      title: "Storage",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.variant.storage,
    },
    { title: "Quantity", dataIndex: "quantity" },
    {
      title: "Price",
      dataIndex: "product",
      render: (product: Omit<InventoryDto, "branch">["product"]) =>
        product.variant.price,
    },
  ];

  return (
    <Table
      loading={GetAllBranchItemsQuery.isPending}
      dataSource={dataSource}
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
