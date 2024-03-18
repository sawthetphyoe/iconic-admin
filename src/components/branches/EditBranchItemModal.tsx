import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import List from "@/components/common/List";
import Form from "@/components/common/Form";
import { InventoryDto } from "@/types/inventories.types";
import useUpdateItemQuantity from "@/hooks/branches/useUpdateItemQuantity";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";

type EditBranchItemModal = {
  editRecord: InventoryDto;
  setModalOpen: (value: boolean) => void;
};

const EditBranchItemModal: React.FC<EditBranchItemModal> = ({
  editRecord,
  setModalOpen,
}) => {
  const methods = useForm({
    mode: "onChange",
  });
  const [quantity, setQuantity] = useState(editRecord?.quantity);

  const UpdateItemQuantityMutation = useUpdateItemQuantity();

  useEffect(() => {
    if (UpdateItemQuantityMutation.isSuccess) {
      setModalOpen(false);
      methods.reset();
      UpdateItemQuantityMutation.reset();
    } else if (UpdateItemQuantityMutation.isError) {
      toast.error(getErrorMessageFromQuery(UpdateItemQuantityMutation.error));
    }
  }, [
    UpdateItemQuantityMutation.isSuccess,
    UpdateItemQuantityMutation.isError,
    UpdateItemQuantityMutation.error,
  ]);

  return (
    <Modal
      id={`edit-branch-item-modal-${editRecord?.inventoryId}`}
      open={!!editRecord}
      width={"max-w-xl"}
      setOpen={() => setModalOpen}
      closeIcon
      openButton={null}
      title={`Update Branch Item`}
      actionOnClose={() => {
        methods.reset();
        setModalOpen(false);
      }}
    >
      <div className={"w-full flex flex-col gap-6"}>
        <div>
          <List>
            <List.Item label={"Branch"} content={editRecord?.branch.name} />
            <List.Item
              label={"Product Name"}
              content={editRecord?.product.name}
            />
            <List.Item
              label={"Processor"}
              content={editRecord?.product.variant.processor}
            />
            <List.Item
              label={"RAM"}
              content={editRecord?.product.variant.ram}
            />
            <List.Item
              label={"Storage"}
              content={editRecord?.product.variant.storage}
            />
            <List.Item
              label={"Color"}
              content={editRecord?.product.variant.color}
            />
            <List.Item
              label={"Price"}
              content={"" + editRecord?.product.variant.price}
            />
          </List>
        </div>
        <Form
          methods={methods}
          className={"flex flex-col gap-3 w-full"}
          onSubmit={() => {
            console.log(
              {
                id: editRecord?.inventoryId!,
                quantity: quantity!,
              },
              editRecord
            );
            UpdateItemQuantityMutation.mutate({
              id: editRecord?.inventoryId!,
              quantity: quantity!,
            });
          }}
        >
          <Form.TextField<{ quantity: number }>
            required
            label={"Quantity"}
            name={"quantity"}
            value={quantity}
            placeholder="Enter item quantity"
            onFieldChange={(value) => {
              setQuantity(+value);
            }}
            rules={{
              required: {
                value: true,
                message: "Quantity is required",
              },
            }}
          />
          <Form.SubmitButton
            loading={
              UpdateItemQuantityMutation.isPending ||
              !!UpdateItemQuantityMutation.data
            }
            disabled={
              UpdateItemQuantityMutation.isPending ||
              !!UpdateItemQuantityMutation.data
            }
          >
            Save
          </Form.SubmitButton>
        </Form>
        {/*<div className={"divider text-sm font-semibold text-base-content/75"}>*/}
        {/*  OR*/}
        {/*</div>*/}
        {/*<button className={"btn text-error"}>Delete</button>*/}
      </div>
    </Modal>
  );
};

export default EditBranchItemModal;
