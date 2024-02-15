import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteStaff = async (id: string): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.delete(endpoints.staff + `/${id}`);
  return data;
};

const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-staff"],
    mutationFn: deleteStaff,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["search-staff"],
      });
    },
  });
};

export default useDeleteStaff;
