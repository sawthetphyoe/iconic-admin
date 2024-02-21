import React, { useEffect, useState } from "react";
import { CreateStaffRequestDto, StaffDto } from "@/types/staff.types";
import Modal from "@/components/common/Modal";
import Form, { OptionType } from "@/components/common/Form";
import { StaffRole } from "@/lib/enums";
import { useForm } from "react-hook-form";
import useGetAllBranches from "@/hooks/branches/useGetAllBranches";
import { MdModeEdit } from "react-icons/md";
import useUpdateStaff from "@/hooks/staff/useUpdateStaff";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";

type UpdateStaffFormFields = Partial<CreateStaffRequestDto>;

const { TextField, Select, SubmitButton } = Form;

type UpdateStaffModalProps = {
  staff: StaffDto;
};
const EditStaffModal: React.FC<UpdateStaffModalProps> = ({ staff }) => {
  const initialState: UpdateStaffFormFields = {
    ...staff,
    branch: staff.branch?.id || "",
  };

  const methods = useForm({
    mode: "onChange",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [updateStaffFormData, setUpdateStaffFormData] =
    useState<UpdateStaffFormFields>(initialState);

  const GetAllBranchesQuery = useGetAllBranches();

  const UpdateStaffMutation = useUpdateStaff();

  useEffect(() => {
    if (UpdateStaffMutation.isSuccess && UpdateStaffMutation.data) {
      setModalOpen(false);
      methods.reset();
      UpdateStaffMutation.reset();
    } else if (UpdateStaffMutation.isError) {
      toast.error(getErrorMessageFromQuery(UpdateStaffMutation.error));
      UpdateStaffMutation.reset();
    }
  }, [UpdateStaffMutation, methods]);

  const onFieldChange = (
    key: keyof UpdateStaffFormFields,
    value: string | StaffRole
  ) => {
    setUpdateStaffFormData((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    UpdateStaffMutation.mutate({ ...updateStaffFormData, id: staff.id });
  };

  const branchOptions: OptionType[] =
    GetAllBranchesQuery.data?.payload?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const roleOptions: OptionType[] = [
    { label: "Super Admin", value: StaffRole.SuperAdmin },
    { label: "Admin", value: StaffRole.Admin },
  ];

  return (
    <Modal
      id={"update-branch-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      openButton={
        <button className={"btn btn-sm btn-ghost btn-circle"}>
          <MdModeEdit size={20} />
        </button>
      }
      title={`Update Staff - ${staff.fullName}`}
      actionOnClose={() => {
        setUpdateStaffFormData(initialState);
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-2 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<UpdateStaffFormFields>
          disabled
          title={"Cannot update username!"}
          name={"username"}
          label={"Username"}
          placeholder="Enter username"
          value={updateStaffFormData.username}
          onFieldChange={(value) => onFieldChange("username", value)}
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
        />

        <TextField<UpdateStaffFormFields>
          disabled
          title={"Cannot update email!"}
          name={"email"}
          label={"Email"}
          placeholder={"Enter email address"}
          value={updateStaffFormData.email}
          onFieldChange={(value) => onFieldChange("email", value)}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
          }}
        />

        <TextField<UpdateStaffFormFields>
          required
          name={"fullName"}
          label={"Full Name"}
          placeholder={"Enter full name"}
          value={updateStaffFormData.fullName}
          onFieldChange={(value) => onFieldChange("fullName", value)}
          rules={{
            required: {
              value: true,
              message: "Staff name is required",
            },
          }}
        />

        <Select<UpdateStaffFormFields>
          required
          name={"branch"}
          label={"Branch"}
          placeholder={"Select Branch"}
          value={updateStaffFormData.branch || ""}
          onFieldChange={(value) => onFieldChange("branch", value)}
          rules={{
            required: {
              value: true,
              message: "Branch is required",
            },
          }}
          options={branchOptions}
        />

        <Select<UpdateStaffFormFields>
          required
          name={"role"}
          label={"Role"}
          placeholder={"Select Role"}
          value={updateStaffFormData.role || ""}
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
          // loading={CreateStaffMutation.isPending || !!CreateStaffMutation.data}
          className={"mt-3"}
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default EditStaffModal;
