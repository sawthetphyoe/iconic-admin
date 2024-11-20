"use client";

import Form from "@/components/common/Form";
import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { MdOutlineFileUpload } from "react-icons/md";

import {
  EditProductImageFormFields,
  ProductColorImageDto,
} from "@/types/products.types";
import Image from "next/image";

type EditProductImageModalProps = {
  onSave: (value: EditProductImageFormFields) => void;
  initialValues: ProductColorImageDto;
};

const EditProductImageModal: React.FC<EditProductImageModalProps> = ({
  initialValues,
  onSave,
}) => {
  const initialState: EditProductImageFormFields = {
    color: initialValues.color,
    colorCode: initialValues.colorCode,
    file: null,
  };

  const methods = useForm({
    mode: "onChange",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [editProductImageFormData, setEditProductImageFormData] =
    useState<EditProductImageFormFields>(initialState);

  const onFieldChange = (
    key: keyof EditProductImageFormFields,
    value: string | File
  ) => {
    setEditProductImageFormData((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log("editProductImageFormData", editProductImageFormData);
  }, [editProductImageFormData]);

  const handleSubmit = () => {
    console.log("form data", editProductImageFormData);
    onSave(editProductImageFormData);
    setModalOpen(false);
    methods.reset();
    setEditProductImageFormData(initialState);
  };

  return (
    <Modal
      id={"add-product-image-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      width={"max-w-2xl"}
      closeIcon
      openButton={
        <button
          type={"button"}
          className={
            "btn btn-ghost px-6 self-end btn-sm h-[40px] !hidden group-hover:!flex"
          }
        >
          <HiPlus size={16} />
          Edit
        </button>
      }
      title={"Edit Product Image"}
      actionOnClose={() => {
        methods.reset();
        setEditProductImageFormData(initialState);
        // if (imageSrc.startsWith("blob:")) {
        //   URL.revokeObjectURL(imageSrc);
        //   console.log("revoked");
        // }
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <div className={"flex gap-8"}>
          <Form.TextField<EditProductImageFormFields>
            required
            label={"Product Color"}
            name={"color"}
            value={editProductImageFormData.color}
            onFieldChange={(value) => onFieldChange("color", value)}
            placeholder="Enter color name"
            wrapperClassName={"w-1/2"}
            rules={{
              required: {
                value: true,
                message: "Color name is required",
              },
            }}
          />

          <div className={"w-1/2 flex flex-col"}>
            <label className={"mb-[6px] block cursor-pointer"}>
              Color Code<span className="text-error"> *</span>
            </label>
            <div className={"w-full flex gap-2"}>
              <input
                type="color"
                name={"colorCode"}
                className="p-1 h-12 bg-base-100 w-16 block border border-primary focus:border focus:border-primary cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                value={"#" + editProductImageFormData.colorCode}
                onChange={(e) => {
                  methods.setValue(
                    "colorCode",
                    e.target.value.replace("#", "")
                  );
                  onFieldChange("colorCode", e.target.value.replace("#", ""));
                }}
              />
              <div className={"flex-1 join"}>
                <div
                  className={
                    "join-item h-12 px-4 border border-primary bg-base-200 flex justify-center items-center"
                  }
                >
                  <span>#</span>
                </div>
                <Form.TextField<EditProductImageFormFields>
                  required
                  name={"colorCode"}
                  value={editProductImageFormData.colorCode}
                  onFieldChange={(value) => onFieldChange("colorCode", value)}
                  placeholder="Enter color code"
                  wrapperClassName={"w-full"}
                  className={"join-item !rounded-tr-lg !rounded-br-lg"}
                  rules={{
                    required: {
                      value: true,
                      message: "Color code is required",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={"w-full flex flex-col gap-1"}>
          <button
            className={
              "btn btn-ghost flex items-center self-end text-primary btn-sm h-[40px]"
            }
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(
                  `product-image-file-input-${initialValues.color}`
                )
                ?.click();
            }}
          >
            <MdOutlineFileUpload size={20} />
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            id={`product-image-file-input-${initialValues.color}`}
            className="hidden"
            onChange={(e) => {
              onFieldChange("file", e.target.files![0]);
              console.log("file", e.target.files![0]);
            }}
          />
          <Image
            width={400}
            height={300}
            className={"w-full rounded-lg object-contain"}
            src={
              editProductImageFormData.file
                ? URL.createObjectURL(editProductImageFormData.file)
                : `${process.env.STORAGE_URL}/${initialValues.imageId}/view?project=${process.env.APPWRITE_PROJECT_ID}`
            }
            alt="Uploaded preview"
            priority
          />
        </div>

        <Form.SubmitButton className={"mt-8 self-end"}>
          Confirm
        </Form.SubmitButton>
      </Form>
    </Modal>
  );
};

export default EditProductImageModal;
