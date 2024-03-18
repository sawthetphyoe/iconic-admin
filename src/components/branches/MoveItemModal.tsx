import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import List from "@/components/common/List";
import Form, { OptionType } from "@/components/common/Form";
import { HiArrowNarrowRight } from "react-icons/hi";
import { InventoryDto } from "@/types/inventories.types";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import useMoveBranchItem from "@/hooks/branches/useMoveBranchItem";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import { toast } from "react-toastify";

type MoveItemFormContext = {
  toBranch: string;
  quantity: string;
};

type MoveItemModalProps = {
  moveRecord: InventoryDto;
  setModalOpen: (value: boolean) => void;
};

const MoveItemModal: React.FC<MoveItemModalProps> = ({
  moveRecord,
  setModalOpen,
}) => {
  const methods = useForm({
    mode: "onChange",
  });
  const [targetBranch, setTargetBranch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const GetAllBranchesQuery = useGetAllBranches();

  const MoveBranchItemMutation = useMoveBranchItem();

  const branchOptions: OptionType[] =
    GetAllBranchesQuery.data?.payload
      ?.filter((item) => item.id !== moveRecord.branch.id)
      .map((item) => ({
        label: item.name,
        value: item.id,
      })) || [];

  useEffect(() => {
    if (MoveBranchItemMutation.isSuccess) {
      setModalOpen(false);
      methods.reset();
      MoveBranchItemMutation.reset();
    } else if (MoveBranchItemMutation.isError) {
      toast.error(getErrorMessageFromQuery(MoveBranchItemMutation.error));
    }
  }, [
    MoveBranchItemMutation.isSuccess,
    MoveBranchItemMutation.isError,
    MoveBranchItemMutation.error,
  ]);

  return (
    <Modal
      id={`move-item-modal-${moveRecord.inventoryId}`}
      open={!!moveRecord}
      width={"max-w-xl"}
      setOpen={() => setModalOpen}
      closeIcon
      openButton={null}
      title={`Move Item`}
      actionOnClose={() => {
        methods.reset();
        setModalOpen(false);
      }}
    >
      <div className={"w-full flex flex-col gap-6"}>
        <List>
          <List.Item label={"Product"} content={moveRecord.product.name} />
          <List.Item
            label={"Processor"}
            content={moveRecord.product.variant.processor}
          />
          <List.Item label={"RAM"} content={moveRecord.product.variant.ram} />
          <List.Item
            label={"Storage"}
            content={moveRecord.product.variant.storage}
          />
          <List.Item
            label={"Color"}
            content={moveRecord.product.variant.color}
          />
          <List.Item
            label={"Price"}
            content={"" + moveRecord.product.variant.price}
          />
        </List>
        <Form
          methods={methods}
          className={"flex flex-col gap-3 w-full"}
          onSubmit={() => {
            MoveBranchItemMutation.mutate({
              fromBranch: moveRecord.branch.id,
              toBranch: targetBranch,
              productVariant: moveRecord.product.variant.id,
              quantity: parseInt(quantity),
            });
          }}
        >
          <div className={"flex gap-4 w-full"}>
            <div className={"flex flex-col gap-1 flex-1"}>
              <label
                htmlFor={`fromBranch-${moveRecord.inventoryId}`}
                className={"mb-[2px] cursor-pointer"}
              >
                From
              </label>
              <input
                id={`fromBranch-${moveRecord.inventoryId}`}
                name={`fromBranch-${moveRecord.inventoryId}`}
                defaultValue={moveRecord.branch.name}
                className={"input input-primary"}
                disabled
              />
            </div>

            <HiArrowNarrowRight className={"h-[48px] mt-8"} />

            <Form.Select<MoveItemFormContext>
              name={"toBranch"}
              required
              label={"To"}
              wrapperClassname={"flex-1"}
              placeholder={"Select target branch"}
              value={targetBranch}
              onFieldChange={(value) => setTargetBranch(value)}
              options={branchOptions}
              rules={{
                required: {
                  value: true,
                  message: "Target branch is required",
                },
              }}
            />
          </div>
          <Form.TextField<MoveItemFormContext>
            required
            label={"Quantity"}
            name={"quantity"}
            type={"number"}
            value={quantity}
            placeholder="Enter number of items you want to move"
            onFieldChange={(value) => {
              setQuantity(value);
            }}
            rules={{
              required: {
                value: true,
                message: "Quantity is required",
              },
              max: {
                value: moveRecord.quantity || 0,
                message: `Available stock - ${moveRecord.quantity} item${moveRecord.quantity && moveRecord.quantity > 1 ? "s" : ""}`,
              },
            }}
          />
          <Form.SubmitButton
            loading={
              MoveBranchItemMutation.isPending || !!MoveBranchItemMutation.data
            }
            disabled={
              MoveBranchItemMutation.isPending || !!MoveBranchItemMutation.data
            }
          >
            Save
          </Form.SubmitButton>
        </Form>
      </div>
    </Modal>
  );
};

export default MoveItemModal;
