import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const deleteCollection = async (
  collectionId: string
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.delete(
    `${endpoints.collections}/${collectionId}`
  );

  return data;
};

const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-collection"],
    mutationFn: deleteCollection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
    },
  });
};

export default useDeleteCollection;
