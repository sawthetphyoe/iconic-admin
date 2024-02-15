"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import getMutationErrorMessage from "@/utils/getMutationErrorMessage";
import { CreateStaffRequestDto } from "@/types/staff.types";
import { StaffRole } from "@/lib/enums";
import useCreateStaff from "@/hooks/staff/useCreateStaff";
import Form, { OptionProps } from "@/components/common/Form";
import { useForm } from "react-hook-form";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import { DEFAULT_STAFF_PASSWORD } from "@/lib/constants";

type CreateStaffFormFields = CreateStaffRequestDto;

const initialState: CreateStaffFormFields = {
  username: "",
  fullName: "",
  password: "",
  passwordConfirm: "",
  role: "" as StaffRole,
  email: "",
  branch: "",
};

const { TextField, Select, SubmitButton } = Form;

const CreateStaffModal: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [createStaffFormData, setCreateStaffFormData] =
    useState<CreateStaffFormFields>(initialState);

  const CreateStaffMutation = useCreateStaff();

  const GetAllBranchesQuery = useGetAllBranches();

  useEffect(() => {
    if (CreateStaffMutation.isSuccess && CreateStaffMutation.data) {
      setModalOpen(false);
      CreateStaffMutation.reset();
      methods.reset();
    } else if (CreateStaffMutation.isError) {
      toast.error(getMutationErrorMessage(CreateStaffMutation.error));
      CreateStaffMutation.reset();
    }
  }, [CreateStaffMutation, methods]);

  const onFieldChange = (
    key: keyof CreateStaffFormFields,
    value: string | StaffRole
  ) => {
    setCreateStaffFormData((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(createStaffFormData, "createStaffFormData");
    CreateStaffMutation.mutate({
      ...createStaffFormData,
      password: DEFAULT_STAFF_PASSWORD,
      passwordConfirm: DEFAULT_STAFF_PASSWORD,
    });
  };

  const branchOptions: OptionProps[] =
    GetAllBranchesQuery.data?.payload?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const roleOptions: OptionProps[] = [
    { label: "Super Admin", value: StaffRole.SuperAdmin },
    { label: "Admin", value: StaffRole.Admin },
  ];

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
      title={"Register New Staff"}
      actionOnClose={() => {
        setCreateStaffFormData(initialState);
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-2 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<CreateStaffFormFields>
          required
          name={"username"}
          label={"Username"}
          placeholder="Enter username"
          value={createStaffFormData.username}
          onFieldChange={(value) => onFieldChange("username", value)}
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
        />

        <TextField<CreateStaffFormFields>
          required
          name={"email"}
          label={"Email"}
          placeholder={"Enter email address"}
          value={createStaffFormData.email}
          onFieldChange={(value) => onFieldChange("email", value)}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
          }}
        />

        <TextField<CreateStaffFormFields>
          required
          name={"fullName"}
          label={"Full Name"}
          placeholder={"Enter full name"}
          value={createStaffFormData.fullName}
          onFieldChange={(value) => onFieldChange("fullName", value)}
          rules={{
            required: {
              value: true,
              message: "Staff name is required",
            },
          }}
        />

        <Select<CreateStaffFormFields>
          required
          name={"branch"}
          label={"Branch"}
          placeholder={"Select Branch"}
          value={createStaffFormData.branch}
          onFieldChange={(value) => onFieldChange("branch", value)}
          rules={{
            required: {
              value: true,
              message: "Branch is required",
            },
          }}
          options={branchOptions}
        />

        <Select<CreateStaffFormFields>
          required
          name={"role"}
          label={"Role"}
          placeholder={"Select Role"}
          value={createStaffFormData.role}
          onFieldChange={(value) => onFieldChange("role", value)}
          rules={{
            required: {
              value: true,
              message: "Role is required",
            },
          }}
          options={roleOptions}
        />

        <SubmitButton
          loading={CreateStaffMutation.isPending || !!CreateStaffMutation.data}
          className={"mt-3"}
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateStaffModal;
