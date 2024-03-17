"use client";

import React, { useEffect, useState } from "react";
import useGetAllCollections from "@/hooks/collections/useGetAllCollections";
import { ProductCollectionDto } from "@/types/collections.types";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Table, { TableColumn } from "@/components/common/Table";
import { ProductDto } from "@/types/products.types";
import dayjs from "dayjs";
import { CiMenuKebab } from "react-icons/ci";
import Modal from "@/components/common/Modal";
import Form from "@/components/common/Form";
import { useForm } from "react-hook-form";
import useUpdateCollection from "@/hooks/collections/useUpdateCollection";
import useDeleteCollection from "@/hooks/collections/useDeleteCollection";

const ProductCollectionsTable: React.FC = () => {
  const [tableData, setTableData] = useState<ProductCollectionDto[]>([]);
  const [editRecord, setEditRecord] = useState<ProductCollectionDto | null>(
    null
  );
  const [deleteRecord, setDeleteRecord] = useState<ProductCollectionDto | null>(
    null
  );

  const GetAllCollectionsQuery = useGetAllCollections();

  const UpdateCollectionMutation = useUpdateCollection();

  const DeleteCollectionMutation = useDeleteCollection();

  useEffect(() => {
    if (GetAllCollectionsQuery.isSuccess) {
      setTableData(GetAllCollectionsQuery.data.payload);
    } else if (GetAllCollectionsQuery.isError) {
      toast.error(getErrorMessageFromQuery(GetAllCollectionsQuery.error));
    }
  }, [
    GetAllCollectionsQuery.isSuccess,
    GetAllCollectionsQuery.data,
    GetAllCollectionsQuery.isError,
    GetAllCollectionsQuery.error,
  ]);

  useEffect(() => {
    if (UpdateCollectionMutation.isSuccess) {
      setEditRecord(null);
    } else if (UpdateCollectionMutation.isError) {
      toast.error(getErrorMessageFromQuery(UpdateCollectionMutation.error));
    }
  }, [
    UpdateCollectionMutation.isSuccess,
    UpdateCollectionMutation.isError,
    UpdateCollectionMutation.error,
  ]);

  useEffect(() => {
    if (DeleteCollectionMutation.isSuccess) {
      setDeleteRecord(null);
    } else if (DeleteCollectionMutation.isError) {
      toast.error(getErrorMessageFromQuery(DeleteCollectionMutation.error));
    }
  }, [
    DeleteCollectionMutation.isSuccess,
    DeleteCollectionMutation.isError,
    DeleteCollectionMutation.error,
  ]);

  const closeDropdown = () => {
    const element = document.activeElement!;
    if (element) {
      (element as HTMLButtonElement)?.blur();
    }
  };

  const EditCollectionModal: React.FC = () => {
    const methods = useForm({
      mode: "onChange",
      defaultValues: { name: editRecord?.name },
    });
    const [name, setName] = useState(editRecord?.name);
    return (
      <Modal
        id={`edit-collection-modal-${editRecord?.id}`}
        open={!!editRecord}
        width={"max-w-xl"}
        setOpen={(value) => setEditRecord(value ? editRecord : null)}
        closeIcon
        openButton={null}
        title={`Edit Collection - ${editRecord?.name}`}
        actionOnClose={() => {
          setEditRecord(null);
          methods.reset();
        }}
      >
        <Form
          methods={methods}
          className={"flex flex-col gap-3 w-full"}
          onSubmit={() => {
            UpdateCollectionMutation.mutate({
              id: editRecord?.id!,
              name: name!,
            });
            setEditRecord(null);
          }}
        >
          <Form.TextField<{ name: string }>
            required
            label={"Name"}
            name={"name"}
            value={name}
            placeholder="Enter collection name"
            onFieldChange={(value) => {
              setName(value);
            }}
            rules={{
              required: {
                value: true,
                message: "Collection name is required",
              },
            }}
          />
          <Form.SubmitButton
            loading={UpdateCollectionMutation.isPending}
            disabled={UpdateCollectionMutation.isPending}
          >
            Save
          </Form.SubmitButton>
        </Form>
      </Modal>
    );
  };

  const DeleteCollectionModal: React.FC = () => {
    return (
      <Modal
        id={`delete-collection-modal-${deleteRecord?.id}`}
        open={!!deleteRecord}
        width={"max-w-xl"}
        setOpen={(value) => setDeleteRecord(value ? deleteRecord : null)}
        closeIcon
        openButton={null}
        title={`Delete Collection - ${deleteRecord?.name}`}
        actionOnClose={() => {
          setDeleteRecord(null);
        }}
      >
        <div className={"flex flex-col gap-6 w-full"}>
          <p>Are you sure you want to delete this collection?</p>
          <div className={"flex justify-end items-center gap-3"}>
            <button
              className={"btn btn-outline"}
              onClick={() => setDeleteRecord(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-base-100"
              onClick={() => {
                DeleteCollectionMutation.mutate(deleteRecord?.id!);
                setDeleteRecord(null);
              }}
              disabled={DeleteCollectionMutation.isPending}
            >
              {DeleteCollectionMutation.isPending ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const columns: TableColumn<ProductCollectionDto>[] = [
    {
      title: "No.",
      dataIndex: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Collection Name",
      dataIndex: "name",
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
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
    {
      title: "",
      dataIndex: "id",
      width: "10%",
      render: (_, record) => (
        <div className={"dropdown dropdown-end dropdown-left"}>
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost px-1">
            <CiMenuKebab size={20} className={"text-base-content/80"} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 flex flex-col gap-2 shadow bg-base-100 rounded-box w-36"
          >
            <li>
              <button
                className={"btn btn-sm font-medium"}
                onClick={() => {
                  setEditRecord(record);
                  closeDropdown();
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                disabled={record.productCount > 0}
                className={"btn btn-sm text-error font-medium"}
                onClick={() => {
                  setDeleteRecord(record);
                  closeDropdown();
                }}
              >
                Delete
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
        loading={GetAllCollectionsQuery.isPending}
        dataSource={tableData}
        columns={columns}
        containerClassname={"w-full"}
        titleClassname={"text-sm font-semibold"}
      />
      {editRecord && <EditCollectionModal />}
      {deleteRecord && <DeleteCollectionModal />}
    </>
  );
};

export default ProductCollectionsTable;
