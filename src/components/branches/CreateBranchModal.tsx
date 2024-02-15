"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import TextField from "@/components/common/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import useCreateNewBranch from "@/hooks/branches/useCreateNewBranch";
import { toast } from "react-toastify";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";

type CreateBranchFormFields = {
  branchName: string;
  address: string;
};

const initialState: CreateBranchFormFields = {
  branchName: "",
  address: "",
};

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
      <FormProvider {...methods}>
        <form
          className={"flex flex-col gap-3 w-full"}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <TextField<CreateBranchFormFields>
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
          <button type={"submit"} className="btn btn-primary">
            {CreateNewBranchMutation.isPending ||
            CreateNewBranchMutation.data ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateBranchModal;