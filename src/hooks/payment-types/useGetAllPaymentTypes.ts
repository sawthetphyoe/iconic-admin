import { PaymentTypeListResponseDto } from "@/types/paymentType.types";
import Axios from "@/axios.config";
import { endpoints } from "@/lib/endpoints";
import { useQuery } from "@tanstack/react-query";

const getAllPaymentTypes = async (): Promise<PaymentTypeListResponseDto> => {
  const { data } = await Axios.get(endpoints.paymentTypes);
  return data;
};

const useGetAllPaymentTypes = () =>
  useQuery({
    queryKey: ["payment-types"],
    queryFn: getAllPaymentTypes,
  });

export default useGetAllPaymentTypes;
