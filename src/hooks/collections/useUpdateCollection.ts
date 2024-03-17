import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationSuccessResponseDto } from "@/types";
import { UpdateCollectionRequestDto } from "@/types/collections.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const updateCollection = async (
  payload: UpdateCollectionRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(`${endpoints.collections}/${payload.id}`, {
    name: payload.name,
  });

  return data;
};

const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-collection"],
    mutationFn: updateCollection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
    },
  });
};

export default useUpdateCollection;
