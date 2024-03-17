import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationSuccessResponseDto } from "@/types";
import { CreateCollectionRequestDto } from "@/types/collections.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const createCollection = async (
  payload: CreateCollectionRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.collections, payload);
  return data;
};

const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-collection"],
    mutationFn: createCollection,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-collections"],
      });
    },
  });
};

export default useCreateCollection;
