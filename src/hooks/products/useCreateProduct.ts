import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProductRequestDto } from "@/types/products.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";

const createProduct = async (
  payload: CreateProductRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.products, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });
    },
  });
};

export default useCreateProduct;
