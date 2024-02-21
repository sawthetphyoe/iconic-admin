import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { BranchUpdateRequestDto } from "@/types/branches.types";
import { MutationSuccessResponseDto } from "@/types";

const updateBranch = async (
  payload: BranchUpdateRequestDto & { id: string }
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(
    endpoints.branches + `/${payload.id}`,
    payload
  );
  return data;
};

const useUpdateBranch = (branchId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-branch", branchId],
    mutationFn: updateBranch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branches"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["get-branch-details"],
      });
    },
  });
};

export default useUpdateBranch;
