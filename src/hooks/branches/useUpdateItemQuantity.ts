import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationSuccessResponseDto } from "@/types";
import { BranchItemUpdateRequestDto } from "@/types/branches.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const updateItemQuantity = async (
  payload: BranchItemUpdateRequestDto & { id: string }
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(`${endpoints.inventories}/${payload.id}`, {
    quantity: payload.quantity,
  });
  return data;
};

const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-inventory-item-quantity"],
    mutationFn: updateItemQuantity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branch-items"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branches"],
      });
    },
  });
};

export default useUpdateItemQuantity;
