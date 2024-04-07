import { CreateProductFAQRequestDto } from "@/types/products.types";
import { MutationSuccessResponseDto } from "@/types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createFAQ = async (
  payload: CreateProductFAQRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.productFaqs, payload);
  return data;
};

const useCreateFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-faq"],
    mutationFn: createFAQ,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-product-faqs"],
      });
    },
  });
};

export default useCreateFAQ;
