"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import useCreateNewBranch from "@/hooks/branches/useCreateNewBranch";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Form from "@/components/common/Form";
import { CreateProductFAQRequestDto } from "@/types/products.types";
import useCreateFAQ from "@/hooks/products/useCreateFAQ";

type CreateFAQFromFields = CreateProductFAQRequestDto;

const initialState: CreateFAQFromFields = {
  question: "",
  answer: "",
  product: "",
};

const { TextField, SubmitButton } = Form;

const CreateFAQModal: React.FC<{ productId: string }> = ({ productId }) => {
  const methods = useForm({
    mode: "onChange",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [faqCreateForm, setFaqCreateForm] = useState<CreateFAQFromFields>({
    ...initialState,
  });

  const CreateFAQMutation = useCreateFAQ();

  useEffect(() => {
    if (CreateFAQMutation.isSuccess && CreateFAQMutation.data) {
      setModalOpen(false);
      methods.reset();
      CreateFAQMutation.reset();
    } else if (CreateFAQMutation.isError) {
      toast.error(getErrorMessageFromQuery(CreateFAQMutation.error));
      CreateFAQMutation.reset();
    }
  }, [CreateFAQMutation, methods]);

  const handleSubmit = () => {
    CreateFAQMutation.mutate({
      product: productId,
      question: faqCreateForm.question,
      answer: faqCreateForm.answer,
    });
  };

  return (
    <Modal
      id={"create-faq-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      closeIcon
      width={"max-w-2xl"}
      openButton={
        <button className={"btn btn-primary"}>
          <HiPlus size={20} />
          New
        </button>
      }
      title={"Create New FAQ"}
      actionOnClose={() => {
        methods.reset();
      }}
    >
      <Form
        methods={methods}
        className={"flex flex-col gap-3 w-full"}
        onSubmit={handleSubmit}
      >
        <TextField<CreateFAQFromFields>
          required
          label={"Question"}
          name={"question"}
          value={faqCreateForm.question}
          placeholder="Enter question here"
          onFieldChange={(value) => {
            setFaqCreateForm((oldState) => ({
              ...oldState,
              question: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Question is required",
            },
          }}
        />

        <TextField<CreateFAQFromFields>
          required
          variant={"textarea"}
          rows={4}
          label={"Answer"}
          name={"answer"}
          placeholder={"Enter answer here"}
          value={faqCreateForm.answer}
          onFieldChange={(value) => {
            setFaqCreateForm((oldState) => ({
              ...oldState,
              answer: value,
            }));
          }}
          rules={{
            required: {
              value: true,
              message: "Answer is required",
            },
          }}
        />
        <SubmitButton
          loading={CreateFAQMutation.isPending || !!CreateFAQMutation.data}
          disabled={CreateFAQMutation.isPending || !!CreateFAQMutation.data}
        >
          Save
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateFAQModal;
