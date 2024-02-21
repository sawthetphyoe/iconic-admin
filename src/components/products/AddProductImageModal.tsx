"use client";

import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Form from "@/components/common/Form";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import { ProductColorImage } from "@/store/slices/create-product-form-data.slice";
import { MdOutlineFileUpload } from "react-icons/md";

import Image from "next/image";
import mergeClassNames from "@/utils/mergeClassnames";
import { useDispatch } from "react-redux";

type AddProductImageModalProps = {
  onSave: (value: ProductColorImage) => void;
};

type AddProductImageFormFields = Omit<ProductColorImage, "file"> & {
  file: File | null;
};

const initialState: AddProductImageFormFields = {
  color: "",
  colorCode: "000000",
  file: null,
};

const AddProductImageModal: React.FC<AddProductImageModalProps> = ({
  onSave,
}) => {
  const dispatch = useDispatch();

  const methods = useForm({
    mode: "onChange",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [isFileError, setIsFileError] = useState(false);

  const [addProductImageFormData, setAddProductImageFormData] =
    useState<AddProductImageFormFields>(initialState);

  const onFieldChange = (
    key: keyof AddProductImageFormFields,
    value: string | File
  ) => {
    setAddProductImageFormData((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (!addProductImageFormData.file) {
      setIsFileError(true);
      return;
    }
    onSave(addProductImageFormData as ProductColorImage);
    setModalOpen(false);
    methods.reset();
    setAddProductImageFormData(initialState);
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
          className={"btn btn-ghost px-6 self-end btn-sm h-[40px]"}
        >
          <HiPlus size={16} />
          Add
        </button>
      }
      title={"Add Product Image"}
      actionOnClose={() => {
        methods.reset();
        setAddProductImageFormData(initialState);
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
        onFailed={() => {
          if (!addProductImageFormData.file) {
            setIsFileError(true);
          }
        }}
      >
        <div className={"flex gap-8"}>
          <Form.TextField<AddProductImageFormFields>
            required
            label={"Product Color"}
            name={"color"}
            value={addProductImageFormData.color}
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
                value={"#" + addProductImageFormData.colorCode}
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
                <Form.TextField<AddProductImageFormFields>
                  required
                  name={"colorCode"}
                  value={addProductImageFormData.colorCode}
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
              document.getElementById("product-image-file-input")?.click();
            }}
          >
            <MdOutlineFileUpload size={20} />
            Upload Image
          </button>
          <input
            // accept={''}
            type="file"
            id={"product-image-file-input"}
            className="hidden"
            onChange={(e) => {
              setIsFileError(false);
              onFieldChange("file", e.target.files![0]);
            }}
          />
          <Image
            width={400}
            height={300}
            className={mergeClassNames(
              "w-full rounded-lg h-[300px] object-cover",
              isFileError && "border border-error"
            )}
            src={
              addProductImageFormData.file
                ? URL.createObjectURL(addProductImageFormData.file)
                : "/images/placeholder-image.webp"
            }
            alt={""}
          />
          <div className="mr-1 h-4 mt-[2px]">
            {isFileError && (
              <p
                className={mergeClassNames(
                  "text-sm text-right text-error leading-4"
                )}
              >
                Product Image is required
              </p>
            )}
          </div>
        </div>

        <Form.SubmitButton className={"mt-8 self-end"}>Add</Form.SubmitButton>
      </Form>
    </Modal>
  );
};

export default AddProductImageModal;
