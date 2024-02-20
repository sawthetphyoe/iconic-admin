"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { BranchDetailsResponseDto } from "@/types/branch.types";
import useDeleteBranch from "@/hooks/branches/useDeleteBranch";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import { useRouter } from "next/navigation";

type DeleteBranchModalProps = {
  branch: BranchDetailsResponseDto["payload"];
};

const DeleteBranchModal: React.FC<DeleteBranchModalProps> = ({ branch }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [branchName, setBranchName] = useState("");

  const DeleteBranchMutation = useDeleteBranch();

  useEffect(() => {
    if (DeleteBranchMutation.isSuccess && DeleteBranchMutation.data) {
      router.back();
      setModalOpen(false);
      DeleteBranchMutation.reset();
    } else if (DeleteBranchMutation.isError) {
      toast.error(getErrorMessageFromQuery(DeleteBranchMutation.error));
      DeleteBranchMutation.reset();
    }
  }, [DeleteBranchMutation, router]);

  const handleSubmit = () => {
    DeleteBranchMutation.mutate(branch.id);
  };

  return (
    <Modal
      id={"delete-branch-modal"}
      open={modalOpen}
      width={"max-w-xl"}
      setOpen={setModalOpen}
      closeIcon
      openButton={<button className={"btn text-error"}>Delete Branch</button>}
      title={`Delete Branch - ${branch.name}`}
      actionOnClose={() => {
        setBranchName("");
      }}
    >
      <form
        className={"flex flex-col gap-6 w-full"}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>Are you sure you want to delete the branch?</p>
        <div className={"flex flex-col gap-2"}>
          <label htmlFor={"delete-branch"}>
            To confirm, type &quot;<strong>{branch.name}</strong>&quot; in the
            box below
          </label>
          <input
            type={"text"}
            id={"delete-branch"}
            className={"input input-primary"}
            placeholder={"Enter branch name"}
            onPaste={(e) => {
              e.preventDefault();
            }}
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
        <button
          type={"submit"}
          className="btn btn-error mt-3"
          disabled={branchName !== branch.name}
        >
          Delete
        </button>
      </form>
    </Modal>
  );
};

export default DeleteBranchModal;
