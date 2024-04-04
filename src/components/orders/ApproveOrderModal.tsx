"use client";

import Modal from "@/components/common/Modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import getErrorMessageFromQuery from "@/utils/getErrorMessageFromQuery";
import Form from "@/components/common/Form";
import useCreatePaymentType from "@/hooks/payment-types/useCreatePaymentType";
import { ApproveOrderItemRequestDto, OrderDto } from "@/types/orders.types";
import { log } from "node:util";
import useApproveOrder from "@/hooks/orders/useApproveOrder";
import { router } from "next/client";
import { useRouter } from "next/navigation";

type ApproveOrderModalProps = {
  order: OrderDto;
};

const ApproveOrderModal: React.FC<ApproveOrderModalProps> = ({ order }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const [approveOrderItems, setApproveOrderItems] = useState<
    ApproveOrderItemRequestDto[]
  >(
    order.orderItems.map((item) => ({
      productVariantId: item.product.variant.id,
      quantity: item.quantity,
      branch: "",
    }))
  );

  const ApproveOrderMutation = useApproveOrder();

  useEffect(() => {
    if (ApproveOrderMutation.isSuccess && ApproveOrderMutation.data) {
      setModalOpen(false);
      ApproveOrderMutation.reset();
      router.push("/orders");
    } else if (ApproveOrderMutation.isError) {
      toast.error(getErrorMessageFromQuery(ApproveOrderMutation.error));
      ApproveOrderMutation.reset();
    }
  }, [ApproveOrderMutation]);

  const handleSubmit = () => {
    ApproveOrderMutation.mutate({
      id: order.id,
      orderItems: approveOrderItems,
    });
  };

  return (
    <Modal
      id={"create-branch-modal"}
      open={modalOpen}
      setOpen={setModalOpen}
      width={"max-w-3xl"}
      closeIcon
      openButton={<button className={"btn btn-primary"}>Approve</button>}
      title={"Approve Order"}
      actionOnClose={() => {}}
    >
      <div className={"flex flex-col w-full gap-8"}>
        {order.orderItems.map((orderItem) => {
          return (
            <div
              key={orderItem.id}
              className={"flex justify-between border-b pb-6 items-center"}
            >
              <div className={"flex flex-col gap-1"}>
                <h3 className={"font-semibold"}>{orderItem.product.name}</h3>
                <p className={"text-sm"}>Qty : {orderItem.quantity}</p>
              </div>
              <div>
                <select
                  className={"select select-bordered w-[260px]"}
                  value={
                    approveOrderItems.find(
                      (item) =>
                        item.productVariantId === orderItem.product.variant.id
                    )?.branch || "Select Branch"
                  }
                  onChange={(e) => {
                    const branchId = e.target.value;
                    const index = approveOrderItems.findIndex(
                      (item) =>
                        item.productVariantId === orderItem.product.variant.id
                    );
                    setApproveOrderItems((oldState) => {
                      const newState = [...oldState];
                      newState[index] = {
                        ...newState[index],
                        branch: branchId,
                      };
                      return newState;
                    });
                  }}
                >
                  <option value={"Select Branch"} disabled>
                    Select Branch
                  </option>
                  {orderItem.availableBranches.map((item) => {
                    return (
                      <option
                        key={item.branchId}
                        value={item.branchId}
                        disabled={orderItem.quantity > item.inStock}
                      >
                        {item.branchName + " - " + item.inStock + " items"}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
        })}
        <button
          className={"btn btn-primary self-end"}
          disabled={
            approveOrderItems.map((item) => item.branch).includes("") ||
            ApproveOrderMutation.isPending ||
            !!ApproveOrderMutation.data
          }
          onClick={() => handleSubmit()}
        >
          {ApproveOrderMutation.isPending || !!ApproveOrderMutation.data ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ApproveOrderModal;
