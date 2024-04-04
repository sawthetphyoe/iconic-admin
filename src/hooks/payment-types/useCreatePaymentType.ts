import { PaymentTypeCreateRequestDto } from "@/types/paymentType.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { MutationSuccessResponseDto } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createPaymentType = async (
  payload: PaymentTypeCreateRequestDto
): Promise<MutationSuccessResponseDto> => {
  const { data } = await Axios.post(endpoints.paymentTypes, payload);
  return data;
};

const useCreatePaymentType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-payment-type"],
    mutationFn: createPaymentType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["payment-types"],
      });
    },
  });
};

export default useCreatePaymentType;
