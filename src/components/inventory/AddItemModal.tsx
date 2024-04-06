"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { HiPlus } from "react-icons/hi";
import { useForm } from "react-hook-form";
import {
  BranchDetailsResponseDto,
  BranchListResponseDto,
} from "@/types/branches.types";
import Form, { OptionType } from "@/components/common/Form";
import {
  GetAllProductResponseDto,
  ProductVariantDto,
} from "@/types/products.types";
import { AddProductToInventoryRequestDto } from "@/types/inventories.types";
import useAddProductToInventory from "@/hooks/inventory/useAddProductToInventory";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import useGetAllProductVariants from "@/hooks/products/useGetAllProductVariants";

type AddItemModalProps = {
  branches: BranchListResponseDto["payload"];
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

const AddItemModal: React.FC<AddItemModalProps> = ({ branches, products }) => {
  const [currentProduct, setCurrentProduct] = useState<
    (typeof products)[number] | null
  >(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [addItemFrom, setAddItemFrom] = useState<AddItemFormField>({
    ...initialAddItemForm,
  });

  const methods = useForm({
    mode: "onChange",
  });

  const GetAllProductVariantsQuery = useGetAllProductVariants(
    currentProduct?.id
  );

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

  const getExistingVariant = (): ProductVariantDto | undefined => {
    return GetAllProductVariantsQuery.data?.payload.find((item) => {
      return (
        item.color === addItemFrom.color &&
        item.processor === addItemFrom.processor &&
        item.ram === addItemFrom.ram &&
        item.storage === addItemFrom.storage
      );
    });
  };

  const existingVariant = getExistingVariant();

  // console.log(getExistingVariant(), "existing variant");

  useEffect(() => {
    if (
      GetAllProductVariantsQuery.isSuccess &&
      GetAllProductVariantsQuery.data &&
      GetAllProductVariantsQuery.data.payload.length > 0
    ) {
      if (existingVariant) {
        console.log("existing variant", existingVariant);
        methods.setValue("price", "" + existingVariant.price);
        onFieldChange("price", "" + existingVariant.price);
      } else {
        methods.setValue("price", "");
        onFieldChange("price", "");
      }
    }
  }, [
    GetAllProductVariantsQuery.isSuccess,
    GetAllProductVariantsQuery.data,
    existingVariant,
  ]);

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

  const branchOptions: OptionType[] =
    branches.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })) || [];

  return (
    <Modal
      id={"add-product-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      width={"max-w-2xl"}
      openButton={
        <button className={"btn text-primary btn-sm btn-ghost h-[40px]"}>
          <HiPlus size={20} />
          Add Items
        </button>
      }
      title={`Add Items to Inventory`}
      actionOnClose={() => {
        methods.reset();
        setAddItemFrom({ ...initialAddItemForm });
        setCurrentProduct(null);
      }}
    >
      <Form
        methods={methods}
        className={"w-full flex items-end flex-col"}
        onSubmit={handleSubmit}
      >
        <div className={"grid grid-cols-2 gap-x-6 w-full"}>
          <Select<AddItemFormField>
            required
            name={"product"}
            label={"Product Name"}
            placeholder="Select product"
            // wrapperClassname={"col-span-2"}
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
            name={"branch"}
            label={"Branch"}
            // wrapperClassname={"col-span-2"}
            placeholder="Select Branch"
            value={addItemFrom.branch}
            onFieldChange={(value) => {
              onFieldChange("branch", value);
            }}
            rules={{
              required: {
                value: true,
                message: "Branch is required",
              },
            }}
            options={branchOptions}
          />
          <div className={"divider col-span-2 my-0"}></div>

          <h4 className={"col-span-2 font-semibold my-3 text-base-content/90"}>
            Specifications
          </h4>

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

          <Select<AddItemFormField>
            required
            name={"ram"}
            label={"RAM"}
            placeholder="Select RAM"
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

          <div className={"divider col-span-2 my-0 mb-4"}></div>

          <TextField<AddItemFormField>
            required
            label={"Price"}
            name={"price"}
            value={addItemFrom.price}
            title={
              existingVariant ? "Price is disabled for existing variant" : ""
            }
            placeholder="Enter product price"
            wrapperClassName={"flex-1"}
            disabled={!!getExistingVariant()}
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
            wrapperClassName={"flex-1"}
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
        </div>
        <SubmitButton className={"mt-4 col-span-2"}>Add</SubmitButton>
      </Form>
    </Modal>
  );
};

export default AddItemModal;
