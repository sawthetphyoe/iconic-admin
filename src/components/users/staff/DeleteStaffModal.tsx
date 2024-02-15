"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";
import { useRouter } from "next/navigation";
import { StaffDto } from "@/types/staff.types";
import useDeleteStaff from "@/hooks/staff/useDeleteStaff";

type DeleteStaffModalProps = {
  staff: StaffDto;
};

const DeleteStaffModal: React.FC<DeleteStaffModalProps> = ({ staff }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [staffName, setStaffName] = useState("");

  const DeleteStaffMutation = useDeleteStaff();

  useEffect(() => {
    if (DeleteStaffMutation.isSuccess && DeleteStaffMutation.data) {
      router.back();
      setModalOpen(false);
      DeleteStaffMutation.reset();
    } else if (DeleteStaffMutation.isError) {
      toast.error(getMutationErrorMessage(DeleteStaffMutation.error));
      DeleteStaffMutation.reset();
    }
  }, [DeleteStaffMutation, router]);

  const handleSubmit = () => {
    DeleteStaffMutation.mutate(staff.id);
  };

  return (
    <Modal
      id={"delete-branch-modal"}
      open={modalOpen}
      width={"max-w-xl"}
      setOpen={setModalOpen}
      closeIcon
      openButton={<button className={"btn text-error"}>Delete Staff</button>}
      title={`Delete Staff - ${staff.fullName}`}
      actionOnClose={() => {
        setStaffName("");
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
            To confirm, type &quot;<strong>{staff.fullName}</strong>&quot; in
            the box below
          </label>
          <input
            type={"text"}
            id={"delete-branch"}
            className={"input input-primary"}
            placeholder={"Enter branch name"}
            onPaste={(e) => {
              e.preventDefault();
            }}
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
          />
        </div>
        <button
          type={"submit"}
          className="btn btn-error mt-3"
          disabled={staffName !== staff.fullName}
        >
          Delete
        </button>
      </form>
    </Modal>
  );
};

export default DeleteStaffModal;
