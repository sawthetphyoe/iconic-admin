import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchCreatePayloadDto } from "@/types/branch.types";
import { endpoints } from "@/lib/endpoints";
import Axios from "@/axios.config";
import { MutationSuccessResponseDto } from "@/types";

const createNewBranch = async (
  payload: BranchCreatePayloadDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.branches, payload);
  return data;
};

const useCreateNewBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-new-branch"],
    mutationFn: createNewBranch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branches"],
      });
    },
  });
};

export default useCreateNewBranch;