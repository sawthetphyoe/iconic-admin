"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Form from "@/components/common/Form";
import useCreatePaymentType from "@/hooks/payment-types/useCreatePaymentType";

type CreatePaymentTypeFormFields = {
  name: string;
};

const initialState: CreatePaymentTypeFormFields = {
  name: "",
};

const { TextField, SubmitButton } = Form;

const CreatePaymentTypeModal: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [paymentTypeCreateForm, setPaymentTypeCreateForm] =
    useState<CreatePaymentTypeFormFields>(initialState);

  const CreatePaymentTypeMutation = useCreatePaymentType();

  useEffect(() => {
    if (CreatePaymentTypeMutation.isSuccess && CreatePaymentTypeMutation.data) {
      setModalOpen(false);
      methods.reset();
      CreatePaymentTypeMutation.reset();
    } else if (CreatePaymentTypeMutation.isError) {
      toast.error(getErrorMessageFromQuery(CreatePaymentTypeMutation.error));
      CreatePaymentTypeMutation.reset();
    }
  }, [CreatePaymentTypeMutation, methods]);

  const handleSubmit = () => {
    CreatePaymentTypeMutation.mutate({
      name: paymentTypeCreateForm.name,
    });
  };

  return (
    <Modal
      id={"create-branch-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      openButton={
        <button className={"btn btn-primary"}>
          <HiPlus size={20} />
          New
        </button>
      }
      title={"Create New Payment Type"}
      actionOnClose={() => {
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<CreatePaymentTypeFormFields>
          required
          label={"Name"}
          name={"name"}
          value={paymentTypeCreateForm.name}
          placeholder="Enter payment type name"
          onFieldChange={(value) => {
            setPaymentTypeCreateForm((oldState) => ({
              ...oldState,
              name: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Payment type name is required",
            },
          }}
        />
        <SubmitButton
          loading={
            CreatePaymentTypeMutation.isPending ||
            !!CreatePaymentTypeMutation.data
          }
          disabled={
            CreatePaymentTypeMutation.isPending ||
            !!CreatePaymentTypeMutation.data
          }
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreatePaymentTypeModal;
