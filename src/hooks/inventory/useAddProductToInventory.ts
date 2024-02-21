import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProductToInventoryRequestDto } from "@/types/inventories.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const addProductToInventory = async (
  payload: AddProductToInventoryRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.inventories, payload);
  return data;
};

const useAddProductToInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-product-to-inventory"],
    mutationFn: addProductToInventory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-branch-items"],
      });
    },
  });
};

export default useAddProductToInventory;
