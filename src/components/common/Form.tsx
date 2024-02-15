import React from "react";
import {
  FieldValues,
  FormProvider,
  RegisterOptions,
  SubmitHandler,
  useController,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import mergeClassNames from "@/utils/mergeClassnames";

type FormProps<T extends FieldValues> = Omit<
  React.HTMLProps<HTMLFormElement>,
  "onSubmit"
> & {
  methods: UseFormReturn<T, any, T>;
  onSubmit: SubmitHandler<FieldValues>;
};

type CompoundFormProps<T extends FieldValues> = FormProps<T> & {
  TextField?: React.FC<TextFieldProps<T>>;
  Select?: React.FC<SelectProps<T>>;
  SubmitButton?: React.FC<SubmitButtonProps>;
};

type TextFieldProps<T> = Omit<React.HTMLProps<HTMLInputElement>, "onChange"> & {
  name: keyof T;
  onFieldChange: (value: string) => void;
  label?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export interface OptionProps extends React.HTMLProps<HTMLOptionElement> {
  label: string;
  value: string;
}

type SelectProps<T> = Omit<React.HTMLProps<HTMLSelectElement>, "onChange"> & {
  name: keyof T;
  label?: string;
  value: string;
  onFieldChange: (value: string) => void;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  options: OptionProps[];
};

function TextField<T>({
  name,
  label,
  rules,
  className,
  value,
  onFieldChange,
  required,
  ...props
}: TextFieldProps<T>) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: value,
    rules: !props.readOnly ? rules : undefined,
  });

  return (
    <div className={"flex flex-col gap-1"}>
      {label && (
        <label
          htmlFor={name}
          className={mergeClassNames("mb-[2px] cursor-pointer")}
        >
          {label}
          &nbsp;
          {required && !props.readOnly && <span className="text-error">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={mergeClassNames(
          "input input-bordered input-primary w-full",
          className
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
              "text-sm text-right text-error leading-4"
            )}
          >
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

function Select<T>({
  name,
  label,
  rules,
  className,
  onFieldChange,
  placeholder,
  value,
  required,
  options,
  ...props
}: SelectProps<T>) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: value,
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
      {/*TODO - use  react-select*/}
      <select
        {...props}
        name={name}
        id={name}
        className={mergeClassNames(
          "select select-primary w-full text-base",
          !field.value || field.value === placeholder ? "text-gray-400" : "",
          className
        )}
        value={field.value || placeholder}
        onChange={(e) => {
          field.onChange(e.target.value);
          onFieldChange(e.target.value);
        }}
      >
        <option disabled value={placeholder}>
          {placeholder}
        </option>
        {options.map(({ value, label, selected, ...props }) => (
          <option {...props} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="mr-1 h-4 mt-[2px]">
        {fieldState.error && (
          <p
            className={mergeClassNames(
              "text-sm text-right text-error leading-4"
            )}
          >
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  loading?: boolean;
  className?: React.HTMLProps<HTMLButtonElement>["className"];
  children: React.ReactNode;
  disabled?: boolean;
}

function SubmitButton({
  loading,
  disabled,
  className,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type={"submit"}
      className={mergeClassNames("btn btn-primary", className)}
      disabled={disabled}
    >
      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        children
      )}
    </button>
  );
}

function Form<T extends FieldValues>({
  className,
  onSubmit,
  children,
  methods,
}: CompoundFormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.TextField = TextField;

Form.Select = Select;

Form.SubmitButton = SubmitButton;

// TODO : Add textarea

export default Form;
