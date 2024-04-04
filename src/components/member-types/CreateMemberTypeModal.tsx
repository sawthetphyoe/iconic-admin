"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Form from "@/components/common/Form";
import useCreateMemberType from "@/hooks/member-types/useCreateMemberType";

type CreateMemberTypeFormFields = {
  name: string;
  minAmount: number;
};

const initialState: CreateMemberTypeFormFields = {
  name: "",
  minAmount: 0,
};

const { TextField, SubmitButton } = Form;

const CreateMemberTypeModal: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [memberTypeCreateForm, setMemberTypeCreateForm] =
    useState<CreateMemberTypeFormFields>(initialState);

  const CreateMemberTypeMutation = useCreateMemberType();

  useEffect(() => {
    if (CreateMemberTypeMutation.isSuccess && CreateMemberTypeMutation.data) {
      setModalOpen(false);
      methods.reset();
      CreateMemberTypeMutation.reset();
    } else if (CreateMemberTypeMutation.isError) {
      toast.error(getErrorMessageFromQuery(CreateMemberTypeMutation.error));
      CreateMemberTypeMutation.reset();
    }
  }, [CreateMemberTypeMutation, methods]);

  const handleSubmit = () => {
    CreateMemberTypeMutation.mutate({
      name: memberTypeCreateForm.name,
      minAmount: memberTypeCreateForm.minAmount,
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
      title={"Create New Member Type"}
      actionOnClose={() => {
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<CreateMemberTypeFormFields>
          required
          label={"Name"}
          name={"name"}
          value={memberTypeCreateForm.name}
          placeholder="Enter member type name"
          onFieldChange={(value) => {
            setMemberTypeCreateForm((oldState) => ({
              ...oldState,
              name: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Member type name is required",
            },
          }}
        />
        <TextField<CreateMemberTypeFormFields>
          required
          label={"Minimum Spent Amount"}
          name={"minAmount"}
          type={"number"}
          value={memberTypeCreateForm.name}
          placeholder="Enter min spent amount"
          onFieldChange={(value) => {
            setMemberTypeCreateForm((oldState) => ({
              ...oldState,
              minAmount: +value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Minimum spent amount name is required",
            },
          }}
        />
        <SubmitButton
          loading={
            CreateMemberTypeMutation.isPending ||
            !!CreateMemberTypeMutation.data
          }
          disabled={
            CreateMemberTypeMutation.isPending ||
            !!CreateMemberTypeMutation.data
          }
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateMemberTypeModal;
