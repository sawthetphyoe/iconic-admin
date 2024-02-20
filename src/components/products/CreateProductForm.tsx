"use client";

import React, { useState } from "react";
import Form, { OptionType } from "@/components/common/Form";
import { useForm } from "react-hook-form";
import { CreateProductRequestDto } from "@/types/products.types";
import { useDispatch, useSelector } from "react-redux";
import {
  addKeyFeature,
  addProcessor,
  addRam,
  addStorage,
  removeKeyFeature,
  removeProcessor,
  removeRam,
  removeStorage,
  selectCreateProductFormData,
  updateName,
  updateProductType,
} from "@/store";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import List from "@/components/common/List";
import AddProductSpecificationSection from "@/components/products/AddProductSpecificationSection";
import { useRouter } from "next/navigation";
import AddProductImageModal from "@/components/products/AddProductImageModal";
import Image from "next/image";
import mergeClassNames from "@/utils/mergeClassnames";

type ProductCreateFormField = CreateProductRequestDto;

export enum EditableSpec {
  Processors = "processors",
  Rams = "rams",
  Storages = "storages",
  KeyFeatures = "keyFeatures",
  Default = "default",
}
const CreateProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const productCreateForm = useSelector(selectCreateProductFormData);

  const methods = useForm({
    mode: "onChange",
  });

  const [editingSpec, setEditingSpec] = useState<EditableSpec>(
    EditableSpec.Default
  );

  const GetAllProductTypesQuery = useGetAllProductTypes();

  const onEditingSpecChange = (value: EditableSpec) => {
    setEditingSpec(value);
  };

  const handleSubmit = () => {
    console.log({ productCreateForm });
  };

  const productTypesOptions: OptionType[] =
    GetAllProductTypesQuery.data?.payload.map((productType) => ({
      label: productType.name,
      value: productType.id,
    })) || [];

  const productImages = productCreateForm.images.map((img) => ({
    ...img,
    url: URL.createObjectURL(img.file),
  }));

  return (
    <div className={"w-full flex flex-col gap-8 max-w-3xl"}>
      <div className={"w-full flex flex-col gap-6"}>
        <section className={"w-full flex flex-col gap-6"}>
          <h3 className={"font-semibold text-xl"}>Information</h3>

          <Form methods={methods} onSubmit={handleSubmit} autoComplete={"off"}>
            <List className={"w-full  flex flex-col gap-4"}>
              <List.Item
                label={"Name"}
                content={
                  <Form.TextField<ProductCreateFormField>
                    name={"name"}
                    value={productCreateForm.name}
                    placeholder="Enter product name"
                    onFieldChange={(value) => dispatch(updateName(value))}
                    rules={{
                      required: {
                        value: true,
                        message: "Product name is required",
                      },
                    }}
                  />
                }
              />

              <List.Item
                label={"Collection"}
                content={
                  <Form.Select<ProductCreateFormField>
                    name={"productType"}
                    value={productCreateForm.name}
                    placeholder="Select product colletion"
                    onFieldChange={(value) =>
                      dispatch(updateProductType(value))
                    }
                    rules={{
                      required: {
                        value: true,
                        message: "Product name is required",
                      },
                    }}
                    options={productTypesOptions}
                  />
                }
              />
            </List>
          </Form>
        </section>

        <div className={"divider"}></div>

        <section className={"w-full flex flex-col gap-6"}>
          <h3 className={"font-semibold text-xl"}>
            Specifications & Key Features
          </h3>

          <List className={"w-full  flex flex-col gap-10"}>
            <List.Item
              label={"Processors"}
              content={
                <AddProductSpecificationSection
                  name={EditableSpec.Processors}
                  editingSpec={editingSpec}
                  onEditingSpecChange={onEditingSpecChange}
                  onSave={(value) => dispatch(addProcessor(value))}
                  onRemove={(value) => dispatch(removeProcessor(value))}
                />
              }
            />

            <List.Item
              label={"Rams"}
              content={
                <AddProductSpecificationSection
                  name={EditableSpec.Rams}
                  editingSpec={editingSpec}
                  onEditingSpecChange={onEditingSpecChange}
                  onSave={(value) => dispatch(addRam(value))}
                  onRemove={(value) => dispatch(removeRam(value))}
                />
              }
            />

            <List.Item
              label={"Storages"}
              content={
                <AddProductSpecificationSection
                  name={EditableSpec.Storages}
                  editingSpec={editingSpec}
                  onEditingSpecChange={onEditingSpecChange}
                  onSave={(value) => dispatch(addStorage(value))}
                  onRemove={(value) => dispatch(removeStorage(value))}
                />
              }
            />

            <List.Item
              label={"Key Features"}
              content={
                <AddProductSpecificationSection
                  name={EditableSpec.KeyFeatures}
                  inputNode={"textarea"}
                  editingSpec={editingSpec}
                  onEditingSpecChange={onEditingSpecChange}
                  onSave={(value) => dispatch(addKeyFeature(value))}
                  onRemove={(value) => dispatch(removeKeyFeature(value))}
                />
              }
            />
          </List>
        </section>

        <div className={"divider"}></div>

        <section className={"w-full flex flex-col gap-6"}>
          <div className={"w-full flex items-center justify-between"}>
            <h3 className={"font-semibold text-xl"}>Product Images</h3>
            <AddProductImageModal />
          </div>

          <div className={"w-full flex flex-col gap-6"}>
            {productImages.length > 0 ? (
              productImages.map((img) => {
                return (
                  <div
                    key={img.color}
                    className={
                      "card card-compact w-full bg-base-100 shadow-normal"
                    }
                  >
                    <figure>
                      <Image
                        width={400}
                        height={300}
                        className={mergeClassNames("w-full h-auto")}
                        src={
                          img.file ? img.url : "/images/placeholder-image.webp"
                        }
                        alt={""}
                      />
                    </figure>
                    <div className={"card-body flex gap-2"}>
                      <p className={"font-medium"}>Color : {img.color}</p>
                      <p className={"font-medium"}>Hex : #{img.colorCode}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={"w-full flex justify-center items-center"}>
                <p className={"font-medium text-lg text-base-content/50"}>
                  No Images
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className={"divider"}></div>

      <div className={"flex items-center gap-3 self-end"}>
        <button
          type={"button"}
          className={"btn btn-outline"}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type={"submit"}
          className={"btn btn-primary"}
          onClick={methods.handleSubmit(handleSubmit)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateProductForm;
