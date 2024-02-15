"use client";

import React, { useState } from "react";
import Modal from "@/components/common/Modal";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { BranchDetailsResponseDto } from "@/types/branch.types";
import Form from "@/components/common/Form";

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

const { Select, SubmitButton } = Form;

const AddItemModal: React.FC<AddItemModalProps> = ({ branch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addItemFrom, setAddItemFrom] =
    useState<AddItemFormField>(initialAddItemForm);
  const methods = useForm({
    mode: "onChange",
  });

  const onFieldChange = (key: keyof AddItemFormField, value: string) => {
    setAddItemFrom((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

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
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <Select<AddItemFormField>
          required
          name={"productId"}
          label={"Product"}
          placeholder="Select product"
          value={addItemFrom.productId}
          onFieldChange={(value) => onFieldChange("productId", value)}
          rules={{
            required: {
              value: true,
              message: "Product is required",
            },
          }}
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
        />

        {/*TODO : Add more required fields */}

        <SubmitButton>Add</SubmitButton>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
