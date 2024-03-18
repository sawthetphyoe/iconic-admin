import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchItemMoveRequestDto } from "@/types/branches.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const moveBranchItem = async (
  payload: BranchItemMoveRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(`${endpoints.inventories}/move`, payload);
  return data;
};

const useMoveBranchItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["move-branch-item"],
    mutationFn: moveBranchItem,
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

export default useMoveBranchItem;
