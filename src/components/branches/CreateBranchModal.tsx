"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import useCreateNewBranch from "@/hooks/branches/useCreateNewBranch";
import { toast } from "react-toastify";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";
import Form from "@/components/common/Form";

type CreateBranchFormFields = {
  branchName: string;
  address: string;
};

const initialState: CreateBranchFormFields = {
  branchName: "",
  address: "",
};

const { TextField, SubmitButton } = Form;

const CreateBranchModal: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [branchCreateForm, setBranchCreateForm] =
    useState<CreateBranchFormFields>(initialState);

  const CreateNewBranchMutation = useCreateNewBranch();

  useEffect(() => {
    if (CreateNewBranchMutation.isSuccess && CreateNewBranchMutation.data) {
      setModalOpen(false);
      methods.reset();
      CreateNewBranchMutation.reset();
    } else if (CreateNewBranchMutation.isError) {
      toast.error(getMutationErrorMessage(CreateNewBranchMutation.error));
      CreateNewBranchMutation.reset();
    }
  }, [CreateNewBranchMutation, methods]);

  const handleSubmit = () => {
    CreateNewBranchMutation.mutate({
      name: branchCreateForm.branchName,
      address: branchCreateForm.address,
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
      title={"Create New Branch"}
      actionOnClose={() => {
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<CreateBranchFormFields>
          required
          label={"Name"}
          name={"branchName"}
          value={branchCreateForm.branchName}
          placeholder="Enter branch name"
          onFieldChange={(value) => {
            setBranchCreateForm((oldState) => ({
              ...oldState,
              branchName: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Branch name is required",
            },
          }}
        />

        <TextField<CreateBranchFormFields>
          required
          label={"Address"}
          name={"address"}
          placeholder={"Enter address details"}
          value={branchCreateForm.address}
          onFieldChange={(value) => {
            setBranchCreateForm((oldState) => ({
              ...oldState,
              address: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Address is required",
            },
          }}
        />
        <SubmitButton
          loading={
            CreateNewBranchMutation.isPending || !!CreateNewBranchMutation.data
          }
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateBranchModal;
