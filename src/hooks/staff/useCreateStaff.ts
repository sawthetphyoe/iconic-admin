import { CreateStaffRequestDto } from "@/types/staff.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createStaff = async (
  payload: CreateStaffRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.staff, payload);
  return data;
};

const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-new-staff"],
    mutationFn: createStaff,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["search-staff"],
      });
    },
  });
};

export default useCreateStaff;
