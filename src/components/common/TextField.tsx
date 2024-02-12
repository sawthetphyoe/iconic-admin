import React from "react";
import {
  useController,
  useFormContext,
  RegisterOptions,
  FieldValues,
} from "react-hook-form";
import mergeClassNames from "@/utils/mergeClassnames";

type TextFieldProps<T> = React.HTMLProps<HTMLInputElement> & {
  name: keyof T;
  defaultValue?: string;
  label?: string;
  value: string;
  onFieldChange: (value: string) => void;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};
function TextField<T>({
  name,
  label,
  defaultValue = "",
  rules,
  className,
  value,
  onFieldChange,
  required,
  onChange,
  ...props
}: TextFieldProps<T>) {
  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });
  return (
    <div className={"flex flex-col gap-1"}>
      {label && (
        <label
          htmlFor={name}
          className={mergeClassNames("mb-1 cursor-pointer")}
        >
          {label}
          &nbsp;
          {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={mergeClassNames(
          "input input-bordered input-primary w-full",
          className,
        )}
        {...props}
        ref={field.ref}
        value={field.value}
        onChange={(e) => {
          field.onChange(e.target.value);
          onFieldChange(e.target.value);
        }}
      />
      <div className="mr-1 h-4 mt-[2px]">
        {fieldState.error && (
          <p
            className={mergeClassNames(
              "text-sm text-right text-error leading-4",
            )}
          >
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default TextField;
