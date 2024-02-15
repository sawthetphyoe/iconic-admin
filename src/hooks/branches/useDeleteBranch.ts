import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteBranch = async (
  branchId: string
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.delete(endpoints.branches + `/${branchId}`);
  return data;
};

const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-branch"],
    mutationFn: deleteBranch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branches"],
      });
    },
  });
};

export default useDeleteBranch;
