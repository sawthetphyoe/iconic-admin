import React from "react";
import Table, { TableColumn } from "@/components/common/Table";
import dayjs from "dayjs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  InventoryItemDto,
  InventoryResponseDto,
} from "@/types/inventories.types";
import { InventoryGroupBy } from "@/hooks/inventory/useGetInventories";
import { usePathname, useRouter } from "next/navigation";

type InventoryTableProps = {
  groupBy: InventoryGroupBy;
  dataSource: InventoryResponseDto;
};

const InventoryTable: React.FC<InventoryTableProps> = ({
  groupBy,
  dataSource,
}) => {
  const router = useRouter();

  const totalItem: InventoryItemDto = {
    id: "total",
    product: {
      id: "total-product",
      name: "",
      variant: {
        id: "total-variant",
        color: "",
        processor: "",
        ram: "",
        storage: "Total",
        price: 0,
      },
    },
    branch: {
      id: "total-branch",
      name: "",
    },
    quantity: dataSource.inventories.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
    createdAt: "",
    createdBy: "",
  };

  const columns: TableColumn<InventoryItemDto>[] = [
    {
      title: "Color",
      dataIndex: "product",
      render: (product: InventoryItemDto["product"]) => (
        <div className={"!w-[150px]"}>{product.variant.color}</div>
      ),
    },
    {
      title: "Processor",
      dataIndex: "product",
      render: (product: InventoryItemDto["product"]) => (
        <div className={"!w-[200px]"}>{product.variant.processor}</div>
      ),
    },
    {
      title: "Memory",
      dataIndex: "product",
      render: (product: InventoryItemDto["product"]) => (
        <div className={"!w-[100px]"}>{product.variant.ram}</div>
      ),
    },
    {
      title: "Storage",
      dataIndex: "product",
      render: (product: InventoryItemDto["product"]) => (
        <div
          className={
            "!w-[100px]" +
            `${product.id === "total-product" ? " font-semibold" : ""}`
          }
        >
          {product.variant.storage}
        </div>
      ),
    },
    {
      title: "In Stock",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <div
          className={
            "!w-[100px]" +
            `${record.product.id === "total-product" ? " font-semibold" : ""}`
          }
        >
          {quantity}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: (id) =>
        id === "total" ? null : (
          <div className={"flex px-4 w-full justify-end"}>
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        ),
    },
  ];

  columns.splice(
    0,
    0,
    groupBy !== "branches"
      ? {
          title: "Branch",
          dataIndex: "branch",
          render: (branch: InventoryItemDto["branch"]) => (
            <div className={"!w-[200px]"}>{branch.name}</div>
          ),
        }
      : {
          title: "Product",
          dataIndex: "product",
          render: (product: InventoryItemDto["product"]) => (
            <div className={"!w-[200px]"}>{product.name}</div>
          ),
        }
  );

  return (
    <div className={"w-full "}>
      <h3 className={"text-base font-semibold mb-2"}>{dataSource.name}</h3>
      <Table
        dataSource={[...dataSource.inventories, totalItem]}
        columns={columns}
        containerClassname={"w-full"}
        titleClassname={"text-sm font-semibold"}
        rowClassname={"cursor-pointer"}
        onRowClick={(record) => {
          if (record.id === "total" || record.product.id === "total-product")
            return;
          router.push(`inventory/product?id=${record.product.variant.id}`);
        }}
      />
    </div>
  );
};

export default InventoryTable;
