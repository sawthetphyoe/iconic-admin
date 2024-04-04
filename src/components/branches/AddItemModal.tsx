"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { BranchDetailsResponseDto } from "@/types/branches.types";
import Form, { OptionType } from "@/components/common/Form";
import { GetAllProductResponseDto } from "@/types/products.types";
import { AddProductToInventoryRequestDto } from "@/types/inventories.types";
import useAddProductToInventory from "@/hooks/inventory/useAddProductToInventory";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";

type AddItemModalProps = {
  branch: BranchDetailsResponseDto["payload"];
  products: GetAllProductResponseDto["payload"];
};

type AddItemFormField = AddProductToInventoryRequestDto;

const initialAddItemForm: AddItemFormField = {
  branch: "",
  product: "",
  color: "",
  processor: "",
  ram: "",
  storage: "",
  price: "",
  quantity: "",
};

const { TextField, Select, SubmitButton } = Form;

const AddItemModal: React.FC<AddItemModalProps> = ({ branch, products }) => {
  const [currentProduct, setCurrentProduct] = useState<
    (typeof products)[number] | null
  >(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [addItemFrom, setAddItemFrom] = useState<AddItemFormField>({
    ...initialAddItemForm,
    branch: branch.id,
  });

  const methods = useForm({
    mode: "onChange",
  });

  const AddProductToInventoryMutation = useAddProductToInventory();

  useEffect(() => {
    if (AddProductToInventoryMutation.isSuccess) {
      setModalOpen(false);
      methods.reset();
      AddProductToInventoryMutation.reset();
    } else if (AddProductToInventoryMutation.isError) {
      toast.error(
        getErrorMessageFromQuery(AddProductToInventoryMutation.error)
      );
      AddProductToInventoryMutation.reset();
    }
  }, [AddProductToInventoryMutation, methods]);

  const onFieldChange = (key: keyof AddItemFormField, value: string) => {
    setAddItemFrom((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log({ addItemFrom });
    console.log(methods.getValues());
    AddProductToInventoryMutation.mutate(addItemFrom);
  };

  const productOptions: OptionType[] =
    products.map((product) => ({
      value: product.id,
      label: product.name,
    })) || [];

  const productColorOptions: OptionType[] =
    currentProduct?.images.map((img) => ({
      value: img.color,
      label: img.color,
    })) || [];

  const productProcessorOptions: OptionType[] =
    currentProduct?.processors.map((processor) => ({
      value: processor,
      label: processor,
    })) || [];

  const productRamsOptions: OptionType[] =
    currentProduct?.rams.map((ram) => ({
      value: ram,
      label: ram,
    })) || [];

  const productStorageOptions: OptionType[] =
    currentProduct?.storages.map((storage) => ({
      value: storage,
      label: storage,
    })) || [];

  return (
    <Modal
      id={"add-product-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      openButton={
        <button className={"btn text-primary btn-sm btn-ghost h-[40px]"}>
          <HiPlus size={20} />
          Add Product
        </button>
      }
      title={`Add Product - ${branch.name}`}
      actionOnClose={() => {
        methods.reset();
        setAddItemFrom({ ...initialAddItemForm, branch: branch.id });
        setCurrentProduct(null);
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col w-full"}
        onSubmit={handleSubmit}
      >
        <Select<AddItemFormField>
          required
          name={"product"}
          label={"Product Name"}
          placeholder="Select product"
          value={addItemFrom.product}
          onFieldChange={(value) => {
            onFieldChange("product", value);
            onFieldChange("color", "");
            methods.setValue("color", "");
            onFieldChange("processor", "");
            methods.setValue("processor", "");
            onFieldChange("ram", "");
            methods.setValue("ram", "");
            onFieldChange("storage", "");
            methods.setValue("storage", "");
            setCurrentProduct(
              products.find((product) => product.id === value) || null
            );
          }}
          rules={{
            required: {
              value: true,
              message: "Product is required",
            },
          }}
          options={productOptions}
        />

        <Select<AddItemFormField>
          required
          name={"color"}
          label={"Color"}
          placeholder="Select Color"
          value={addItemFrom.color}
          onFieldChange={(value) => {
            onFieldChange("color", value);
          }}
          rules={{
            required: {
              value: true,
              message: "Product color is required",
            },
          }}
          options={productColorOptions}
        />

        <Select<AddItemFormField>
          required
          name={"processor"}
          label={"Processor"}
          placeholder="Select Processor"
          value={addItemFrom.processor}
          onFieldChange={(value) => {
            onFieldChange("processor", value);
          }}
          rules={{
            required: {
              value: true,
              message: "Product processor is required",
            },
          }}
          options={productProcessorOptions}
        />

        <div className={"w-full flex gap-4"}>
          <Select<AddItemFormField>
            required
            name={"ram"}
            label={"RAM"}
            placeholder="Select RAM"
            wrapperClassname={"flex-1"}
            value={addItemFrom.ram}
            onFieldChange={(value) => {
              onFieldChange("ram", value);
            }}
            rules={{
              required: {
                value: true,
                message: "Product RAM is required",
              },
            }}
            options={productRamsOptions}
          />

          <Select<AddItemFormField>
            required
            name={"storage"}
            label={"Storage"}
            placeholder="Select Processor"
            wrapperClassname={"flex-1"}
            value={addItemFrom.storage}
            onFieldChange={(value) => {
              onFieldChange("storage", value);
            }}
            rules={{
              required: {
                value: true,
                message: "Product storage is required",
              },
            }}
            options={productStorageOptions}
          />
        </div>

        <TextField<AddItemFormField>
          required
          label={"Price"}
          name={"price"}
          value={addItemFrom.price}
          placeholder="Enter product price"
          onFieldChange={(value) => onFieldChange("price", value)}
          rules={{
            required: {
              value: true,
              message: "Product price is required",
            },
          }}
        />

        <TextField<AddItemFormField>
          required
          label={"Quantity"}
          name={"quantity"}
          value={addItemFrom.quantity}
          placeholder="Enter product quantity"
          onFieldChange={(value) => onFieldChange("quantity", value)}
          rules={{
            required: {
              value: true,
              message: "Product quantity is required",
            },
            pattern: {
              value: /^(\d+)$/,
              message: "Quantity must be a number",
            },
          }}
        />

        <SubmitButton className={"mt-4"}>Add</SubmitButton>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
