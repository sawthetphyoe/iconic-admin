"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import Form from "@/components/common/Form";
import useCreateCollection from "@/hooks/collections/useCreateCollection";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import { toast } from "react-toastify";
import { HiPlus } from "react-icons/hi";

const CreateProductCollectionModal: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");

  const CreateCollectionMutation = useCreateCollection();

  useEffect(() => {
    if (CreateCollectionMutation.isSuccess) {
      setModalOpen(false);
      methods.reset();
      CreateCollectionMutation.reset();
    } else if (CreateCollectionMutation.isError) {
      toast.error(getErrorMessageFromQuery(CreateCollectionMutation.error));
    }
  }, [
    methods,
    CreateCollectionMutation,
    CreateCollectionMutation.isSuccess,
    CreateCollectionMutation.isError,
    CreateCollectionMutation.error,
  ]);

  return (
    <Modal
      id={`create-collection-modal`}
      open={modalOpen}
      width={"max-w-xl"}
      setOpen={setModalOpen}
      closeIcon
      openButton={
        <button className={"btn btn-primary"}>
          <HiPlus size={20} />
          New
        </button>
      }
      title={`Create New Product Collection`}
      actionOnClose={() => {
        setName("");
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={() => {
          CreateCollectionMutation.mutate({ name });
        }}
      >
        <Form.TextField<{ name: string }>
          required
          label={"Name"}
          name={"name"}
          value={name}
          placeholder="Enter collection name"
          onFieldChange={(value) => {
            setName(value);
          }}
          rules={{
            required: {
              value: true,
              message: "Collection name is required",
            },
          }}
        />
        <Form.SubmitButton
          loading={
            CreateCollectionMutation.isPending ||
            !!CreateCollectionMutation.data
          }
          disabled={
            CreateCollectionMutation.isPending ||
            !!CreateCollectionMutation.data
          }
        >
          Save
        </Form.SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateProductCollectionModal;
