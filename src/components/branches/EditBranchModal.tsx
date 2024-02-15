"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { MdModeEdit } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@/components/common/TextField";
import { BranchDetailsResponseDto } from "@/types/branch.types";
import useUpdateBranch from "@/hooks/branches/useUpdateBranch";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";
import { toast } from "react-toastify";

type EditBranchModalProps = {
  branch: BranchDetailsResponseDto["payload"];
};

type BranchEditFormFields = {
  branchName: string;
  address: string;
};

const EditBranchModal: React.FC<EditBranchModalProps> = ({ branch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      branchName: branch.name,
      address: branch.address,
    },
  });

  const [branchEditForm, setBranchEditForm] = useState({
    branchName: branch.name,
    address: branch.address,
  });

  const UpdateBranchMutation = useUpdateBranch(branch.id);

  useEffect(() => {
    if (UpdateBranchMutation.isSuccess && UpdateBranchMutation.data) {
      setModalOpen(false);
      methods.reset();
      UpdateBranchMutation.reset();
    } else if (UpdateBranchMutation.isError) {
      toast.error(getMutationErrorMessage(UpdateBranchMutation.error));
      UpdateBranchMutation.reset();
    }
  }, [UpdateBranchMutation, methods]);

  const handleSubmit = () => {
    console.log("submit");
    UpdateBranchMutation.mutate({
      id: branch.id,
      name: branchEditForm.branchName,
      address: branchEditForm.address,
    });
  };

  return (
    <Modal
      id={"edit-branch-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      width={"max-w-xl"}
      closeIcon
      openButton={
        <button className={"btn btn-sm btn-ghost btn-circle"}>
          <MdModeEdit size={20} />
        </button>
      }
      title={`Edit Branch - ${branch.name}`}
      actionOnClose={() => {
        methods.reset();
      }}
    >
      <FormProvider {...methods}>
        <form
          className={"flex flex-col gap-3 w-full"}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          <TextField<BranchEditFormFields>
            name={"branchName"}
            value={branchEditForm.branchName}
            placeholder="Enter branch name"
            onFieldChange={(value) => {
              setBranchEditForm((oldState) => ({
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

          <TextField<BranchEditFormFields>
            name={"address"}
            placeholder={"Enter address details"}
            value={branchEditForm.address}
            onFieldChange={(value) => {
              setBranchEditForm((oldState) => ({
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
            {/*{CreateNewBranchMutation.isPending ||*/}
            {/*CreateNewBranchMutation.data ? (*/}
            {/*  <span className="loading loading-dots loading-md"></span>*/}
            {/*) : (*/}
            Save
            {/*)}*/}
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditBranchModal;
