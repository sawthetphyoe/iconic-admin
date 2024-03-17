"use client";

import React, { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { EditableSpec } from "@/components/products/CreateProductForm";
import mergeClassNames from "@/utils/mergeClassnames";
import { useSelector } from "react-redux";
import { selectCreateProductFormData } from "@/store";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

type AddProductSpecificationSectionProps = {
  name: Exclude<EditableSpec, EditableSpec.Default>;
  inputNode?: "input" | "textarea";
  editingSpec: EditableSpec;
  onEditingSpecChange: (value: EditableSpec) => void;
  onRemove: (value: string) => void;
  onSave: (value: string) => void;
};
const AddProductSpecificationSection: React.FC<
  AddProductSpecificationSectionProps
> = ({
  name,
  inputNode = "input",
  editingSpec,
  onEditingSpecChange,
  onSave,
  onRemove,
}) => {
  const productCreateForm = useSelector(selectCreateProductFormData);

  const [value, setValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const handleSave = () => {
    if (!value || productCreateForm[name].includes(value)) {
      setIsError(true);
      return;
    }
    onEditingSpecChange(EditableSpec.Default);
    onSave(value);
    setValue("");
  };
  return (
    <form className={"w-full flex flex-col gap-2"}>
      {productCreateForm[name].map((item, index) =>
        inputNode === "input" ? (
          <div
            key={index + item}
            className={
              "w-full flex justify-between items-center rounded-md px-4 h-[48px] bg-base-200 bg-opacity-80"
            }
          >
            <span className={""}>{item}</span>
            <button
              type={"button"}
              className={"btn btn-sm btn-ghost btn-circle"}
              onClick={() => {
                onRemove(item);
              }}
            >
              <HiMinus size={16} />
            </button>
          </div>
        ) : (
          <div
            key={index + item}
            className={
              "w-full flex justify-between rounded-md py-2 px-4 bg-base-200 bg-opacity-80"
            }
          >
            <span className={"w-[calc(100%-50px)] leading-8"}>{item}</span>
            <button
              type={"button"}
              className={"btn btn-sm btn-ghost btn-circle w-[32px]"}
              onClick={() => {
                onRemove(item);
              }}
            >
              <HiMinus size={16} />
            </button>
          </div>
        )
      )}
      {editingSpec == name &&
        (inputNode === "input" ? (
          <div className={"join w-full"}>
            <input
              required
              autoFocus
              placeholder={"Enter text"}
              value={value}
              onChange={(e) => {
                setIsError(
                  !e.target.value ||
                    productCreateForm[name].includes(e.target.value)
                );
                setValue(e.target.value);
              }}
              className={mergeClassNames(
                "input w-full join-item",
                isError ? "input-error" : "input-bordered"
              )}
            />
            <button
              type={"button"}
              className={"btn btn-sm h-[48px] px-3 join-item"}
              onClick={() => {
                setValue("");
                onEditingSpecChange(EditableSpec.Default);
              }}
            >
              <IoClose size={20} className={""} />
            </button>
            <button
              type={"submit"}
              className={"btn btn-sm h-[48px] px-3 join-item"}
              onClick={() => handleSave()}
            >
              <TiTick size={20} className={""} />
            </button>
          </div>
        ) : (
          <div className={"w-full flex gap-1 items-start"}>
            <textarea
              required
              autoFocus
              rows={4}
              placeholder={"Enter text"}
              value={value}
              onChange={(e) => {
                setIsError(
                  !e.target.value ||
                    productCreateForm[name].includes(e.target.value)
                );
                setValue(e.target.value);
              }}
              className={mergeClassNames(
                "textarea w-full join-item text-base placeholder:text-base",
                isError ? "textarea-error" : "textarea-bordered"
              )}
            />
            <div className={"join"}>
              <button
                type={"button"}
                className={"btn btn-sm h-[48px] px-3 join-item"}
                onClick={() => {
                  setValue("");
                  onEditingSpecChange(EditableSpec.Default);
                }}
              >
                <IoClose size={20} className={""} />
              </button>
              <button
                type={"submit"}
                className={"btn btn-sm h-[48px] px-3 join-item"}
                onClick={() => handleSave()}
              >
                <TiTick size={20} className={""} />
              </button>
            </div>
          </div>
        ))}

      <button
        type={"button"}
        className={"btn btn-ghost px-6 self-end btn-sm h-[40px]"}
        onClick={() => onEditingSpecChange(name)}
      >
        <HiPlus size={16} /> Add
      </button>
    </form>
  );
};

export default AddProductSpecificationSection;
