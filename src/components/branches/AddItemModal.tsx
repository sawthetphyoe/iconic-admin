"use client";

import React, { useState } from "react";
import Modal from "@/components/common/Modal";
import { HiPlus } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import { BranchDetailsResponseDto } from "@/types/branch.types";
import Select from "@/components/common/Select";

type AddItemModalProps = {
  branch: BranchDetailsResponseDto["payload"];
};

type AddItemFormField = {
  branchId: string;
  productId: string;
  productColor: string;
  productProcessor?: string;
  productRam?: string;
  productStorage?: string;
};

const initialAddItemForm: AddItemFormField = {
  branchId: "",
  productId: "",
  productColor: "",
  productProcessor: "",
  productRam: "",
  productStorage: "",
};

const AddItemModal: React.FC<AddItemModalProps> = ({ branch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addItemFrom, setAddItemFrom] =
    useState<AddItemFormField>(initialAddItemForm);
  const methods = useForm({
    mode: "onChange",
  });

  const handleSubmit = () => {
    console.log(addItemFrom);
  };

  return (
    <Modal
      id={"create-branch-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      openButton={
        <button className={"btn text-primary btn-sm btn-ghost h-[40px]"}>
          <HiPlus size={20} />
          Add Item
        </button>
      }
      title={`Add Item - ${branch.name}`}
      actionOnClose={() => {
        methods.reset();
        setAddItemFrom(initialAddItemForm);
      }}
    >
      <FormProvider {...methods}>
        <form
          className={"flex flex-col gap-3 w-full"}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <Select<AddItemFormField>
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
            name={"productId"}
            value={addItemFrom.productId}
            placeholder="Select product"
            onFieldChange={(value) => {
              setAddItemFrom((oldState) => ({
                ...oldState,
                productId: value,
              }));
            }}
            rules={{
              required: {
                value: true,
                message: "Product is required",
              },
            }}
          />

          {/*TODO : Add more required fields */}

          <button type={"submit"} className="btn btn-primary">
            Add
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddItemModal;
