import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const cancelOrder = async (id: string): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(`${endpoints.orders}/cancel/${id}`);
  return data;
};

const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cancel-order"],
    mutationFn: cancelOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-orders"],
      });
    },
  });
};

export default useCancelOrder;
