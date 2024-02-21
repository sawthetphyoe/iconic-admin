"use client";

import React, { useEffect, useState } from "react";
import useSearchProducts from "@/hooks/products/useSearchProducts";
import { ProductDto } from "@/types/products.types";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Table, { TableColumn } from "@/components/common/Table";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

const ProductsTable: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [tableData, setTableData] = useState<ProductDto[]>([]);

  const GetAllProductsQuery = useSearchProducts({});

  useEffect(() => {
    if (GetAllProductsQuery.isSuccess) {
      setTableData(GetAllProductsQuery.data.payload.dtoList);
    } else if (GetAllProductsQuery.isError) {
      toast.error(getErrorMessageFromQuery(GetAllProductsQuery.error));
    }
  }, [GetAllProductsQuery]);

  const columns: TableColumn<ProductDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Collection",
      dataIndex: "productType",
      render: (productType: ProductDto["productType"]) => productType.name,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (createdAt: ProductDto["createdAt"]) =>
        dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
  ];

  return (
    <Table
      loading={GetAllProductsQuery.isPending}
      dataSource={tableData}
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

export default ProductsTable;
