"use client";

import React, { useEffect, useState } from "react";
import Table, { TableColumn } from "@/components/common/Table";
import { InventoryDto } from "@/types/inventories.types";
import { toast } from "react-toastify";
import useGetAllBranchItems from "@/hooks/branches/useGetAllBranchItems";
import { useParams } from "next/navigation";
import { CiMenuKebab } from "react-icons/ci";
import { TbTransferOut } from "react-icons/tb";
import { LuClipboardEdit } from "react-icons/lu";
import EditBranchItemModal from "@/components/branches/EditBranchItemModal";
import MoveItemModal from "@/components/branches/MoveItemModal";

const BranchItemsTable: React.FC = () => {
  const params = useParams();
  const [dataSource, setDataSource] = useState<InventoryDto[]>([]);
  const [editRecord, setEditRecord] = useState<InventoryDto | null>(null);
  const [moveRecord, setMoveRecord] = useState<InventoryDto | null>(null);

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

  const closeDropdown = () => {
    const element = document.activeElement!;
    if (element) {
      (element as HTMLButtonElement)?.blur();
    }
  };

  const columns: TableColumn<InventoryDto>[] = [
    {
      title: "Name",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.name,
    },
    {
      title: "Color",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.variant.color,
    },
    {
      title: "Processor",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.variant.processor,
    },
    {
      title: "RAM",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.variant.ram,
    },
    {
      title: "Storage",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.variant.storage,
    },
    { title: "Quantity", dataIndex: "quantity" },
    {
      title: "Price",
      dataIndex: "product",
      render: (product: InventoryDto["product"]) => product.variant.price,
    },
    {
      title: "",
      dataIndex: "inventoryId",
      render: (_, record) => (
        <div className={"dropdown dropdown-end dropdown-left"}>
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost px-1">
            <CiMenuKebab size={20} className={"text-base-content/80"} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 flex flex-col gap-2 shadow bg-base-100 rounded-box w-40"
          >
            <li title={"Move items to other branches"}>
              <button
                className={"btn btn-sm font-medium"}
                onClick={() => {
                  setMoveRecord(record);
                  closeDropdown();
                }}
              >
                <TbTransferOut className={"scale-x-[-1]"} />
                Move
              </button>
            </li>
            <li title={"Edit quantity of item"}>
              <button
                className={"btn btn-sm font-medium"}
                onClick={() => {
                  setEditRecord(record);
                  closeDropdown();
                }}
              >
                <LuClipboardEdit />
                Edit
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={GetAllBranchItemsQuery.isPending}
        dataSource={dataSource}
        columns={columns}
        containerClassname={"w-full"}
        titleClassname={"text-sm font-semibold"}
      />
      {editRecord && (
        <EditBranchItemModal
          editRecord={editRecord}
          setModalOpen={(value: boolean) =>
            setEditRecord(value ? editRecord : null)
          }
        />
      )}
      {moveRecord && (
        <MoveItemModal
          moveRecord={moveRecord}
          setModalOpen={(value: boolean) =>
            setMoveRecord(value ? moveRecord : null)
          }
        />
      )}
    </>
  );
};

export default BranchItemsTable;
