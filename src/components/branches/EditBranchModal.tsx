"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import { MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { BranchDetailsResponseDto } from "@/types/branch.types";
import useUpdateBranch from "@/hooks/branches/useUpdateBranch";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";
import { toast } from "react-toastify";
import Form from "@/components/common/Form";

const { TextField, SubmitButton } = Form;

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
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<BranchEditFormFields>
          required
          name={"branchName"}
          label={"Name"}
          placeholder="Enter branch name"
          value={branchEditForm.branchName}
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
          required
          name={"address"}
          label={"Address"}
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
        <SubmitButton>Save</SubmitButton>
      </Form>
    </Modal>
  );
};

export default EditBranchModal;
