import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { MutationSuccessResponseDto } from "@/types";
import { UpdateProductRequestDto } from "@/types/products.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProduct = async (
  payload: UpdateProductRequestDto & { id: string }
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.patch(
    endpoints.products + `/${payload.id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-product-detail"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });
    },
  });
};

export default useUpdateProduct;
