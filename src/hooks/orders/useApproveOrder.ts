import { ApproveOrderRequestDto } from "@/types/orders.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const approveOrder = async (
  payload: ApproveOrderRequestDto & { id: string }
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(
    `${endpoints.orders}/approve/${payload.id}`,
    { orderItems: payload.orderItems }
  );
  return data;
};

const useApproveOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["approve-order"],
    mutationFn: approveOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-orders"],
      });
    },
  });
};

export default useApproveOrder;
