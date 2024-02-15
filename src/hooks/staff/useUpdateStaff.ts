import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateStaffRequestDto } from "@/types/staff.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const updateStaff = async (
  payload: Partial<CreateStaffRequestDto> & { id: string }
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(
    endpoints.staff + `/${payload.id}`,
    payload
  );
  return data;
};

const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-staff"],
    mutationFn: updateStaff,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-staff-details"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["search-staff"],
      });
    },
  });
};

export default useUpdateStaff;
