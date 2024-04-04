import { MemberTypeCreateRequestDto } from "@/types/memberType.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createMemberType = async (
  payload: MemberTypeCreateRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.memberTypes, payload);
  return data;
};

const useCreateMemberType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-member-type"],
    mutationFn: createMemberType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["member-types"],
      });
    },
  });
};

export default useCreateMemberType;
